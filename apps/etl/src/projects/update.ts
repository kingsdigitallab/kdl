import type { Member, Task } from './types.ts'
import { IProjectsRepository } from './repository.ts'
import { batchMap, sleep } from '../utils/index.ts'

import { IStorageFileSystem } from '../infrastructure/storage.ts'
import { projectsConvertToYamlResolver, projectsResolveFileName } from './resolvers.ts'
import type { IPeopleRepository } from '../people/repository.ts'
import { peopleConvertToYamlResolver } from '../people/resolvers.ts'
import { join } from 'node:path'
import { SLEEP_TIME } from '../utils/vars.ts'

const PROJECTS_IDS_FILENAME = 'projects.json'

export const projectsSyncIdFileUseCase = async ({
  customItemId,
  teamId,
  apiKey,
  apiUrl,
  projectsRepository,
  dir,
  storageModule
}: {
  customItemId: string
  apiKey: string
  apiUrl: string
  teamId: string
  dir: string
  projectsRepository: typeof IProjectsRepository
  storageModule: typeof IStorageFileSystem
}) => {
  try {
    const activeTasks = await projectsRepository.listTasksByTeamId({
      apiKey,
      apiUrl,
      teamId,
      customItemId
    })

    const archivedTasks = await projectsRepository.listArchivedTasksByTeamId({
      apiKey,
      apiUrl,
      teamId,
      customItemId
    })
    let existing: { id: string }[] = []
    const output = storageModule.readFile({ dir, filename: PROJECTS_IDS_FILENAME })
    if (output) {
      existing = JSON.parse(output.toString())
    }
    const ids = Array.from(
      new Set([
        ...existing.map((x) => x.id),
        ...activeTasks.map((task) => task.id),
        ...archivedTasks.map((task) => task.id)
      ])
    ).map((x) => ({
      id: x,
      title: [...activeTasks, ...archivedTasks].find((y) => y.id === x)?.name ?? undefined
    }))
    storageModule.writeFile({ dir, content: JSON.stringify(ids), filename: PROJECTS_IDS_FILENAME })
  } catch (error) {}
}

export const projectGenerateMarkdownFromIdsUseCase = async ({
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
    const parsed = await Promise.all(
      results
        .filter((x) => x !== null)
        .map((project) =>
          projectsConvertToYamlResolver({
            project,
            spaces: spaceResponse.spaces,
            outputPath: dir,
            projectsRepository
          })
        )
    )
    // console.log(parsed)
    const written = parsed
      .filter((data) => data !== null)
      .map(({ metadata, content }) => {
        const result = projectsResolveFileName({
          dir,
          metadata
        })
        if (result) {
          storageModule.writeFile({
            content: content ?? '',
            dir: result.output,
            filename: result.filename
          })
        }
        return {
          content,
          metadata
        }
      })
    return written
  } catch (error) {
    console.log(error)
    return []
  }
}

export const projectGenerateMarkdownActiveProjectsUseCase = async ({
  apiKey,
  apiUrl,
  teamId,
  dir,
  customItemId,
  projectsRepository,
  storageModule
}: {
  customItemId: string
  apiKey: string
  apiUrl: string
  teamId: string
  projectsRepository: typeof IProjectsRepository
  dir: string
  storageModule: typeof IStorageFileSystem
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
    const parsed = await Promise.all(
      tasks
        .filter((x) => x !== null)
        .map((project) =>
          projectsConvertToYamlResolver({
            project,
            spaces: spaceResponse.spaces,
            outputPath: dir,
            projectsRepository
          })
        )
    )
    const written = parsed
      .filter((data) => data !== null)
      .map(({ metadata, content }) => {
        const result = projectsResolveFileName({
          dir,
          metadata
        })
        if (result)
          storageModule.writeFile({
            content: content ?? '',
            dir: result.output,
            filename: result.filename
          })
        return {
          content,
          metadata
        }
      })
    return written
  } catch (error) {
    console.log(error)
    return {
      projects: [],
      spaces: []
    }
  }
}

