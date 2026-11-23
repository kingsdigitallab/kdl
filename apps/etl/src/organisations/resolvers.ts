import yaml from 'yaml'
import { formatMarkdown } from '../utils/markdown.ts'
import { slugify } from '../utils/index.ts'

export const organisationsConvertToYamlResolver = async ({
  name,
  alternate_name,
  tags,
  parent_organisation,
  sub_organisations,
  urls,
  content
}: {
  name: string
  tags: string[]
  alternate_name: string | null
  sub_organisations: {
    name: string
    alternateName: string | null
  }[]
  parent_organisation: {
    name: string
    slug: string
    alternateName: string | null
  } | null
  urls: { type: string; url: string }[]
  content?: string
}) => {
  const frontmatter = {
    title: name.trim(),
    alternateName: alternate_name?.trim() ?? null,
    tags,
    slug: slugify(name),
    foundingDate: null,
    dissolutionDate: null,
    parentOrganisation: parent_organisation,
    subOrganisations: sub_organisations,
    urls
  }

  const writeContent = [
    '---',
    yaml.stringify(frontmatter).trim(),
    '---',
    '',
    content ? content.split('---')[2].trim() : ''
  ].join('\n')
  const formattedContent = await formatMarkdown({ content: writeContent })

  return {
    metadata: frontmatter,
    content: formattedContent
  }
}
