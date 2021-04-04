let $personL = document.querySelector(".luke .person"),
  $homeworldL = document.querySelector(".luke .homeworld"),
  $starshipsL = document.querySelector(".luke .starships"),
  $filmsL = document.querySelector(".luke .films"),
  $vehiclesL = document.querySelector(".luke .vehicles"),
  $luke = document.querySelector('.luke'),
  $personD = document.querySelector(".dart .person"),
  $homeworldD = document.querySelector(".dart .homeworld"),
  $starshipsD = document.querySelector(".dart .starships"),
  $filmsD = document.querySelector(".dart .films"),
  $vehiclesD = document.querySelector(".dart .vehicles"),
  $dart = document.querySelector('.dart'),
  $personC = document.querySelector(".chew .person"),
  $homeworldC = document.querySelector(".chew .homeworld"),
  $starshipsC = document.querySelector(".chew .starships"),
  $filmsC = document.querySelector(".chew .films"),
  $vehiclesC = document.querySelector(".chew .vehicles"),
  $chewB = document.querySelector('.chew'),
  $btnL = document.querySelector("button.btn-luke"),
  $btnD = document.querySelector("button.btn-dart"),
  $btnC = document.querySelector("button.btn-chew");
function person(url) {
  return {
    url: url,
    response: "",
    person: "",
    homeworld: "",
    starships: "",
    vehicles: "",
    films: "",
  };
}
let lukeS = person("https://swapi.dev/api/people/1/");
let dartV = person("https://swapi.dev/api/people/4/");
let chew = person("https://swapi.dev/api/people/13/");

function loadData(obj, key) {
  if (obj[key] == undefined) return;
  let server = new XMLHttpRequest();
  let response;
  server.open("GET", obj[key], false);
  server.send();
  if (server.status != 200) {
    console.log(`SWAPI Error code ${server.status}. ${server.statusText}`);
  } else {
    response = JSON.parse(server.response);
    obj[key] = response;
  }
}

function x(obj) {
  loadData(obj, "url");
  obj.person = obj.url;
  obj.starships =
    typeof obj.url.starships === "object"
      ? obj.url.starships[0]
      : obj.url.starships;
  obj.homeworld =
    typeof obj.url.homeworld === "object"
      ? obj.url.homeworld[0]
      : obj.url.homeworld;
  obj.films =
    typeof obj.url.films === "object" ? obj.url.films[0] : obj.url.films;
  obj.vehicles =
    typeof obj.url.vehicles === "object"
      ? obj.url.vehicles[0]
      : obj.url.vehicles;
  loadData(obj, "starships");
  loadData(obj, "homeworld");
  loadData(obj, "films");
  loadData(obj, "vehicles");
}
x(lukeS);
x(dartV);
x(chew);
function personPrint(obj, place) {
  for (key in obj) {
    if (
      !Array.isArray(obj[key]) &&
      key != "episode_id" &&
      !obj[key].includes("http") &&
      !obj[key].includes("2014")
    ) {
      writeData(key.replace("_", " "), obj[key], place);
    }
  }
}

$btnL.addEventListener("click", () => {
  $dart.classList.remove('show')
  $chewB.classList.remove('show')
  $luke.classList.add('show')
  showTitle("Person", $personL);
  personPrint(lukeS.person, $personL);
  showTitle("Homeworld", $homeworldL);
  personPrint(lukeS.homeworld, $homeworldL);
  showTitle("Starships", $starshipsL);
  personPrint(lukeS.starships, $starshipsL);
  showTitle("Vehicles", $vehiclesL);
  personPrint(lukeS.vehicles, $vehiclesL);
  showTitle("Films", $filmsL);
  personPrint(lukeS.films, $filmsL);
});
$btnD.addEventListener("click", () => {
  $luke.classList.remove('show')
  $chewB.classList.remove('show')
  $dart.classList.add('show')
  showTitle("Person", $personD);
  personPrint(dartV.person, $personD);
  showTitle("Homeworld", $homeworldD);
  personPrint(dartV.homeworld, $homeworldD);
  showTitle("Starships", $starshipsD);
  personPrint(dartV.starships, $starshipsD);
  showTitle("Vehicles", $vehiclesD);
  personPrint(dartV.vehicles, $vehiclesD);
  showTitle("Films", $filmsD);
  personPrint(dartV.films, $filmsD);
});
$btnC.addEventListener("click", () => {
  $luke.classList.remove('show')
  $dart.classList.remove('show')
  $chewB.classList.add('show')
  showTitle("Person", $personC);
  personPrint(chew.person, $personC);
  showTitle("Homeworld", $homeworldC);
  personPrint(chew.homeworld, $homeworldC);
  showTitle("Starships", $starshipsC);
  personPrint(chew.starships, $starshipsC);
  showTitle("Vehicles", $vehiclesC);
  personPrint(chew.vehicles, $vehiclesC);
  showTitle("Films", $filmsC);
  personPrint(chew.films, $filmsC);
});
function writeData(key, value, place) {
  let html = `<b>${key}:</b> <i>${value}</i><br/>`;
  place.insertAdjacentHTML("beforeend", html);
}
function showTitle(key, place) {
  let html = `<h3>${key}</h3>`;
  place.innerHTML = html
}