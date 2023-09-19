console.log('javascript started')
console.log('this is start of java')
// fetch("http://localhost:8000/weather?address=sweden").then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
// const searchLocation  = document.querySelector('input')
const searchLocation = document.querySelector('#searchInput') // Use the id selector
const messgaeOne = document.querySelector('#message_one')
const messageTwo = document.querySelector('#message_two')

// messgaeOne.textContent = 'this is javascript text'

console.log(searchLocation.value)

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = searchLocation.value

    fetch('http://localhost:8000/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messgaeOne.textContent = data.error
        }else{
            messgaeOne.textContent = data.address
            messageTwo.textContent = "The weather for the give location is "+data.forecast.temperature+" degree celcius obeserved at a time "+data.forecast.observation_time
        }
    })
    })
    console.log("testing")
})