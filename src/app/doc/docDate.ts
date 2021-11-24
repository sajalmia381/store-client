import { environment } from "@env/environment"
const apiBaseUrl = environment.apiBaseUrl;
export default {
  "product": [
    {
      "name": "Get all Products",
      "code": `fetch('${apiBaseUrl}/products')
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      "name": "Get a single product",
      "code": `fetch('${apiBaseUrl}/products/mens-casual-shoes-sports-running-sneakers')
      .then(response => response.json())
      .then(json => console.log(json))`
    },
    {
      "name": "Pagination results",
      "code": `fetch('${apiBaseUrl}/products?limit=10&page=1')
      .then(response => response.json())
      .then(json => console.log(json))`
    },
    {
      "name": "Create product",
      "code": `fetch('${apiBaseUrl}/products',
      {
          method: 'POST',
          body: JSON.stringify({
            title: 'Men Boxer Sneakers For Men  (Black)',
            price: 799
            description: 'Lorem Ipsum is simply dummy text of the printing',
            category: "612e42d755b07f20de9ec6a5"
          }),
          headers: {
            'Content-type': 'multipart/form-data',
          },
      })
      .then(response => response.json())
      .then(json => console.log(json))`
    },
    {
      "name": "Update product",
      "code": `fetch('${apiBaseUrl}/products/mens-casual-shoes-sports-running-sneakers',
      {
          method: 'PUT',
          body: JSON.stringify({
            title: 'Men Boxer Sneakers For Men  (Black)',
            price: 799
            description: 'Lorem Ipsum is simply dummy text of the printing',
            category: "612e42d755b07f20de9ec6a5"
          }),
          headers: {
            'Content-type': 'multipart/form-data',
          },
      })
      .then(response => response.json())
      .then(json => console.log(json))`
    },
    {
      "name": "Delete product",
      "code": `fetch('${apiBaseUrl}/products/mens-casual-shoes-sports-running-sneakers',
      {
          method: 'DELETE',
      })
      .then(response => response.json())
      .then(json => console.log(json))`
    }
  ]
}