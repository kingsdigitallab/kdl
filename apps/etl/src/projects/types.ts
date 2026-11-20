export type User = {
  id: number
  username: string
  email: string
  color: string
  initials?: string
  profilePicture: string | null
}

export type Tag = {
  name: string
  tag_fg: string
  tag_bg: string
  creator: number
}

export type Status = {
  status: string
  id: string
  color: string
  type: string
  orderindex: number
}

export type CustomField = {
  id: string
  name: string
  type: string
  type_config: {
    sorting: string
    options: {
      id: string
      label: string
      color: string
      orderindex: number
    }[]
  }
  date_created: string
  hide_from_guests: boolean
  value?: string | string[]
  value_richtext: string | null
  required: boolean
}

export type Sharing = {
  public: boolean
  public_share_expires_on: null
  public_fields: {
    '0': string
    '1': string
    '2': string
    '3': string
    '4': string
    '5': string
    '6': string
    '7': string
    '8': string
    '9': string
    '10': string
    '11': string
  }
  token: null
  seo_optimized: boolean
}

export type List = {
  id: string
  name: string
  access: boolean
  orderindex?: number
  status?: Status | null
  priority?: Priority | null
  assignee?: User
  task_count?: number
  due_date?: Date | null
  start_date?: Date | null
  space?: {
    id: string
    name: string
    archived: boolean
    access: boolean
  }
  folder?: Folder
  archived?: boolean
  override_statuses?: boolean
  statuses?: Status[]
  permission_level?: string
}

export type Project = { id: string; name: string; hidden: boolean; access: boolean }

export type Folder = {
  id: string
  name: string
  hidden: boolean
  access?: boolean
  orderindex?: number
  override_statuses?: boolean
  space?: {
    id: string
    name: string
  }
  task_count?: string
  archived?: boolean
  statuses?: Status[]
  lists?: List[]
  permission_level?: string
}
export type UserTimeEstimate = {
  user: User
  time_estimate: number
}

export type Priority = {
  color: string
  id: string
  orderindex: string
  priority: string
}

export type Task = {
  id: string
  custom_id: null
  custom_item_id: number
  name: string
  text_content: null
  description: null
  status: Status
  orderindex: string
  date_created: string
  date_updated: string
  date_closed: null
  date_done: null
  archived: boolean
  creator: User
  assignees: User[]
  group_assignees: Record<string, unknown>
  watchers: User[]
  checklists: Record<string, unknown>
  tags: Tag[]
  parent: null
  top_level_parent: null
  priority: Priority | null
  due_date: string
  start_date: string
  points: null
  time_estimate: null
  custom_fields: CustomField[]
  dependencies: Record<string, unknown>
  linked_tasks: Record<string, unknown>
  locations: Record<string, unknown>
  team_id: string
  url: string
  sharing: Sharing
  permission_level: string
  list: List
  project: Project
  folder: Folder
  space: {
    id: string
  }
  time_estimates_by_user: UserTimeEstimate[]
}

export type TaskResponse = {
  tasks: Task[]
  last_page: boolean
}

export type Space = {
  id: string
  name: string
  color: string
  private: boolean
  avatar: string | null
  admin_can_manage: boolean
  statuses: Status[]
  multiple_assignees: boolean
  features: {
    due_dates: {
      enabled: boolean
      start_date: boolean
      remap_due_dates: boolean
      remap_closed_due_date: boolean
    }
    sprints: {
      enabled: boolean
    }
    time_tracking: {
      enabled: boolean
      harvest: boolean
      rollup: boolean
      default_to_billable: number
    }
    points: {
      enabled: boolean
    }
    custom_items: {
      enabled: boolean
    }
    priorities: {
      enabled: boolean
      priorities: {
        color: string
        id: string
        orderindex: string
        priority: string
      }[]
    }
    tags: {
      enabled: boolean
    }
    time_estimates: {
      enabled: boolean
      rollup: boolean
      per_assignee: boolean
    }
    check_unresolved: {
      enabled: boolean
      subtasks: null
      checklists: null
      comments: null
    }
    milestones: {
      enabled: boolean
    }
    custom_fields: {
      enabled: boolean
    }
    remap_dependencies: {
      enabled: boolean
    }
    dependency_warning: {
      enabled: boolean
    }
    status_pies: {
      enabled: boolean
    }
    multiple_assignees: {
      enabled: boolean
    }
    emails: {
      enabled: boolean
    }
    scheduler_enabled: boolean
    dependency_type_enabled: boolean
    remap_dependency_settings: {
      enabled: boolean
      enforcement_mode: number
      reschedule_closed_dependencies: boolean
    }
    reschedule_closed_dependencies: {
      enabled: boolean
    }
  }
  archived: boolean
}

export type SpacesResponse = {
  spaces: Space[]
}

export type FoldersResponse = {
  folders: Folder[]
}

export type ListsResponse = {
  lists: List[]
}

export type TaskMetadata = {
  draft?: boolean
  title?: string
  name?: string
  tags?: string[]
  alternateName?: string | string[] | null
  slug?: string | string[]
  foundingDate?: string
  dissolutionDate?: string
  creativeWorkStatus?: string
  keywords?: {
    name: string
    slug: string
  }[]
  funders?: {
    name: string | undefined
    slug: string
  }[]
  departments?: {
    name: string
    slug: string
  }[]
  members?: Member[]
  sla?: {
    start: string | null
    end: string | null
  }
  urls?: {
    name: string
    url: string | undefined
  }[]
}

export type Member = {
  name: string
  slug: string
  roleName: string
  inOrganisation?: {
    name: string
    slug: string
  }
}
