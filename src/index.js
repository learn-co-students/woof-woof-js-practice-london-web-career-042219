const pupsFilter = document.getElementById("good-dog-filter");
const pupsNode = document.getElementById("dog-bar")
const BASE_URL = 'http://localhost:3000/pups'
const pupInfo = document.getElementById("dog-info")

function getPups() {
    pupsNode.innerHTML=""
    fetch(BASE_URL)
        .then( data => data.json() )
        .then( displayPups)
}

function displayPups( pupsData ) {
    for ( counter in pupsData ){
        renderPup( pupsData[counter])
    }
}

function renderPup ( pupData ) {

     if (pupsFilter.innerText=="Filter good dogs: ON" && pupData.isGoodDog==false) {
    } else {
        newPup = document.createElement('SPAN')
        newPup.innerText=pupData.name
        newPup.setAttribute("id",`pupId${pupData.id}`)
        newPup.setAttribute("data-id",pupData.id)
        pupsNode.appendChild(newPup)
        newPup.addEventListener('click', event => selectPup(event, pupData))
    }
}

 function selectPup( event, pupData ) {
     renderPupDetails( pupData )
}

 function renderPupDetails( pupData ) {
    pupInfo.innerHTML=""
    pupDetail=document.createElement('DIV')
    pupDetail.innerHTML=`<img src=${pupData.image}><h2>${pupData.name}</h2><button id=pupGoodBtn${pupData.id} data-id=${pupData.id} >Good Dog!</button>`
    pupInfo.appendChild(pupDetail)
    renderGoodBtnText( pupData )
    pupGoodBtn=document.getElementById(`pupGoodBtn${pupData.id}`)
    pupGoodBtn.addEventListener('click', event => togglePupStatus(event, pupData ))
 }

 function renderGoodBtnText( pupData ) {
    pupGoodBtn=document.getElementById(`pupGoodBtn${pupData.id}`)
    if (pupData.isGoodDog) {
        pupGoodBtn.innerText="Good dog!"
    } else {
        pupGoodBtn.innerText="Bad Dog!"
    }
  }

function togglePupStatus( event, pupData ) {
    if (pupData.isGoodDog) {
        pupData.isGoodDog=false;
    } else {
        pupData.isGoodDog=true;
    }
    patchPup( pupData)
 }

function patchPup( pupData ) {
    configObj = {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(pupData)
        }

     fetch( `${PUPS_URL}/${pupData.id}`,
            configObj)
         .then( data => data.json())
         .then ( renderGoodBtnText )
}

pupsFilter.addEventListener('click', toggleFilterPups)

 function toggleFilterPups( event ) {
    console.log( event.target  )
    if (event.target.innerText=="Filter good dogs: OFF") {
        event.target.innerText="Filter good dogs: ON"
    } else {
        event.target.innerText="Filter good dogs: OFF"
    }
    getPups()
}

 document.body.onload = getPups()