import { environment } from '@env/environment';
import { IApi } from '@shared/components/api';
const apiBaseUrl = environment.apiBaseUrl;

export const todoDoc: Record<string, IApi> = {
  list: {
    name: 'Get All Todos',
    code: `fetch('${apiBaseUrl}/todos')
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: `{
      "data": [
        {
          "_id": "654fbbee25a4902cc1fc7032",
          "title": "Set up version control system (e.g., Git)",
          "completed": false,
          "createdBy": "612e4959345dcc333ac6cb35",
          "createdAt": "2023-11-11T17:37:50.481Z",
          "updatedAt": "2023-11-11T17:37:50.481Z",
          "description": "",
          "status": "TODO"
        },
        {
          "_id": "654fbddb23cf2530811a108f",
          "title": "Create a new project repository",
          "completed": false,
          "createdBy": "612e4959345dcc333ac6cb35",
          "createdAt": "2023-11-11T17:46:03.433Z",
          "updatedAt": "2023-11-11T17:46:03.433Z",
          "description": "",
          "status": "IN_PROGRESS"
        },
        ...
      ],
      "status": 200,
      "message": "Success! Todo list"
    }`
  },
  create: {
    name: 'Add New Todo',
    code: `fetch('${apiBaseUrl}/todos', 
        {
          method: 'POST',
          body: JSON.stringify({
            "title": "Conduct code reviews regularly",
            "status": "TODO",
            "description": "Some description"
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: `{
      "data": {
        "_id": "664f76cf7efe9d60afab1325",
        "title": "Conduct code reviews regularly",
        "completed": false,
        "status": "TODO",
        "description": "Some description",
        "createdBy": "612e4959345dcc333ac6cb35"
      },
      "status": 201,
      "message": "Success! Todo created"
    }`
  },
  update: {
    name: 'Update Todo',
    code: `fetch('${apiBaseUrl}/todos/654fbbee25a4902cc1fc7032', 
        {
          method: 'PUT',
          body: JSON.stringify({
            "status": "IN_PROGRESS",
            "description": "Update description"
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: `{
      "data": {
        "_id": "654fbbee25a4902cc1fc7032",
        "title": "Set up version control system (e.g., Git)",
        "status": "IN_PROGRESS",
        "description": "Update description",
        "completed": false,
        "createdAt": "2023-11-11T17:37:50.481Z",
        "updatedAt": "2023-11-11T17:37:50.481Z"
      },
      "status": 202,
      "message": "Success! Todo updated"
    }`
  },
  destroy: {
    name: 'Delete Todo',
    code: `fetch('${apiBaseUrl}/todos/654fbbee25a4902cc1fc7032',
        {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => console.log(json))`,
    output: `{
      "status": 202,
      "message": "Success! Todo deleted"
    }`
  }
};
