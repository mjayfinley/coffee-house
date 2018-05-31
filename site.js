let getAllOrders = document.getElementById("getAllOrders")
let searchEmailTextBox = document.getElementById("searchEmailTextBox")
let searchEmailBtn = document.getElementById("searchEmailBtn")
let newOrderEmail = document.getElementById("newOrderEmail")
let submitOrder = document.getElementById("submitOrder")
let newOrderCoffee = document.getElementById("newOrderCoffee")
let orderList = document.getElementById("orderList")
let deleteOrder = document.getElementById("deleteOrder")


function getOrders() {
  fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/')
  .then(function(response){
    return response.json()

  }).then(function(json){
    orderList.innerHTML = ''
    Object.keys(json).forEach(function(item){
      let orders = `<li class="listItems">
                      <h2>Email: ${json[item].emailAddress}</h2>
                      <h2>Coffee: ${json[item].coffee}</h2>
                    </li>`
      orderList.innerHTML += orders
    })
  })
}


searchEmailBtn.addEventListener("click", function(){
  let searchEmail = searchEmailTextBox.value
  let searchQuery = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${searchEmail}`
  fetch(searchQuery)
  .then(function(response){
    return response.json()

  }).then(function(json){
    orderList.innerHTML = ''
      let orders = `<li class="listItems">
                      <h2>Email: ${json.emailAddress}</h2>
                      <h2>Coffee: ${json.coffee}</h2>
                    </li>`

      orderList.innerHTML += orders
  })
  searchEmailTextBox.value = ''
})



deleteOrder.addEventListener("click", function(){
  let emailDelete = searchEmailTextBox.value
  let emailDeleteQuery = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${emailDelete}`
  fetch(emailDeleteQuery, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(function(response){
    return response.json()
  }).then(function(json){
    getOrders()
  })
  searchEmailTextBox.value = ''

})

submitOrder.addEventListener("click", function(){
  let coffeeOrder = newOrderCoffee.value
  let emailOrder = newOrderEmail.value
  let order = {emailAddress: emailOrder, coffee: coffeeOrder}

  fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  }).then(function(response){
    return response.json()
  }).then(function(json){
    getOrders()
  })

  newOrderCoffee.value = ''
  newOrderEmail.value = ''

})



getAllOrders.addEventListener("click", function(){
  getOrders()
})










// http://dc-coffeerun.herokuapp.com/api/coffeeorders/

// Params: emailAddress (string), coffee (string)
/*
let order = {
  coffee: 'Large Coffee',
  emailAddress: 'kramer@gmail.com',
  quantity : 12
}

console.log(order)
console.log(JSON.stringify(order))

*/
