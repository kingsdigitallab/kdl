import yaml from 'yaml'
import { formatMarkdown } from '../utils/markdown.ts'

export const peopleConvertToYamlResolver = async ({
  person
}: {
  person: {
    title: string
    slug: string
    jobTitle: string | null
    memberOf: {
      startDate: string | null
      endDate: string | null
      organisation: { name: string; slug: string }
      roleName: string
    }[]
  }
}) => {
  const mdContent = [
    '---',
    yaml
      .stringify({
        ...person,
        tags: ['people']
      })
      .trim(),
    '---',
    ''
  ].join('\n')
  const formatted = await formatMarkdown({ content: mdContent })
  return formatted
}
