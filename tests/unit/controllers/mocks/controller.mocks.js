const serviceReturn =  {
  "id": 5,
  "itemsSold": [
    {
      "productId": 2,
      "quantity": 1
    },
    {
      "productId": 1,
      "quantity": 1
    }
  ]
}

const reqBody = [
    {
    "productId": 2,
    "quantity": 1
  },
  {
    "productId": 1,
    "quantity": 1
  }
]
  
const reqWrongId = [
    {
    "productId": 5,
    "quantity": 1
  },
  {
    "productId": 1,
    "quantity": 1
  }
  ]
  
module.exports = {
  serviceReturn,
  reqBody,
  reqWrongId,
}