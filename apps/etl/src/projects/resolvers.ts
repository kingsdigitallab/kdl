// import slugify from "@sindresorhus/slugify";
import { join } from 'node:path'
import type { Member, Task, Space, TaskMetadata } from './types.ts'
import { IProjectsRepository } from './repository.ts'
import yaml from 'yaml'
import { formatMarkdown } from '../utils/markdown.ts'
import { slugify } from '../utils/index.ts'

export const projectsConvertToYamlResolver = async ({
  project,
  spaces,
  outputPath,
  projectsRepository
}: {
  project: Task
  spaces: Space[]
  outputPath: string
  projectsRepository: typeof IProjectsRepository
}): Promise<{ metadata: TaskMetadata; content: string | null } | null> => {
  // Get name
  const name = getName({ project })
  // Get slug
  const slug = getSlug({ project, name })

  // Get project start date
  const projectStartDate = getCustomFieldValue(project, 'Project start date')
  if (!projectStartDate) {
    // console.error(`No project start date found for ${name}, setting to default`);
    // projectStartDate = `1970-01-01-`;
    // NOTE: there are files inside the md folder that have been edited manually/have no information in clickup
    // this skips these files from being overwritten
    console.error(` - No project start date found for ${name}, skipping`)
    return null
    // continue
  }

  const foundingDate = convertDate(
    typeof projectStartDate === 'string' ? projectStartDate : projectStartDate[0]
  )

  // Get project end date
  const projectEndDate = getCustomFieldValue(project, 'Project end date')
  const dissolutionDate = projectEndDate
    ? convertDate(typeof projectEndDate === 'string' ? projectEndDate : projectEndDate[0])
    : ''

  const datePrefix = foundingDate ? `${foundingDate}-` : '1970-01-01-'
  const existing = projectsRepository.getTaskFromFile({
    dir: outputPath,
    filename: `${datePrefix}${slug}.md`
  })

  const spaceStatus = spaces.find((space) => space.id === project.space.id)?.name?.trim()

  const sla = getSLADates({ data: project })

  // NOTE: this could break the statuses if the name for 'post-project' space changes
  const creativeWorkStatus = sla.start
    ? 'Maintained'
    : spaceStatus?.toLowerCase() === 'post-project'
      ? spaceStatus
      : 'Active'

  // Mark as draft if the length of the content is less tha 20 chars

  const descriptionLen = existing.content?.split('---')[2]?.trim().length || 0
  const draft = descriptionLen < 20

  const frontmatter = {
    ...existing.metadata,
    draft,
    title: name,
    name: name,
    tags: ['projects'],
    alternateName: getCustomFieldValue(project, 'Acronym'),
    slug: slug,
    foundingDate,
    dissolutionDate,
    creativeWorkStatus,
    keywords: getKeywords({ data: project }),
    funders: getAndConvertFunders({
      data: project
    }),
    departments: getAndConvertDepartments({
      data: project
    }),
    members: getMembers({ data: project }),
    sla
  }

  const urls = getUrls({ data: project })
  if (urls.length > 0) {
    frontmatter.urls = [...(frontmatter?.urls || []), ...urls].reduce(
      (
        acc: {
          name: string
          url: string | undefined
        }[],
        curr
      ) => {
        if (!acc.find((url) => url.url === curr.url)) {
          acc.push(curr)
        }
        return acc
      },
      []
    )
  }

  const writeContent = [
    '---',
    yaml.stringify(frontmatter).trim(),
    '---',
    '',
    existing?.content ? existing.content.split('---')[2].trim() : ''
  ].join('\n')
  const formattedContent = await formatMarkdown({ content: writeContent })

  return {
    metadata: frontmatter,
    content: formattedContent
  }
}

/**
 * Get simple custom field value by name
 */
const getCustomFieldValue = (data: Task, fieldName: string) => {
  const field = data.custom_fields.find((field) => field.name === fieldName)
  return field?.value || null
}

const getName = ({ project }: { project: Task }): string => {
  let name = getCustomFieldValue(project, 'Project name') || project.name
  const acronymMatch =
    typeof name === 'string' ? name.match(/\(([^)]+)\)$/) : name[0].match(/\(([^)]+)\)$/)
  if (acronymMatch) {
    name =
      typeof name === 'string'
        ? name.replace(acronymMatch[0], '').trim()
        : name[0].replace(acronymMatch[0], '').trim()
  }
  const result = typeof name === 'string' ? name : name[0]
  return result
}

