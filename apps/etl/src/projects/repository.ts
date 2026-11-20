import axios from 'axios'
import yaml from 'yaml'
import type {
  FoldersResponse,
  ListsResponse,
  SpacesResponse,
  Task,
  TaskMetadata,
  TaskResponse
} from './types.ts'
import { existsSync } from 'fs'
import { join } from 'node:path'
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { batchMap, sleep } from '../utils/index.ts'
import { SLEEP_TIME } from '../utils/vars.ts'
const MODES = ['archived', 'not_archived']
const MAX_RETRIES = 3

export const createClient = ({ apiUrl, apiKey }: { apiUrl: string; apiKey: string }) => {
  const client = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: apiKey,
      'Content-Type': 'application/json',
      accept: 'application/json'
    }
  })
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error.config

      const shouldRetry =
        !error.response || (error.response.status >= 500 && error.response.status < 600)

      if (!shouldRetry) {
        console.log(`Error but not retrying`)
        return Promise.reject(error)
      }

      config._retryCount = config._retryCount ?? 0

      if (config._retryCount >= MAX_RETRIES) {
        console.log(`Error but max retries exceeded`)
        return Promise.reject(error)
      }

      config._retryCount += 1
      console.log(`Retrying... ${config._retryCount} of ${MAX_RETRIES}`)
      const backoff = SLEEP_TIME * 2 ** config._retryCount
      await sleep(backoff)

      return client(config)
    }
  )
  return client
}

