/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateProjectInput = {
  id?: string | null,
  name: string,
  status: boolean,
};

export type UpdateProjectInput = {
  id: string,
  name?: string | null,
  status?: boolean | null,
};

export type DeleteProjectInput = {
  id?: string | null,
};

export type CreateTaskInput = {
  taskid: string,
  desc: string,
  Project: string,
  user: string,
  completed: boolean,
};

export type UpdateTaskInput = {
  taskid?: string | null,
  desc?: string | null,
  Project?: string | null,
  user?: string | null,
  completed?: boolean | null,
};

export type DeleteTaskInput = {
  id?: string | null,
};

export type CreateTaskTableInput = {
  id?: string | null,
  name: string,
  desc: string,
  Project: string,
  user: string,
  completed: boolean,
};

export type UpdateTaskTableInput = {
  id: string,
  name?: string | null,
  desc?: string | null,
  Project?: string | null,
  user?: string | null,
  completed?: boolean | null,
};

export type DeleteTaskTableInput = {
  id?: string | null,
};

export type ModelProjectFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  status?: ModelBooleanFilterInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelBooleanFilterInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelTaskFilterInput = {
  taskid?: ModelIDFilterInput | null,
  desc?: ModelStringFilterInput | null,
  Project?: ModelStringFilterInput | null,
  user?: ModelStringFilterInput | null,
  completed?: ModelBooleanFilterInput | null,
  and?: Array< ModelTaskFilterInput | null > | null,
  or?: Array< ModelTaskFilterInput | null > | null,
  not?: ModelTaskFilterInput | null,
};

export type ModelTaskTableFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  desc?: ModelStringFilterInput | null,
  Project?: ModelStringFilterInput | null,
  user?: ModelStringFilterInput | null,
  completed?: ModelBooleanFilterInput | null,
  and?: Array< ModelTaskTableFilterInput | null > | null,
  or?: Array< ModelTaskTableFilterInput | null > | null,
  not?: ModelTaskTableFilterInput | null,
};

export type CreateProjectMutationVariables = {
  input: CreateProjectInput,
};

export type CreateProjectMutation = {
  createProject:  {
    __typename: "Project",
    id: string,
    name: string,
    status: boolean,
  } | null,
};

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput,
};

export type UpdateProjectMutation = {
  updateProject:  {
    __typename: "Project",
    id: string,
    name: string,
    status: boolean,
  } | null,
};

export type DeleteProjectMutationVariables = {
  input: DeleteProjectInput,
};

export type DeleteProjectMutation = {
  deleteProject:  {
    __typename: "Project",
    id: string,
    name: string,
    status: boolean,
  } | null,
};

export type CreateTaskMutationVariables = {
  input: CreateTaskInput,
};

export type CreateTaskMutation = {
  createTask:  {
    __typename: "Task",
    taskid: string,
    desc: string,
    Project: string,
    user: string,
    completed: boolean,
  } | null,
};

export type UpdateTaskMutationVariables = {
  input: UpdateTaskInput,
};

export type UpdateTaskMutation = {
  updateTask:  {
    __typename: "Task",
    taskid: string,
    desc: string,
    Project: string,
    user: string,
    completed: boolean,
  } | null,
};

export type DeleteTaskMutationVariables = {
  input: DeleteTaskInput,
};

export type DeleteTaskMutation = {
  deleteTask:  {
    __typename: "Task",
    taskid: string,
    desc: string,
    Project: string,
    user: string,
    completed: boolean,
  } | null,
};

export type CreateTaskTableMutationVariables = {
  input: CreateTaskTableInput,
};

export type CreateTaskTableMutation = {
  createTaskTable:  {
    __typename: "TaskTable",
    id: string,
    name: string,
    desc: string,
    Project: string,
    user: string,
    completed: boolean,
  } | null,
};

export type UpdateTaskTableMutationVariables = {
  input: UpdateTaskTableInput,
};

export type UpdateTaskTableMutation = {
  updateTaskTable:  {
    __typename: "TaskTable",
    id: string,
    name: string,
    desc: string,
    Project: string,
    user: string,
    completed: boolean,
  } | null,
};

export type DeleteTaskTableMutationVariables = {
  input: DeleteTaskTableInput,
};

export type DeleteTaskTableMutation = {
  deleteTaskTable:  {
    __typename: "TaskTable",
    id: string,
    name: string,
    desc: string,
    Project: string,
    user: string,
    completed: boolean,
  } | null,
};

export type GetProjectQueryVariables = {
  id: string,
};

export type GetProjectQuery = {
  getProject:  {
    __typename: "Project",
    id: string,
    name: string,
    status: boolean,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      name: string,
      status: boolean,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTaskQueryVariables = {
  id: string,
};

export type GetTaskQuery = {
  getTask:  {
    __typename: "Task",
    taskid: string,
    desc: string,
    Project: string,
    user: string,
    completed: boolean,
  } | null,
};

export type ListTasksQueryVariables = {
  filter?: ModelTaskFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTasksQuery = {
  listTasks:  {
    __typename: "ModelTaskConnection",
    items:  Array< {
      __typename: "Task",
      taskid: string,
      desc: string,
      Project: string,
      user: string,
      completed: boolean,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTaskTableQueryVariables = {
  id: string,
};

export type GetTaskTableQuery = {
  getTaskTable:  {
    __typename: "TaskTable",
    id: string,
    name: string,
    desc: string,
    Project: string,
    user: string,
    completed: boolean,
  } | null,
};

export type ListTaskTablesQueryVariables = {
  filter?: ModelTaskTableFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTaskTablesQuery = {
  listTaskTables:  {
    __typename: "ModelTaskTableConnection",
    items:  Array< {
      __typename: "TaskTable",
      id: string,
      name: string,
      desc: string,
      Project: string,
      user: string,
      completed: boolean,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateProjectSubscription = {
  onCreateProject:  {
    __typename: "Project",
    id: string,
    name: string,
    status: boolean,
  } | null,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject:  {
    __typename: "Project",
    id: string,
    name: string,
    status: boolean,
  } | null,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject:  {
    __typename: "Project",
    id: string,
    name: string,
    status: boolean,
  } | null,
};

export type OnCreateTaskSubscription = {
  onCreateTask:  {
    __typename: "Task",
    taskid: string,
    desc: string,
    Project: string,
    user: string,
    completed: boolean,
  } | null,
};

export type OnUpdateTaskSubscription = {
  onUpdateTask:  {
    __typename: "Task",
    taskid: string,
    desc: string,
    Project: string,
    user: string,
    completed: boolean,
  } | null,
};

export type OnDeleteTaskSubscription = {
  onDeleteTask:  {
    __typename: "Task",
    taskid: string,
    desc: string,
    Project: string,
    user: string,
    completed: boolean,
  } | null,
};

export type OnCreateTaskTableSubscription = {
  onCreateTaskTable:  {
    __typename: "TaskTable",
    id: string,
    name: string,
    desc: string,
    Project: string,
    user: string,
    completed: boolean,
  } | null,
};

export type OnUpdateTaskTableSubscription = {
  onUpdateTaskTable:  {
    __typename: "TaskTable",
    id: string,
    name: string,
    desc: string,
    Project: string,
    user: string,
    completed: boolean,
  } | null,
};

export type OnDeleteTaskTableSubscription = {
  onDeleteTaskTable:  {
    __typename: "TaskTable",
    id: string,
    name: string,
    desc: string,
    Project: string,
    user: string,
    completed: boolean,
  } | null,
};