const getSlug = ({ project, name }: { project: Task; name: string }) => {
  let slug = getCustomFieldValue(project, 'Slug')

  if (!slug) {
    // console.warn(` - No slug found for ${name}, generating from name`);
    slug = slugify(typeof name === 'string' ? name : name[0])
  }
  return slug
}

const convertDate = (timestamp: string) => {
  return new Date(parseInt(timestamp)).toISOString().split('T')[0]
}

/**
 * Get SLA dates
 */
const getSLADates = ({ data }: { data: Task }) => {
  const startDate = getCustomFieldValue(data, 'SLA start date')
  const endDate = getCustomFieldValue(data, 'SLA end date')

  return {
    start:
      startDate && typeof startDate === 'string'
        ? new Date(parseInt(startDate)).toISOString().split('T')[0]
        : null,
    end:
      endDate && typeof endDate === 'string'
        ? new Date(parseInt(endDate)).toISOString().split('T')[0]
        : null
  }
}

/**
 * Get themes from custom fields
 */
const getKeywords = ({ data }: { data: Task }) => {
  const themeField = data.custom_fields.find((field) => field.name === 'Theme')
  if (!themeField || !themeField.value) return []
  return themeField.type_config.options
    .filter((opt) => themeField.value?.includes(opt.id))
    .map((opt) => ({
      name: opt.label,
      // HACK: this should be removed/data driven
      slug: opt.label === 'Machine Learning and AI' ? 'machine-learning-ai' : slugify(opt.label)
    }))
}

/**
 * Get URLs from url custom field
 */
const getUrls = ({ data }: { data: Task }) => {
  const urlFields = data.custom_fields
    .filter((field) => field.name.toLowerCase().includes(' url'))
    .filter((field) => field.value)
    .map((field) => ({
      name: field.name.trim(),
      url: typeof field.value === 'string' ? field.value?.trim() : field.value?.[0]?.trim()
    }))
  return urlFields
}

/**
 * Get members from various custom fields
 */
export const getMembers = ({ data }: { data: Task }) => {
  const members: Member[] = []

  const kdlStaffField = data.custom_fields.find((field) => field.name === 'KDL staff')

  if (kdlStaffField && kdlStaffField.value && typeof kdlStaffField.value === 'string') {
    kdlStaffField.value
      .split('],')
      .filter((staff) => staff.trim())
      .forEach((staff) => {
        const [name, role] = staff.split('[')
        const roleName = role.trim().replace(']', '')
        const member = {
          name: name.trim(),
          slug: slugify(name.trim()),
          roleName
        }

        members.push(member)
      })
  }

  const plField = data.custom_fields.find((field) => field.name === 'PL')
  const clField = data.custom_fields.find((field) => field.name === 'CL')
  const researchersField = data.custom_fields.find((field) => field.name === 'Researchers')

  const otherMembers = [
    ...parseMemberStr({ str: plField?.value, roleName: 'Principal investigator' }),
    ...parseMemberStr({ str: clField?.value, roleName: 'Co-Investigator' }),
    ...parseMemberStr({ str: researchersField?.value, roleName: 'Researcher' })
  ].filter((member) => member.name && member.name !== '')

  return [...members, ...otherMembers].filter((member, index, self) => {
    return index === self.findIndex((t) => t.slug === member.slug && t.roleName === member.roleName)
  })
  // if (plField && plField.value && typeof plField.value === "string") {
  // 	plField.value.split("],").forEach((pl) => {
  // 		const [name, inOrganisation] = pl.split("[");
  // 		const member: Member = {
  // 			name: name.replace(",", "").trim(),
  // 			slug: slugify(name.replace(",", "").trim()),
  // 			roleName: "Principal investigator",
  // 		};
  //
  // 		const organisationName = inOrganisation?.trim();
  // 		if (organisationName) {
  // 			member.inOrganisation = {
  // 				name: organisationName,
  // 				slug: slugify(organisationName),
  // 			};
  // 		}
  // 		if (member.name && member.name !== "") {
  // 			members.push(member);
  // 		}
  // 	});
  // }

  // if (clField && clField.value && typeof clField.value === "string") {
  // 	clField.value.split("]").forEach((cl) => {
  // 		const [name, inOrganisation] = cl.split("[");
  //
  // 		const member: Member = {
  // 			name: name.replace(",", "").trim(),
  // 			slug: slugify(name.replace(",", "").trim()),
  // 			roleName: "Co-Investigator",
  // 		};
  //
  // 		const organisationName = inOrganisation?.trim();
  // 		if (organisationName) {
  // 			member.inOrganisation = {
  // 				name: organisationName,
  // 				slug: slugify(organisationName),
  // 			};
  // 		}
  //
  // 		if (member.name && member.name !== "") {
  // 			members.push(member);
  // 		}
  // 	});
  // }

  // if (researchersField && researchersField.value && typeof researchersField.value === "string") {
  // 	researchersField.value
  // 		.split(",")
  // 		.filter((researcher) => researcher.trim())
  // 		.forEach((researcher) => {
  // 			const [name, inOrganisation] = researcher.split("[");
  //
  // 			const member: Member = {
  // 				name: name.trim(),
  // 				slug: slugify(name.trim()),
  // 				roleName: "Researcher",
  // 			};
  //
  // 			const organisationName = inOrganisation?.trim().replace("]", "");
  // 			if (organisationName) {
  // 				member.inOrganisation = {
  // 					name: organisationName,
  // 					slug: slugify(organisationName),
  // 				};
  // 			}
  //
  // 			members.push(member);
  // 		});
  // }
}

