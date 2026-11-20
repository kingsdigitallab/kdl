import { getOrganisationRepository } from './repository.ts'

export const organisationGetFundersUseCase = ({ dir }: { dir: string }) => {
  return getOrganisationRepository()
    .readOrganisations({ dir })
    .filter((org) => org && org.metadata.tags.includes('organisations'))
}

export const organisationGetDepartments = ({ dir }: { dir: string }) => {
  return getOrganisationRepository()
    .readOrganisations({ dir })
    .filter((org) => org && org.metadata.tags.includes('departments'))
}
