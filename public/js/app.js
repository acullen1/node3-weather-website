console.log('client side javascript files is loaded!')

fetch('http://puzzle.mead.io/puzzle/').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'Loading...'
    message2.textContent = ''
    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((body) => {
      
      if(body.error) {
        message1.textContent = body.error
        
    } else {
        message1.textContent = body.forecast
        message2.textContent = body.location
       

    }

    })
})
    console.log(location)
})