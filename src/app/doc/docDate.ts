export default {
  "product": [
    {
      "name": "Get all Products",
      "code": `fetch('https://storerestapi.com/api/products')
        .then(response => response.json())
        .then(json => console.log(json))`
    },
    {
      "name": "Get a single product",
      "code": `fetch('https://storerestapi.com/api/products/mens-casual-shoes-sports-running-sneakers')
      .then(response => response.json())
      .then(json => console.log(json))`
    },
    {
      "name": "Pagination results",
      "code": `fetch('https://storerestapi.com/api/products?limit=10&page=1')
      .then(response => response.json())
      .then(json => console.log(json))`
    },
    {
      "name": "Create product",
      "code": `fetch('https://storerestapi.com/api/products',
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
      "code": `fetch('https://storerestapi.com/api/products/mens-casual-shoes-sports-running-sneakers',
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
      "code": `fetch('https://storerestapi.com/api/products/mens-casual-shoes-sports-running-sneakers',
      {
          method: 'DELETE',
      })
      .then(response => response.json())
      .then(json => console.log(json))`
    }
  ]
}