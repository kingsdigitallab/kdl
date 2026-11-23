import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

export const IStorageFileSystem = {
  readFile: ({ dir, filename }: { dir: string; filename: string }) => {
    const file = join(dir, filename)
    if (existsSync(file)) {
      return readFileSync(file)
    }
    return null
  },
  listFiles: ({ dir }: { dir: string }) => {
    if (existsSync(dir)) {
      return readdirSync(dir)
    }
    return null
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

export const getStorageModule = () => IStorageFileSystem
