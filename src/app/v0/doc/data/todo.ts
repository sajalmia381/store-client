import { environment } from '@env/environment';
import { IApi } from '@shared/components/api';
const apiBaseUrl = environment.apiBaseUrl;

export const todoDoc: Record<string, IApi> = {
  list: {
    name: 'Get all todos',
    code: `fetch('${apiBaseUrl}/todos')
        .then(response => response.json())
        .then(json => console.log(json))`
  },
  create: {
    name: 'Add new todo',
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
        .then(json => console.log(json))`
  },
  update: {
    name: 'Update todo',
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
        .then(json => console.log(json))`
  },
  destroy: {
    name: 'Delete todo',
    code: `fetch('${apiBaseUrl}/todos/654fbbee25a4902cc1fc7032',
        {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(json => console.log(json))`
  }
};