const BASE_URL = `http://localhost:3000/pups`

const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')

//fetch all the dogs from the api
function getDogs(){
    return fetch(BASE_URL)
    .then(resp => resp.json())

}


//add a single dog to the page
function displayDog(dog){
    const dogSpan = document.createElement('span')
            dogSpan.className = `Dog${dog.id}`


    dogSpan.innerHTML = `
    ${dog.name}
    `

    dogBar.append(dogSpan)

    
    dogSpan.addEventListener('click', () => {
        dogInfo.innerHTML = ""
            dogDiv = document.createElement('div')
                dogDiv.className = "allDogInfo"
        
        
                dogDiv.innerHTML =`
        <img src=${dog.image}>
        <h2>${dog.name}</h2>
        <button id=${dog.id} button>${dog.isGoodDog}</button>
        `
        
        dogInfo.append(dogDiv)

        
    })
    
}


//add mutliply dogs to page
function addDogs(dogs){
    dogs.forEach((dog) => displayDog(dog))
}

function init(){
getDogs()
    .then((dogs) =>addDogs(dogs))
}

init()