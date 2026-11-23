import { getStorageModule } from '../infrastructure/storage.ts'
import { assetsEvalUseCase } from './get.ts'
import { assetsSyncUseCase } from './update.ts'

export const assetsEvalController = async ({
  dir,
  mode
}: {
  dir?: string
  mode: 'blog' | 'projects' | 'slides'
}) => {
  if (!dir) {
    console.error(`You need to provide a dir`)
    return
  }
  const storageModule = getStorageModule()
  return assetsEvalUseCase({ dir, storageModule, mode })
}

export const assetsSyncController = async ({
  dir,
  mode
}: {
  dir?: string
  mode: 'blog' | 'projects' | 'slides'
}) => {
  if (!dir) {
    console.error(`You need to provide a dir`)
    return
  }
  const storageModule = getStorageModule()
  return assetsSyncUseCase({ dir, storageModule, mode })
}
