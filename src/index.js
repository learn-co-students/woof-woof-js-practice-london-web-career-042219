document.addEventListener('DOMContentLoader', init)
const pupUrl = "http://localhost:3000/pups/"
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const dogStatusButton = document.querySelector("#good-dog-filter")


//create a span tag with dogs name inside
//create img element, h2, button. 

function fetchPups () {
    return fetch(pupUrl) 
        .then(response => response.json())
        //filter global variable state obj 
        // .then(array => {filterPups(array)})
        .then(filteredPups => renderPups(filteredPups));
}

function renderPups(filteredPups) {
    filteredPups.forEach(pup  => {
        let span = document.createElement("span");
        span.innerText = pup.name;
        span.dataset.id = pup.id;

        span.addEventListener('click', event => {
            event.preventDefault()
            showPupInfo(event.target.dataset.id)
        }) 

        dogBar.append(span)
    })
}

function showPupInfo(pupId) {
    return fetch(pupUrl + pupId)
        .then(response => response.json())
        .then(pupInfo => renderPupInfo(pupInfo))
}

function renderPupInfo(pup) {
    dogInfo.innerHTML = ""
    //create image, h2 and button
    let image = document.createElement("img");
    let h2 = document.createElement("h2");
    let button = document.createElement("button");
    button.addEventListener("click", () => changeDogStatus(pup))
    image.src = pup.image 
    h2.innerText = pup.name

    if (pup.isGoodDog == true) {
        button.innerText = "Good Dog!"
    } else {
        button.innerText = "Bad Dog!"
    }

    dogInfo.append(image, h2, button)
}

function changeDogStatus(pup){
    return fetch(pupUrl + pup.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: !pup.isGoodDog
        })
    })
    .then(response => response.json())
    .then(renderPupInfo)
}

// function filterPups() {
//     debugger
//     dogStatusButton.addEventListener("click", (e) => {
//         e.preventDefault;
//         if (dogStatusButton.innerText == "Filter good dogs: OFF") {
//             renderPups(array)
//         } else {
//         const filteredPups = array.filter(pup => pup.isGoodDog == true);
//             renderPups(filteredPups)
//         }
//         dogStatusButton.innerText != dogStatusButton.innerText
//     })
// }

function init() {
    fetchPups()
}

init()