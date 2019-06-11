const dogBar = document.getElementById("dog-bar");
const dogURL = "http://localhost:3000/pups"

//fetches all the dogs from the URL
function getAllPups() {
	return fetch(dogURL)
	.then((resp) => resp.json())
}


function pupGoodOrBad(pupsObj) {
	return patchDogs(pupsObj)
	.then(() => document.querySelector(`#dog-${pupsObj.id}`).innerHTML = `Good Dog?: ${pupsObj.isGoodDog}`)
}

function patchDogs(pupsObj) {

	if (pupsObj.isGoodDog == true ) {
		pupsObj.isGoodDog = false
	} else {
		pupsObj.isGoodDog = true
	}

	return fetch(dogURL + `/${pupsObj.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify({
			isGoodDog: pupsObj.isGoodDog
		})
	}).then((resp) => resp.json())




}


//makes the HTML code for every pup
function renderPups(pupsObj){
	let pupSpan = document.createElement("span")
	pupSpan.innerHTML = `${pupsObj.name}`

	dogBar.append(pupSpan);

	pupSpan.addEventListener("click", () => {

		let dogData = document.createElement("li")

		let dogInfo = document.getElementById("dog-info")


		dogData.innerHTML = ` <img src=${pupsObj.image}>
							<h2>Name: ${pupsObj.name}</h2>
							<h2 id='dog-${pupsObj.id}'>Good Dog?: ${pupsObj.isGoodDog} </h2>
							<button class='dog-${pupsObj.id}'>Good Dog!</button>`

		dogInfo.innerHTML = ""
		dogInfo.append(dogData)

		dogData.querySelector(`.dog-${pupsObj.id}`).addEventListener("click", () => {
			pupGoodOrBad(pupsObj)

		})


	})


}

function addPups(pupsArray) {
	pupsArray.forEach((pupObj) => renderPups(pupObj))
}

getAllPups().then((pupsArray) => addPups(pupsArray) )

