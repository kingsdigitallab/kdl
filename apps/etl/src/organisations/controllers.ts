import { getStorageModule } from '../infrastructure/storage.ts'
import {
  projectListActiveProjectsUseCase,
  projectListArchivedProjectsUseCase,
  projectsGetProjectsFromIdUseCase
} from '../projects/get.ts'
import { getProjectsRepository } from '../projects/repository.ts'
import { projectsConvertToYamlResolver } from '../projects/resolvers.ts'
import { organisationCreateOrganisationsUseCase } from './create.ts'
import { getOrganisationRepository } from './repository.ts'

export const organisationsSyncFromRemoteProjectsController = async ({
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
    console.error(`You need to provide a dir`)
    return
  }
  const organisationsRepository = getOrganisationRepository()
  const projectsRepository = getProjectsRepository()
  const active = await projectListActiveProjectsUseCase({
    apiKey,
    apiUrl,
    customItemId,
    projectsRepository,
    teamId
  })
  const archived = await projectListArchivedProjectsUseCase({
    apiKey,
    apiUrl,
    customItemId,
    projectsRepository,
    teamId
  })

  const data = { projects: [...active.projects, ...archived.projects], spaces: active.spaces }
  const storageModule = getStorageModule()

  const metadata = await Promise.all(
    data.projects
      .map((project) =>
        projectsConvertToYamlResolver({
          projectsRepository,
          outputPath: dir,
          project,
          spaces: data.spaces
        })
      )
      .filter((data) => data !== null)
  )
  const funders = await Promise.all(
    metadata.map((data) =>
      organisationCreateOrganisationsUseCase({
        organisationsRepository,
        dir,
        names:
          data?.metadata.funders
            ?.filter((funder) => funder.name)
            .map((funder) => funder.name)
            .filter((x) => x !== undefined) ?? [],
        tag: 'organisations',
        storageModule
      })
    )
  )
  const departments = await Promise.all(
    metadata.map((data) =>
      organisationCreateOrganisationsUseCase({
        organisationsRepository,
        dir,
        names:
          data?.metadata.departments
            ?.filter((funder) => funder.name)
            .map((funder) => funder.name) ?? [],
        tag: 'departments',
        storageModule
      })
    )
  )
  return { funders, departments }
}

export const organisationsSyncFromActiveProjectsController = async ({
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
    console.error(`You need to provide a dir`)
    return
  }
  const storageModule = getStorageModule()
  const projectsRepository = getProjectsRepository()
  const organisationsRepository = getOrganisationRepository()
  const data = await projectListActiveProjectsUseCase({
    apiKey,
    apiUrl,
    customItemId,
    projectsRepository,
    teamId
  })
  const metadata = await Promise.all(
    data.projects
      .map((project) =>
        projectsConvertToYamlResolver({
          projectsRepository,
          outputPath: dir,
          project,
          spaces: data.spaces
        })
      )
      .filter((data) => data !== null)
  )
  const funders = await Promise.all(
    metadata.map((data) =>
      organisationCreateOrganisationsUseCase({
        organisationsRepository,
        dir,
        names:
          data?.metadata?.funders
            ?.map((funder) => funder.name)
            .filter((funder) => funder !== undefined) ?? [],
        tag: 'organisations',
        storageModule
      })
    )
  )
  const departments = await Promise.all(
    metadata.map((data) =>
      organisationCreateOrganisationsUseCase({
        organisationsRepository,
        dir,
        names:
          data?.metadata.departments
            ?.filter((funder) => funder.name)
            .map((funder) => funder.name) ?? [],
        tag: 'departments',
        storageModule
      })
    )
  )
  return { funders, departments }
}

export const organisationsSyncFromProjectsIdsFileController = async ({
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
    console.error(`You need to provide a dir`)
    return
  }
  const projectsRepository = getProjectsRepository()
  const storageModule = getStorageModule()
  const organisationsRepository = getOrganisationRepository()
  const { projects, spaces } = await projectsGetProjectsFromIdUseCase({
    apiKey,
    apiUrl,
    projectsRepository,
    teamId,
    storageModule,
    dir
  })

  const metadata = await Promise.all(
    projects
      .filter((data) => data !== null)
      .map((project) =>
        projectsConvertToYamlResolver({
          projectsRepository,
          outputPath: dir,
          project,
          spaces: spaces
        })
      )
      .filter((data) => data !== null)
  )
  const funders = await Promise.all(
    metadata.map((data) =>
      organisationCreateOrganisationsUseCase({
        organisationsRepository,
        dir,
        names:
          data?.metadata.funders
            ?.filter((funder) => funder.name)
            .map((funder) => funder.name)
            .filter((x) => x !== undefined) ?? [],
        tag: 'organisations',
        storageModule
      })
    )
  )
  const departments = await Promise.all(
    metadata.map((data) =>
      organisationCreateOrganisationsUseCase({
        organisationsRepository,
        dir,
        names:
          data?.metadata.departments
            ?.filter((funder) => funder.name)
            .map((funder) => funder.name) ?? [],
        tag: 'departments',
        storageModule
      })
    )
  )
  return { funders, departments }
}