export const IProjectsRepository = {
  getSpaceByTeamId: async ({
    apiKey,
    apiUrl,
    teamId
  }: {
    apiKey: string
    apiUrl: string
    teamId: string
  }) => {
    try {
      const { data } = await createClient({ apiKey, apiUrl }).get<SpacesResponse>(
        `/team/${teamId}/space`
      )
      return data
    } catch (_err) {
      console.log(_err)
      return { spaces: [] }
    }
  },
  getFoldersBySpaceId: async ({
    apiKey,
    apiUrl,
    spaceId
  }: {
    apiKey: string
    apiUrl: string
    spaceId: string
  }) => {
    try {
      const { data } = await createClient({ apiKey, apiUrl }).get<FoldersResponse>(
        `/space/${spaceId}/folder?archived=true`
      )
      return data
    } catch (_err) {
      console.log(_err)
      return { folders: [] }
    }
  },
  getListsByFolderId: async ({
    apiKey,
    apiUrl,
    folderId
  }: {
    apiKey: string
    apiUrl: string
    folderId: string
  }) => {
    try {
      const { data } = await createClient({ apiKey, apiUrl }).get<ListsResponse>(
        `/folder/${folderId}/list`
      )
      return data
    } catch (_err) {
      console.log(_err)
      return { lists: [] }
    }
  },
  getTasksByListId: async ({
    apiKey,
    apiUrl,
    listId,
    customItemId
  }: {
    apiKey: string
    apiUrl: string
    listId: string
    customItemId: string
  }) => {
    try {
      const { data } = await createClient({ apiKey, apiUrl }).get<TaskResponse>(
        `/list/${listId}/task?custom_items[]=${customItemId}&include_closed=true`
      )
      return data
    } catch (_err) {
      console.log(_err)
      return { tasks: [], last_page: true }
    }
  },

  listTasksByTeamId: async ({
    apiKey,
    apiUrl,
    teamId,
    customItemId
  }: {
    apiKey: string
    apiUrl: string
    teamId: string
    customItemId: string
  }) => {
    const tasks = []
    let page = 0
    let isLastPage = false
    while (!isLastPage) {
      const taskResponse = await createClient({ apiKey, apiUrl }).get<TaskResponse>(
        `/team/${teamId}/task?custom_items[]=${customItemId}&page=${page}`
      )

      tasks.push(...taskResponse.data.tasks)

      if (taskResponse.data.last_page || taskResponse.data.tasks.length === 0) {
        isLastPage = true
        break
      }

      page++
    }
    return tasks
  },
  listArchivedTasksByTeamId: async ({
    apiKey,
    apiUrl,
    teamId,
    customItemId
  }: {
    apiKey: string
    apiUrl: string
    teamId: string
    customItemId: string
  }) => {
    try {
      const client = createClient({ apiKey, apiUrl })
      console.log(`Fetching archived data - item ${customItemId}`)
      const spaces = await client.get<SpacesResponse>(`/team/${teamId}/space`)
      console.log(`Spaces: ${spaces.data.spaces.length}`)
      const folders = await Promise.all(
        spaces.data.spaces.map((space) =>
          client
            .get<FoldersResponse>(`/space/${space.id}/folder?archived=true`)
            .then((res) => res.data.folders)
        )
      ).then((res) => res.flatMap((folders) => folders.map((folder) => folder.id)))
      console.log(`Folders: ${folders.length}`)
      const batchedFolders = batchMap(folders, 50)
      let foldersBatch = 0
      let lists: string[] = []
      console.log(`Fetching lists of folder`)
      for (const folders of batchedFolders) {
        for (const mode of MODES) {
          const url = (id: string) =>
            mode === 'not_archived' ? `/folder/${id}/list` : `/folder/${id}/list?archived=true`
          console.log(`Batch ${foldersBatch + 1} of ${batchedFolders.length}; mode ${mode}`)
          const res = await Promise.allSettled(
            folders.map((id) => client.get<ListsResponse>(url(id)))
          ).then((res) =>
            res.flatMap((res) =>
              res.status === 'fulfilled'
                ? res.value.data.lists.map((res) => res.id)
                : (() => {
                    console.log('getting list error')
                    console.log(JSON.stringify(res.reason, null, 2))
                    return null
                  })()
            )
          )
          lists = [...lists, ...res.filter((x) => x !== null)]
          await sleep(SLEEP_TIME)
        }
        foldersBatch++
      }
      console.log(`Lists: ${lists.length}`)
      const batchedLists = batchMap(lists, 50)
      let batch = 0
      let results: Task[] = []
      console.log(`Fetching tasks of list`)
      for (const lists of batchedLists) {
        for (const mode of MODES) {
          console.log(`Batch ${batch + 1} of ${batchedLists.length}; mode ${mode}`)
          // TODO: add generator fn
          // let page = 0
          // let isLastPage = false
          const url = (id: string) =>
            mode === 'not_archived'
              ? `/list/${id}/task?custom_items[]=${customItemId}&include_closed=true`
              : `/list/${id}/task?custom_items[]=${customItemId}&include_closed=true&archived=true`
          const res = await Promise.allSettled(
            lists.map((id) => client.get<TaskResponse>(url(id)))
          ).then((res) =>
            res.flatMap((r) =>
              r.status === 'fulfilled'
                ? r.value.data.tasks
                : (() => {
                    console.log('getting task error')
                    console.log(JSON.stringify(r.reason, null, 2))
                    return null
                  })()
            )
          )
          results = [...results, ...res.filter((x) => x !== null)]
          await sleep(SLEEP_TIME)
        }

        batch++
      }
      console.log(`Archived tasks: ${results.length}`)
      return results
    } catch (error) {
      console.log(error)
      return []
    }
  },

  getTaskById: async ({ id, apiKey, apiUrl }: { id: string; apiKey: string; apiUrl: string }) => {
    try {
      const { data } = await createClient({ apiKey, apiUrl }).get<Task>(`/task/${id}`)
      return data
    } catch (_err) {
      console.log(_err)
      return null
    }
  },
  getTaskFromFile: ({
    dir,
    filename
  }: {
    dir: string
    filename: string
  }): { content: string | null; metadata: TaskMetadata } => {
    const projectsDir = join(dir, 'projects')
    const file = join(projectsDir, filename)
    if (!existsSync(projectsDir)) {
      return {
        content: null,
        metadata: {}
      }
    }
    if (!existsSync(file)) {
      return {
        content: null,
        metadata: {}
      }
    }
    const content = readFileSync(file, 'utf8')
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (match) {
      return {
        content: content,
        metadata: yaml.parse(match[1]) as TaskMetadata
      }
    }
    return {
      content: null,
      metadata: {}
    }
  },
  getTasksFromDir: ({
    dir
  }: {
    dir: string
  }): { content: string | null; metadata: TaskMetadata }[] => {
    if (!existsSync(dir)) {
      return []
    }
    const files = readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((file) => {
        const content = readFileSync(join(dir, file), 'utf8')
        const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
        if (match) {
          return {
            content: content,
            metadata: yaml.parse(match[1]) as TaskMetadata
          }
        }
        return {
          content: null,
          metadata: {}
        }
      })

    return files
  },
  getTasksFromDirWithFile: ({
    dir
  }: {
    dir: string
  }): { content: string | null; metadata: TaskMetadata; file: string | null }[] => {
    const _dir = join(dir, `projects`)
    if (!existsSync(_dir)) {
      return []
    }
    const files = readdirSync(_dir)
      .filter((f) => f.endsWith('.md'))
      .map((file) => {
        const content = readFileSync(join(_dir, file), 'utf8')
        const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
        if (match) {
          return {
            content: content,
            metadata: yaml.parse(match[1]) as TaskMetadata,
            file
          }
        }
        return {
          content: null,
          metadata: {},
          file: null
        }
      })

    return files
  },
  writeFile: ({ dir, filename, content }: { dir: string; filename: string; content: string }) => {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }
    writeFileSync(join(dir, filename), content)
    return {
      message: 'ok'
    }
  }
}

export const getProjectsRepository = () => IProjectsRepository
