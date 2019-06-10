// STAGE 1
// Get the dogs data and render in the dog-bar div, 
// but only rendering good or bad dogs depending upon the value of button#good-dog-filter
//
PUPS_FILTER=document.getElementById("good-dog-filter");
PUPS_NODE=document.getElementById("dog-bar")
PUPS_URL='http://localhost:3000/pups'
PUPINFO_NODE=document.getElementById("dog-info")

// On the page, there is a div with the id of "dog-bar". 
// On page load, make a fetch to get all of the pup objects. 
function getPups() {
    PUPS_NODE.innerHTML=""
    fetch(PUPS_URL)
        .then( data => data.json() )
        .then( displayPups)
}

// for the array of pups, loop
function displayPups( pupsData ) {
    for ( counter in pupsData ){
        renderPup( pupsData[counter])
    }
}

// When you have this information, you'll need to add a span with the pup's name
// to the dog bar (ex: <span>Mr. Bonkers</span>).
function renderPup ( pupData ) {

    if (PUPS_FILTER.innerText=="Filter good dogs: ON" && pupData.isGoodDog==false) {
    } else {
        newPup=document.createElement('SPAN')
        newPup.innerText=pupData.name
        newPup.setAttribute("id",`pupId${pupData.id}`)
        newPup.setAttribute("data-id",pupData.id)
        PUPS_NODE.appendChild(newPup)
        newPup.addEventListener('click', event => selectPup(event, pupData ) )
    }
}

function selectPup( event, pupData ) {

    renderPupDetails( pupData )
// console.log(`${PUPS_URL}/${event.target.dataset.id}`)
// // Fetch the data for the selected pup, and display it.
//     fetch( `${PUPS_URL}/${event.target.dataset.id}`)
//         .then( data => data.json())
//         .then ( renderPupDetails )
}

function renderPupDetails( pupData ) {
    PUPINFO_NODE.innerHTML=""
    pupDetail=document.createElement('DIV')
    pupDetail.innerHTML=`<img src=${pupData.image}><h2>${pupData.name}</h2><button id=pupGoodBtn${pupData.id} data-id=${pupData.id} >Good Dog!</button>`
    PUPINFO_NODE.appendChild(pupDetail)
    renderGoodBtnText( pupData )
//    pupDetailBtn.addEventListener('click', togglePupStatus )
    pupGoodBtn=document.getElementById(`pupGoodBtn${pupData.id}`)
    pupGoodBtn.addEventListener('click', event => togglePupStatus(event, pupData ))

    //TODO -- NEED TO SET THE DESCRIPTION BASED UPON DATABASE GOOD/BAD STATUS

}

function renderGoodBtnText( pupData ) {
    pupGoodBtn=document.getElementById(`pupGoodBtn${pupData.id}`)
    if (pupData.isGoodDog) {
        pupGoodBtn.innerText="Good dog!"
    } else {
        pupGoodBtn.innerText="Bad Dog!"
    }
}

// STEP 4: TOGGLE GOOD DOG
// When a user clicks the Good Dog/Bad Dog button, two things should happen:
// The button's text should change from Good to Bad or Bad to Good
// The corresponding pup object in the database should be updated to reflect the new isGoodDog value
// Please note, you can update a dog by making a PATCH request to /pups/:id
function togglePupStatus( event, pupData ) {
    if (pupData.isGoodDog) {
        pupData.isGoodDog=false;
    } else {
        pupData.isGoodDog=true;
    }
    patchPup( pupData)

}

// Update the server with the updated Pup details
function patchPup( pupData ) {
    // Set the config object headers
    configObj = {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify(pupData)
        }

    // Do the patch, for the selected pup
     fetch( `${PUPS_URL}/${pupData.id}`,
            configObj)
         .then( data => data.json())
         .then ( renderGoodBtnText )
}

// BONUS! STEP 5: FILTER GOOD DOGS
// When a user clicks on the Filter Good Dogs button, two things should happen:
// The button's text should change from "Filter good dogs: OFF" to "Filter good dogs: ON", 
// or vice versa.
// If the button now says "ON" (meaning the filter is on), 
// then the Dog Bar should only show pups whose isGoodDog attribute is true. 
// If the filter is off, the Dog Bar should show all pups (like normal).
//
// Add the event listener to the filger
PUPS_FILTER.addEventListener(  'click', toggleFilterPups )

function toggleFilterPups( event ) {
    console.log( event.target  )
    if (event.target.innerText=="Filter good dogs: OFF") {
        event.target.innerText="Filter good dogs: ON"
    } else {
        event.target.innerText="Filter good dogs: OFF"
    }
    getPups()
}

document.body.onload = getPups() // Run the main function when the page loads.
                    // I could also have done this in the document load event listener