// tslint:disable
// this is an auto generated file. This will be overwritten

export const getProject = `query GetProject($id: ID!) {
  getProject(id: $id) {
    id
    name
    status
  }
}
`;
export const listProjects = `query ListProjects(
  $filter: ModelProjectFilterInput
  $limit: Int
  $nextToken: String
) {
  listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      status
    }
    nextToken
  }
}
`;
export const getTask = `query GetTask($id: ID!) {
  getTask(id: $id) {
    taskid
    desc
    Project
    user
    completed
  }
}
`;
export const listTasks = `query ListTasks(
  $filter: ModelTaskFilterInput
  $limit: Int
  $nextToken: String
) {
  listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      taskid
      desc
      Project
      user
      completed
    }
    nextToken
  }
}
`;
export const getTaskTable = `query GetTaskTable($id: ID!) {
  getTaskTable(id: $id) {
    id
    name
    desc
    Project
    user
    completed
  }
}
`;
export const listTaskTables = `query ListTaskTables(
  $filter: ModelTaskTableFilterInput
  $limit: Int
  $nextToken: String
) {
  listTaskTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      desc
      Project
      user
      completed
    }
    nextToken
  }
}
`;
