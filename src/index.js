const dogBar = document.getElementById("dog-bar");
const dogURL = "http://localhost:3000/pups"

//fetches all the dogs from the URL
function getAllPups() {
	return fetch(dogURL)
	.then((resp) => resp.json())
}

//makes the HTML code for every pup
function renderPups(pup){
	const spanTag = document.createElement('span');
	spanTag.innerHTML = `${pup.name}`
	spanTag.className = "dogData"

	dogBar.append(spanTag)

	//once you click each dog name, it shows each dogs information and picture
	spanTag.addEventListener("click", () => {


		let dogInfo = document.createElement('div')

		dogInfo.className = "dogInfo"

					dogInfo.innerHTML = `<li>${pup.name}</li>
					<image src = ${pup.image}>
					<li>Is he a good dog?: ${pup.isGoodDog}</li>`

		const dogSummary = document.getElementById('dog-info');
		dogSummary.innerHTML = ""

		dogSummary.append(dogInfo)

	}
	)

}


function addPups(pupsArray) {
	pupsArray.forEach((pupObj) => renderPups(pupObj))
}

getAllPups().then((allPups) => addPups(allPups))








