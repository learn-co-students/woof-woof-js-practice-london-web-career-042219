window.addEventListener("DOMContentLoaded", (event) => {
	const dogBar = document.querySelector("div#dog-bar");
	const dogContainer = document.querySelector("#dog-info");

	const PUP_URL = "http://localhost:3000/pups/"

	function getPuppers() {
		fetch(PUP_URL)
			.then((response) => response.json())
			.then(renderPuppers);
	}

	function renderPuppers(pupperJSON) {
		pupperJSON.forEach((pupper) => {
			let span = document.createElement("span");
			span.innerText = pupper.name;
			span.dataset.id = pupper.id;

			span.addEventListener("click", (e) => {
				getAndShowPupperInfo(e.target.dataset.id);
				
			})
			
			dogBar.appendChild(span);
		});
	}

	function getAndShowPupperInfo(id) {
		fetch(`${PUP_URL}${id}`)
			.then((response) => response.json())
			.then(renderPupperInfo);
	}

	function renderPupperInfo(json) {
		dogContainer.innerHTML = "";

		const img = document.createElement("img");
		img.src = json.image;
		dogContainer.appendChild(img);

		const name = document.createElement("h2");
		name.innerText = json.name;
		dogContainer.appendChild(name);

		const button = document.createElement("button");
		button.addEventListener("click", (e) => {
			const newVal = e.target.innerText == "Good Dog!";
			toggleGoodDog(e.target.dataset.id, newVal)
			e.target.innerText = newVal ? "Bad Dog!" : "Good Dog!";
		});
		button.dataset.id = json.id;
		button.innerText = json.isGoodDog ? "Bad Dog!" : "Good Dog!";
		dogContainer.appendChild(button);
		
	}

	function toggleGoodDog(id, value) {
		fetch(`${PUP_URL}${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				isGoodDog: value
			})
		})
			.then(response => response.json())
			.then()
	}

	getPuppers();
});