export const projectGenerateMarkdownArchivedProjectsUseCase = async ({
  customItemId,
  teamId,
  apiKey,
  apiUrl,
  projectsRepository,
  dir,
  storageModule
}: {
  customItemId: string
  apiKey: string
  apiUrl: string
  teamId: string
  projectsRepository: typeof IProjectsRepository
  dir: string
  storageModule: typeof IStorageFileSystem
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
    const parsed = await Promise.all(
      tasks
        .filter((x) => x !== null)
        .map((project) =>
          projectsConvertToYamlResolver({
            project,
            spaces: spaceResponse.spaces,
            outputPath: dir,
            projectsRepository
          })
        )
    )
    const written = parsed
      .filter((data) => data !== null)
      .map(({ metadata, content }) => {
        const result = projectsResolveFileName({
          dir,
          metadata
        })
        if (result) {
          storageModule.writeFile({
            content: content ?? '',
            dir: result.output,
            filename: result.filename
          })
        }
        return {
          content,
          metadata
        }
      })
    return written
  } catch (error) {
    console.log(error)
    return {
      projects: [],
      spaces: []
    }
  }
}

export const projectGeneratePeopleFromDirUseCase = async ({
  projectsRepository,
  dir,
  storageModule,
  peopleModule
}: {
  projectsRepository: typeof IProjectsRepository
  dir: string
  storageModule: typeof IStorageFileSystem
  peopleModule: typeof IPeopleRepository
}) => {
  try {
    const tasks = projectsRepository.getTasksFromDir({ dir: join(dir, 'projects') })
    const allMembers: Record<
      string,
      {
        name: string
        projects: {
          project: Record<string, unknown>
          member: { roleName: string; inOrganisation: { name: string; slug: string } | null }
        }[]
      }
    > = {}
    const existingSlugs = new Set(peopleModule.listFiles({ dir }))

    for (const { metadata } of tasks) {
      const project = {
        name: metadata.name || metadata.title,
        alternateName: metadata.alternateName || null,
        slug: metadata.slug,
        foundingDate: metadata.foundingDate || null,
        dissolutionDate: metadata.dissolutionDate || null,
        departments: metadata.departments || []
      }
      for (const member of metadata.members ?? []) {
        const slug = member.slug
        // if no member slug skip
        if (!slug) continue
        // if none append empty values
        if (!allMembers[slug]) {
          allMembers[slug] = { name: (member.name || '').trim(), projects: [] }
        }
        allMembers[slug].projects.push({
          project,
          member: {
            roleName: member.roleName,
            inOrganisation: member.inOrganisation || null
          }
        })
      }
    }

    const missingSlugs = Object.keys(allMembers)
      // if keys is not in existing aka if theres no file for this member
      .filter((slug) => !existingSlugs.has(slug))
      // if there is no allow list or if slug is in allow list
      // .filter((slug) => !allowlist || allowlist.has(slug))
      .sort()
    if (!missingSlugs.length) {
      console.log('No missing people found.')
      return []
    }

    console.log(`Found ${missingSlugs.length} missing people:\n`)

    for (const slug of missingSlugs) {
      const person = allMembers[slug]
      // to keep track if member's org's slug and role has been looped
      const seen = new Set()
      const memberOf = []
      for (const p of person.projects) {
        const org = p.member.inOrganisation
          ? { name: p.member.inOrganisation.name, slug: p.member.inOrganisation.slug }
          : // NOTE: assuming if there is no inOrganisation name then it is a kdl member
            { name: "King's Digital Lab", slug: 'kdl' }

        const key = `${org.slug}|${p.member.roleName}`

        if (!seen.has(key)) {
          seen.add(key)
          memberOf.push({
            startDate: null,
            endDate: null,
            organisation: org,
            roleName: p.member.roleName
          })
        }
      }
      // for person md file
      const content = await peopleConvertToYamlResolver({
        person: {
          title: person.name,
          slug: slug,
          jobTitle: null,
          memberOf
        }
      })

      storageModule.writeFile({ content, dir: join(dir, `about/people`), filename: `${slug}.md` })
    }
    return missingSlugs
  } catch (error) {
    console.log(error)
    return []
  }
}
