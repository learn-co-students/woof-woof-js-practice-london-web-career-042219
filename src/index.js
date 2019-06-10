document.addEventListener("DOMContentLoaded", function() {
  fetchThenRenderDogs();
});
/////////////
const baseUrl = "http://localhost:3000/pups/";
/////////////
function fetchDogs() {
  return fetch(baseUrl).then(resp => resp.json());
}
/////////////
function makeDogCard(dog) {
  const span = document.createElement("span");
  span.dataset.id = dog.id;
  span.dataset.image = dog.image;
  span.dataset.name = dog.name;
  span.dataset.isGoodDog = dog.isGoodDog;
  span.innerText = `${dog.name}`;
  span.addEventListener("click", showDogDetails);

  return span;
}
/////////////
function renderDogs(json) {
  const div = document.querySelector("#dog-bar");
  json.forEach(dog => {
    div.appendChild(makeDogCard(dog));
  });
}
/////////////
function fetchThenRenderDogs() {
  fetchDogs().then(renderDogs);
}
/////////////
function showDogDetails(e) {
  event.preventDefault();
  // debugger;
  const dogsDiv = document.querySelector("#dog-info");
  while (dogsDiv.firstChild) {
    dogsDiv.removeChild(dogsDiv.firstChild);
  }

  id = e.target.dataset.id;

  const img = document.createElement("img");
  img.src = `${e.target.dataset.image}`;
  dogsDiv.appendChild(img);

  const h2 = document.createElement("h2");
  h2.innerText = `${e.target.dataset.name}`;
  dogsDiv.appendChild(h2);
  const button = document.createElement("button");
  button.dataset.id = id;
  if (e.target.dataset.isGoodDog === "true") {
    button.innerText = "Good Dog!";
  } else if (e.target.dataset.isGoodDog === "false") {
    button.innerText = "Bad Dog!";
  } else {
    button.innerText = "Not Working!!";
  }
  button.addEventListener("click", toggleGoodBad);
  dogsDiv.appendChild(button);
}
/////////////
function toggleGoodBad(e) {
  if (e.target.innerText === "Good Dog!") {
    e.target.innerText = "Bad Dog!";
    isGoodDog = false;
  } else {
    e.target.innerText = "Good Dog!";
    isGoodDog = true;
  }
  id = e.target.dataset.id;
  dog = {
    id: id,
    name: e.target.parentElement.children[1].innerText,
    isGoodDog: isGoodDog,
    image: e.target.parentElement.children[0].src
  };
  updateDogBehavior(dog, id);
}
/////////////
function updateDogBehavior(dog, id) {
  return fetch(baseUrl + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dog)
  });
}
/////////////
const filterBtn = document.querySelector("#good-dog-filter");
/////////////
filterBtn.addEventListener("click", displayDogsByGoodBad);
/////////////
function displayDogsByGoodBad() {
  const btn = document.querySelector("#good-dog-filter");
  const div = document.querySelector("#dog-bar");
  div.innerHTML = "";

  if (btn.innerText === "Show Good Dogs:") {
    btn.innerText = "Show Bad Dogs:";
    fetchDogs().then(json => {
      json.forEach(dog => {
        if (dog.isGoodDog === true) {
          div.appendChild(makeDogCard(dog));
        }
      });
    });
  } else if (btn.innerText === "Show Bad Dogs:") {
    btn.innerText = "Show Good Dogs:";
    fetchDogs().then(json => {
      json.forEach(dog => {
        if (dog.isGoodDog === false) {
          div.appendChild(makeDogCard(dog));
        }
      });
    });
  }
}
