import { join } from 'node:path'
import type { IStorageFileSystem } from '../infrastructure/storage.ts'
import { slugify } from '../utils/index.ts'
import { ORGANISATIONS_DIR } from '../utils/vars.ts'
import type { IOrganisationsRepository } from './repository.ts'
import { organisationsConvertToYamlResolver } from './resolvers.ts'

export const organisationCreateOrganisationsUseCase = async ({
  dir,
  names,
  tag,
  storageModule,
  organisationsRepository
}: {
  dir: string
  names: string[]
  tag: 'organisations' | 'departments'
  storageModule: typeof IStorageFileSystem
  organisationsRepository: typeof IOrganisationsRepository
}) => {
  const orgDir = join(dir, ORGANISATIONS_DIR)
  const existing_organisations = organisationsRepository
    .readOrganisations({ dir })
    .map((org) => ({ slug: org?.metadata.slug, ...org }))
  const created = await Promise.all(
    names
      // skip writing `External`
      .filter((name) => name.toLowerCase() !== 'external')
      .map((name) => {
        const slug = slugify(name)
        const tags = Array.from(
          new Set([
            ...(existing_organisations.find((x) => x.slug === slug)?.metadata?.tags ?? []),
            tag
          ])
        )
        const existing_org = existing_organisations.find((x) => x.slug === slug)
        return organisationsConvertToYamlResolver({
          name,
          tags,
          parent_organisation: existing_org?.metadata?.parentOrganisation ?? null,
          urls: existing_org?.metadata?.urls ?? [],
          alternate_name: existing_org?.metadata?.alternateName ?? null,
          sub_organisations: existing_org?.metadata?.subOrganisations ?? [],
          content: existing_org?.content
        }).then((content) => {
          storageModule.writeFile({ dir: orgDir, content: content.content, filename: `${slug}.md` })
          return {
            ...content
          }
        })
      })
  )
  return created
}
