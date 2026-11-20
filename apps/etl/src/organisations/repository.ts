import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import yaml from 'yaml'
import { join } from 'node:path'

type OrganisationMetadata = {
  title: string
  alternateName: string | null
  tags: string[]
  slug: string
  foundingDate: string | null
  dissolutionDate: string | null
  parentOrganisation: { name: string; slug: string; alternateName: string } | null
  subOrganisations: { name: string; slug: string; alternateName: string | null }[]
  urls: { type: string; url: string }[]
}

export const IOrganisationsRepository = {
  readOrganisations: ({
    dir
  }: {
    dir: string
  }): ({ content: string; metadata: OrganisationMetadata } | null)[] => {
    const fundersDir = join(dir, 'about/organisations')
    if (!existsSync(fundersDir)) {
      return []
      // mkdirSync(fundersDir, { recursive: true })
    }
    const existingFiles = readdirSync(fundersDir)
    const parsed = existingFiles.map((file: string) => {
      const content = readFileSync(join(fundersDir, file), 'utf8')
      const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
      if (match) {
        return {
          content: content,
          metadata: yaml.parse(match[1]) as OrganisationMetadata
        }
      }
      return null
    })
    return parsed
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

export const getOrganisationRepository = () => IOrganisationsRepository
