import { assetsEvalController, assetsSyncController } from '../src/assets/controllers.ts'
import { organisationsSyncFromProjectsIdsFileController } from '../src/organisations/controllers.ts'
import {
  projectsEvaluateProjectsController,
  projectsGenerateMarkdownFromIdsController,
  projectsGeneratePeopleFromDirController,
  projectsSyncIdFileController
} from '../src/projects/controllers.ts'

type Args = '--action' | '--dest' | '--item-id'
type Required = { required: true; message: string; options?: string[] }
type Optional = { required: false }

export const getArg = (arg: Args, options: Optional | Required) => {
  const index = process.argv.findIndex((el) => el.startsWith(arg))
  if (options.required && index === -1) {
    console.log(options.message)
    process.exit(1)
  }
  if (index === -1) {
    return [arg, undefined]
  }
  const value = String(process.argv[index].split('=')[1])
  if (options.required && value === 'undefined') {
    console.log(options.message)
    process.exit(1)
  }
  if (options?.required && options.options && !options.options.find((option) => option === value)) {
    console.log(`${arg} must be one of [${options.options.join(', ')}]; it was: ${value}`)
    process.exit(1)
  }

  return [arg, value]
}

export const handleArgs = (args: Record<Args, Optional | Required>) => {
  const results = Object.fromEntries(
    Object.entries(args).map((x: [Args, Optional | Required]) => getArg(...x))
  ) as Record<Args, string | undefined>
  return results
}

const main = async () => {
  console.time('etl')
  const apiKey = process.env.CLICKUP_API_KEY
  const apiUrl = 'https://api.clickup.com/api/v2'
  const teamId = process.env.CLICKUP_TEAM_ID
  const args = handleArgs({
    '--action': {
      required: true,
      options: [
        'sync',
        'write-projects',
        'write-orgs',
        'write-people',
        'evaluate',
        'assets-evaluate-blog',
        'assets-sync-blog',
        'assets-evaluate-projects',
        'assets-sync-projects',
        'assets-evaluate-slides',
        'assets-sync-slides'
      ],
      message: `You need to provide an --action.`
    },
    '--dest': {
      required: true,
      message: `You need to provide an --dest.`
    },
    '--item-id': { required: false }
  })

  if (args['--action'] === 'sync') {
    await projectsSyncIdFileController({
      teamId,
      apiKey,
      apiUrl,
      dir: args['--dest'],
      customItemId: args['--item-id']
    })
  }
  if (args['--action'] === 'write-projects') {
    await projectsGenerateMarkdownFromIdsController({
      teamId,
      apiKey,
      apiUrl,
      dir: args['--dest']
    })
  }
  if (args['--action'] === 'write-orgs') {
    await organisationsSyncFromProjectsIdsFileController({
      teamId,
      apiKey,
      apiUrl,
      dir: args['--dest']
    })
  }
  if (args['--action'] === 'write-people') {
    await projectsGeneratePeopleFromDirController({ dir: args['--dest'] })
  }
  if (args['--action'] === 'evaluate') {
    const results = projectsEvaluateProjectsController({ dir: args['--dest'] })
    if (results?.duplicates) {
      console.log(JSON.stringify(results.duplicates, null, 2))
    }
  }
  if (args['--action'] === 'assets-evaluate-blog') {
    const results = await assetsEvalController({ dir: args['--dest'], mode: 'blog' })
    console.log(JSON.stringify(results, null, 2))
  }
  if (args['--action'] === 'assets-sync-blog') {
    const results = await assetsSyncController({ dir: args['--dest'], mode: 'blog' })
    console.log(JSON.stringify(results, null, 2))
  }
  if (args['--action'] === 'assets-evaluate-projects') {
    const results = await assetsEvalController({ dir: args['--dest'], mode: 'projects' })
    console.log(JSON.stringify(results, null, 2))
  }
  if (args['--action'] === 'assets-sync-projects') {
    const results = await assetsSyncController({ dir: args['--dest'], mode: 'projects' })
    console.log(JSON.stringify(results, null, 2))
  }
  if (args['--action'] === 'assets-evaluate-slides') {
    const results = await assetsEvalController({ dir: args['--dest'], mode: 'slides' })
    console.log(JSON.stringify(results, null, 2))
  }
  if (args['--action'] === 'assets-sync-slides') {
    const results = await assetsSyncController({ dir: args['--dest'], mode: 'slides' })
    console.log(JSON.stringify(results, null, 2))
  }
  console.log(`Action: ${args['--action']}`)
  console.timeEnd('etl')
}

main()
