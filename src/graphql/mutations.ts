// tslint:disable
// this is an auto generated file. This will be overwritten

export const createProject = `mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    name
    status
  }
}
`;
export const updateProject = `mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
    id
    name
    status
  }
}
`;
export const deleteProject = `mutation DeleteProject($input: DeleteProjectInput!) {
  deleteProject(input: $input) {
    id
    name
    status
  }
}
`;
export const createTask = `mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    taskid
    desc
    Project
    user
    completed
  }
}
`;
export const updateTask = `mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    taskid
    desc
    Project
    user
    completed
  }
}
`;
export const deleteTask = `mutation DeleteTask($input: DeleteTaskInput!) {
  deleteTask(input: $input) {
    taskid
    desc
    Project
    user
    completed
  }
}
`;
export const createTaskTable = `mutation CreateTaskTable($input: CreateTaskTableInput!) {
  createTaskTable(input: $input) {
    id
    name
    desc
    Project
    user
    completed
  }
}
`;
export const updateTaskTable = `mutation UpdateTaskTable($input: UpdateTaskTableInput!) {
  updateTaskTable(input: $input) {
    id
    name
    desc
    Project
    user
    completed
  }
}
`;
export const deleteTaskTable = `mutation DeleteTaskTable($input: DeleteTaskTableInput!) {
  deleteTaskTable(input: $input) {
    id
    name
    desc
    Project
    user
    completed
  }
}
`;
