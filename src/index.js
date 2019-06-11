const PUPS_URL = "http://localhost:3000/pups";

function fetchPups() {
  fetch(PUPS_URL)
    .then(resp => resp.json())
    .then(addPupsToDom);
}

function addPupsToDom(pups) {
  const doggos = document.querySelector("#dog-bar");
  doggos.innerHTML = "";
  pups.forEach(pup => {
    const span = document.createElement("span");
    span.className = "dog-bar";
    span.dataset.id = pup.id;
    span.innerText = pup.name;
    span.addEventListener("click", () => {
      fetchOnePupper(pup.id);
    });

    doggos.appendChild(span);
  });
}

function fetchOnePupper(id) {
  fetch(PUPS_URL + `/${id}`)
    .then(resp => resp.json())
    .then(renderFullPagePupper);
}

function renderFullPagePupper(pup) {
  const pupPage = document.querySelector("#dog-info");
  pupPage.innerHTML = "";
  pupPage.dataset.id = pup.id;

  const img = document.createElement("img");
  img.className = "dog-info";
  img.src = pup.image;
  pupPage.appendChild(img);

  const name = document.createElement("h3");
  name.innerText = pup.name;
  pupPage.appendChild(name);

  goodBadDogButton(pup.isGoodDog);
}

function goodBadDogButton(state) {
  const pupPage = document.querySelector("div#dog-info");
  const id = pupPage.dataset.id;
  document.querySelector("button").remove();

  const button = document.createElement("button");

  if (state) {
    button.innerText = "Good dog!";
  } else {
    button.innerText = "Bad dog";
  }
  button.addEventListener("click", () => {
    updateGoodDogBadDogDb(id, !state);
  });

  pupPage.appendChild(button);
}

function updateGoodDogBadDogDb(id, state) {
  const options = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      isGoodDog: state
    })
  };

  fetch(PUPS_URL + `/${id}`, options).then(() => goodBadDogButton(state));
}

function addSearchListener() {
  debugger;
  const filter = document.getElementById("good-dog-filter");
  filter.addEventListener("click", () => fetchGoodPups());
}

function fetchGoodPups() {
  fetch(PUPS_URL)
    .then(resp => resp.json())
    .then(pups => pups.filter(pup => pup.isGoodDog))
    .then(addPupsToDom);
}

function init() {
  fetchPups();
}

init();