const parseMemberStr = ({ str, roleName }: { str?: string | string[]; roleName: string }) => {
  if (typeof str === 'string') {
    const first_name = str.slice(0, str.indexOf('['))
    const later_names = str.match(/\][^[]*?\[/g)
    const names = [first_name, ...(later_names ?? [])].map((str) =>
      str.replaceAll(']', '').replaceAll('[', '').replaceAll(',', '').trim()
    )
    const orgs =
      str.match(/\[[^[]*?\]/g)?.map((str) => str.replaceAll(']', '').replaceAll('[', '').trim()) ??
      []
    if (names.length !== orgs.length) return []

    const results = names.reduce((acc, el, idx) => {
      const name = el
      const member: Member = {
        name: name,
        slug: slugify(name),
        roleName
      }

      const organisationName = orgs[idx]
      if (organisationName) {
        member.inOrganisation = {
          name: organisationName,
          slug: slugify(organisationName)
        }
      }
      acc.push(member)
      return acc
    }, [] as Member[])
    return results
  }
  return []
}

/**
 * Get funders from custom fields
 */
const getAndConvertFunders = ({ data }: { data: Task }) => {
  const funderField = data.custom_fields.find((field) => field.name === 'Funder(s)')
  if (!funderField || !funderField.value || typeof funderField.value === 'string') return []
  const funders = funderField.value.map((funder) => {
    const found = funderField.type_config.options.find((opt) => opt.id === funder)
    return {
      name: found?.label,
      slug: slugify(found?.label ?? '/')
    }
  })
  // HACK: skip external
  return funders.filter((dept) => dept.slug !== 'external')
}

/**
 * Get departments from custom fields
 */
const getAndConvertDepartments = ({ data }: { data: Task }) => {
  const departments: { name: string; slug: string }[] = []

  const deptsField = data.custom_fields.find((field) => field.name === 'Department(s)')
  if (deptsField && deptsField.value && Array.isArray(deptsField.value)) {
    deptsField.value.forEach((dept) => {
      const found = deptsField.type_config.options.find((opt) => opt.id === dept)
      if (found) {
        departments.push({
          name: found.label,
          slug: slugify(found.label)
        })
      }
    })
  }

  const partnersField = data.custom_fields.find((field) => field.name === 'Partner organisation(s)')
  if (partnersField && partnersField.value && Array.isArray(partnersField.value)) {
    partnersField.value.forEach((partner) => {
      const found = partnersField.type_config.options.find((opt) => opt.id === partner)
      if (found) {
        departments.push({
          name: found.label,
          slug: slugify(found.label)
        })
      }
    })
  }
  const facultiesField = data.custom_fields.find((field) => field.name === 'Faculty(ies)')
  if (facultiesField && facultiesField.value && Array.isArray(facultiesField.value)) {
    facultiesField.value.forEach((partner) => {
      const found = facultiesField.type_config.options.find((opt) => opt.id === partner)
      if (found) {
        departments.push({
          name: found.label,
          slug: slugify(found.label)
        })
      }
    })
  }
  // HACK: skip external
  return departments.filter((dept) => dept.slug !== 'external')
}

export const projectsResolveFileName = ({
  metadata,
  dir
}: {
  metadata: { foundingDate?: string; slug?: string | string[] }
  dir: string
}) => {
  if (!metadata.slug) {
    return null
  }
  const datePrefix = metadata.foundingDate ? `${metadata.foundingDate}-` : '1970-01-01-'
  const outputFile = join(dir, 'projects')
  return {
    output: outputFile,
    filename: `${datePrefix}${typeof metadata.slug === 'string' ? metadata.slug : metadata.slug[0]}.md`
  }
}
