import {
  projectListActiveProjectsUseCase,
  projectListArchivedProjectsUseCase,
  projectsEvaluateProjectsFromDirUseCase
} from './get.ts'
import {
  projectGenerateMarkdownActiveProjectsUseCase,
  projectGenerateMarkdownArchivedProjectsUseCase,
  projectGenerateMarkdownFromIdsUseCase,
  projectGeneratePeopleFromDirUseCase,
  projectsSyncIdFileUseCase
} from './update.ts'
import { getProjectsRepository } from './repository.ts'
import { getStorageModule } from '../infrastructure/storage.ts'
import { getPeopleRepository } from '../people/repository.ts'

export const projectsListActiveProjectsController = async ({
  apiKey,
  apiUrl,
  teamId,
  customItemId
}: {
  customItemId?: string
  apiKey?: string
  apiUrl?: string
  teamId?: string
}) => {
  if (!apiKey) {
    console.error(`You need to provide an API Key`)
    return
  }
  if (!apiUrl) {
    console.error(`You need to provide an API URL`)
    return
  }
  if (!teamId) {
    console.error(`You need to provide a Team ID`)
    return
  }
  if (!customItemId) {
    console.error(`You need to provide a Custom item ID`)
    return
  }
  return await projectListActiveProjectsUseCase({
    apiKey,
    apiUrl,
    customItemId,
    projectsRepository: getProjectsRepository(),
    teamId
  })
}

export const projectsListArchivedProjectsController = async ({
  apiKey,
  apiUrl,
  teamId,
  customItemId
}: {
  customItemId?: string
  apiKey?: string
  apiUrl?: string
  teamId?: string
}) => {
  if (!apiKey) {
    console.error(`You need to provide an API Key`)
    return
  }
  if (!apiUrl) {
    console.error(`You need to provide an API URL`)
    return
  }
  if (!teamId) {
    console.error(`You need to provide a Team ID`)
    return
  }
  if (!customItemId) {
    console.error(`You need to provide a Custom item ID`)
    return
  }
  return await projectListArchivedProjectsUseCase({
    apiKey,
    apiUrl,
    customItemId,
    projectsRepository: getProjectsRepository(),
    teamId
  })
}

export const projectsSyncIdFileController = async ({
  apiKey,
  apiUrl,
  teamId,
  customItemId,
  dir
}: {
  customItemId?: string
  apiKey?: string
  apiUrl?: string
  teamId?: string
  dir?: string
}) => {
  if (!apiKey) {
    console.error(`You need to provide an API Key`)
    return
  }
  if (!apiUrl) {
    console.error(`You need to provide an API URL`)
    return
  }
  if (!teamId) {
    console.error(`You need to provide a Team ID`)
    return
  }
  if (!customItemId) {
    console.error(`You need to provide a Custom item ID`)
    return
  }
  if (!dir) {
    console.error(`You need to provide a Custom item ID`)
    return
  }
  return await projectsSyncIdFileUseCase({
    apiKey,
    apiUrl,
    customItemId,
    projectsRepository: getProjectsRepository(),
    teamId,
    dir,
    storageModule: getStorageModule()
  })
}

export const projectsGenerateMarkdownFromIdsController = async ({
  apiKey,
  apiUrl,
  teamId,
  dir
}: {
  apiKey?: string
  apiUrl?: string
  teamId?: string
  dir?: string
}) => {
  if (!apiKey) {
    console.error(`You need to provide an API Key`)
    return
  }
  if (!apiUrl) {
    console.error(`You need to provide an API URL`)
    return
  }
  if (!teamId) {
    console.error(`You need to provide a Team ID`)
    return
  }
  if (!dir) {
    console.error(`You need to provide a Custom item ID`)
    return
  }
  const projectsRepository = getProjectsRepository()
  const storageModule = getStorageModule()
  const written = await projectGenerateMarkdownFromIdsUseCase({
    dir,
    storageModule,
    apiKey,
    apiUrl,
    projectsRepository,
    teamId
  })
  return written
}

export const projectsGenerateMarkdownFromActiveProjectsController = async ({
  apiKey,
  apiUrl,
  teamId,
  customItemId,
  dir
}: {
  customItemId?: string
  apiKey?: string
  apiUrl?: string
  teamId?: string
  dir?: string
}) => {
  if (!apiKey) {
    console.error(`You need to provide an API Key`)
    return
  }
  if (!apiUrl) {
    console.error(`You need to provide an API URL`)
    return
  }
  if (!teamId) {
    console.error(`You need to provide a Team ID`)
    return
  }
  if (!customItemId) {
    console.error(`You need to provide a Custom item ID`)
    return
  }
  if (!dir) {
    console.error(`You need to provide a Custom item ID`)
    return
  }
  const projectsRepository = getProjectsRepository()
  const storageModule = getStorageModule()
  const written = await projectGenerateMarkdownActiveProjectsUseCase({
    dir,
    storageModule,
    apiKey,
    apiUrl,
    projectsRepository,
    teamId,
    customItemId
  })
  return written
}

export const projectsGenerateMarkdownFromArchivedProjectsController = async ({
  apiKey,
  apiUrl,
  teamId,
  customItemId,
  dir
}: {
  customItemId?: string
  apiKey?: string
  apiUrl?: string
  teamId?: string
  dir?: string
}) => {
  if (!apiKey) {
    console.error(`You need to provide an API Key`)
    return
  }
  if (!apiUrl) {
    console.error(`You need to provide an API URL`)
    return
  }
  if (!teamId) {
    console.error(`You need to provide a Team ID`)
    return
  }
  if (!customItemId) {
    console.error(`You need to provide a Custom item ID`)
    return
  }
  if (!dir) {
    console.error(`You need to provide a Custom item ID`)
    return
  }
  const projectsRepository = getProjectsRepository()
  const storageModule = getStorageModule()
  const written = await projectGenerateMarkdownArchivedProjectsUseCase({
    dir,
    storageModule,
    apiKey,
    apiUrl,
    projectsRepository,
    teamId,
    customItemId
  })
  return written
}

export const projectsGeneratePeopleFromDirController = async ({ dir }: { dir?: string }) => {
  if (!dir) {
    console.error(`You need to provide a Custom item ID`)
    return
  }
  const projectsRepository = getProjectsRepository()
  const storageModule = getStorageModule()
  const peopleModule = getPeopleRepository()
  const written = await projectGeneratePeopleFromDirUseCase({
    dir,
    storageModule,
    projectsRepository,
    peopleModule
  })
  return written
}

export const projectsEvaluateProjectsController = ({ dir }: { dir?: string }) => {
  if (!dir) {
    console.error(`You need to provide a Custom item ID`)
    return
  }
  const projectsRepository = getProjectsRepository()
  return projectsEvaluateProjectsFromDirUseCase({ dir, projectsRepository })
}
