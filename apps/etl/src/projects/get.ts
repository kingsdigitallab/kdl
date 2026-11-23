import { IStorageFileSystem } from '../infrastructure/storage.ts'
import { batchMap, sleep } from '../utils/index.ts'
import { SLEEP_TIME } from '../utils/vars.ts'
import { IProjectsRepository } from './repository.ts'
import type { Task, TaskMetadata } from './types.ts'

const PROJECTS_IDS_FILENAME = 'projects.json'

export const projectListActiveProjectsUseCase = async ({
  apiKey,
  apiUrl,
  teamId,
  customItemId,
  projectsRepository
}: {
  customItemId: string
  apiKey: string
  apiUrl: string
  teamId: string
  projectsRepository: typeof IProjectsRepository
}) => {
  try {
    console.log(`Fetching task data for item ${customItemId}...`)
    const tasks = await projectsRepository.listTasksByTeamId({
      apiKey,
      apiUrl,
      teamId,
      customItemId
    })
    console.log(`Fetching space data...`)
    const spaceResponse = await projectsRepository.getSpaceByTeamId({ apiKey, apiUrl, teamId })
    return {
      projects: tasks,
      spaces: spaceResponse.spaces
    }
  } catch (error) {
    console.log(error)
    return {
      projects: [],
      spaces: []
    }
  }
}

/**
 * Get data from archived folders, this does not include archived lists nor archived tasks.
 **/
export const projectListArchivedProjectsUseCase = async ({
  customItemId,
  teamId,
  apiKey,
  apiUrl,
  projectsRepository
}: {
  customItemId: string
  apiKey: string
  apiUrl: string
  teamId: string
  projectsRepository: typeof IProjectsRepository
}) => {
  try {
    console.log(`Fetching task data for item ${customItemId}...`)
    const tasks = await projectsRepository.listArchivedTasksByTeamId({
      apiKey,
      apiUrl,
      teamId,
      customItemId
    })
    console.log(`Fetching space data...`)
    const spaceResponse = await projectsRepository.getSpaceByTeamId({ apiKey, apiUrl, teamId })
    return {
      projects: tasks,
      spaces: spaceResponse.spaces
    }
  } catch (error) {
    console.log(error)
    return {
      projects: [],
      spaces: []
    }
  }
}

export const projectListActiveProjectsIdsUseCase = async ({
  apiKey,
  apiUrl,
  teamId,
  customItemId,
  projectsRepository
}: {
  customItemId: string
  apiKey: string
  apiUrl: string
  teamId: string
  projectsRepository: typeof IProjectsRepository
}) => {
  try {
    console.log(`Fetching task data for item ${customItemId}...`)
    const tasks = await projectsRepository.listTasksByTeamId({
      apiKey,
      apiUrl,
      teamId,
      customItemId
    })
    console.log(`Fetching space data...`)
    return tasks.map((task) => task.id)
  } catch (error) {
    console.log(error)
    return []
  }
}

export const projectListArchivedProjectsIdsUseCase = async ({
  apiKey,
  apiUrl,
  teamId,
  customItemId,
  projectsRepository
}: {
  customItemId: string
  apiKey: string
  apiUrl: string
  teamId: string
  projectsRepository: typeof IProjectsRepository
}) => {
  try {
    console.log(`Fetching task data for item ${customItemId}...`)
    const tasks = await projectsRepository.listArchivedTasksByTeamId({
      apiKey,
      apiUrl,
      teamId,
      customItemId
    })
    console.log(`Fetching space data...`)
    return tasks.map((task) => task.id)
  } catch (error) {
    console.log(error)
    return []
  }
}

export const projectsGetProjectsFromIdUseCase = async ({
  teamId,
  apiKey,
  apiUrl,
  projectsRepository,
  dir,
  storageModule
}: {
  teamId: string
  apiKey: string
  apiUrl: string
  projectsRepository: typeof IProjectsRepository
  dir: string
  storageModule: typeof IStorageFileSystem
}) => {
  try {
    // NOTE: Allow maybe pass a source???
    const file = storageModule.readFile({ dir, filename: PROJECTS_IDS_FILENAME })
    let projects: { id: string }[] = []
    if (file) {
      projects = JSON.parse(file.toString())
    }
    const batchedTasks = batchMap(projects, 50)
    let batchCount = 0
    let results: (Task | null)[] = []
    for (const batch of batchedTasks) {
      console.log(`Fetching tasks of batch ${batchCount + 1} of ${batchedTasks.length}`)
      const res = await Promise.allSettled(
        batch.map(({ id }) => projectsRepository.getTaskById({ apiKey, apiUrl, id }))
      ).then((res) => res.flatMap((res) => (res.status === 'fulfilled' ? res.value : null)))
      results = [...results, ...res]
      await sleep(SLEEP_TIME)
      batchCount++
    }
    const spaceResponse = await projectsRepository.getSpaceByTeamId({ teamId, apiKey, apiUrl })
    return {
      projects: results,
      spaces: spaceResponse.spaces
    }
  } catch (error) {
    console.log(error)
    return {
      projects: [],
      spaces: []
    }
  }
}

export const projectsGetProjectsFromDirUseCase = ({
  projectsRepository,
  dir
}: {
  projectsRepository: typeof IProjectsRepository
  dir: string
}) => {
  const projects = projectsRepository.getTasksFromDir({ dir })

  return projects
}

export const projectsEvaluateProjectsFromDirUseCase = ({
  projectsRepository,
  dir
}: {
  projectsRepository: typeof IProjectsRepository
  dir: string
}) => {
  return projectsRepository.getTasksFromDirWithFile({ dir }).reduce(
    (acc, el) => {
      const duplicates = acc.projects.filter(
        (project) =>
          project.file &&
          el.file &&
          project.metadata.slug &&
          project.metadata.slug === el.metadata.slug
      )
      if (duplicates.length > 0) {
        const dups = [...duplicates.map((x) => x.file), el.file]
        // const dups = [
        //   ...duplicates.map((x) => x.file?.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/i)?.join(', ')),
        //   el.file?.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/i)?.join(', ')
        // ]
        acc.duplicates.push(`${el.metadata.title}: ${dups.join(' or ')}`)
      }

      acc.projects.push(el)
      return acc
    },
    { duplicates: [], projects: [] } as {
      duplicates: string[]
      // duplicates: Record<string, (string | null)[]>[]
      projects: {
        content: string | null
        metadata: TaskMetadata
        file: string | null
      }[]
    }
  )
}
