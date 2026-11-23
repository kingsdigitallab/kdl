import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

export const IPeopleRepository = {
  listFiles: ({ dir }: { dir: string }) => {
    const _dir = join(dir, 'about/people')
    if (!existsSync(_dir)) {
      return []
    }
    return readdirSync(_dir)
      .map((file) => (file.endsWith('.md') ? file.replace(/\.md$/, '') : null))
      .filter((file) => file !== null)
  }
}

export const getPeopleRepository = () => IPeopleRepository
