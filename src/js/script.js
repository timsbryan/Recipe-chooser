const ID = "1WWiB5T7p9U-0_CSBghXRCDdpap5Rk-T6C2ZMv9W2tDM";
const GID = "0";
const URL =
  "https://docs.google.com/spreadsheets/d/" +
  ID +
  "/gviz/tq?tqx=out:json&tq=&headers=1&gid=0" +
  GID;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const myItems = function (jsonString) {
  let json = JSON.parse(jsonString);
  let table = "<div class='recipes'>";

  let recipes = "<div class='recipes'>";
  let arr = [];

  json.table.rows.forEach((row) => {
    let jsonData = {};

    json.table.cols.forEach((col, i) => {
      jsonData[col.label.toLowerCase().trim()] = row.c[i].v;
    });
    arr.push(jsonData);
  });

  arr.forEach((recipe) => {
    recipes += `<span class='recipes__recipe'>`;
    recipes += `<span class='recipes__recipe__name'>${recipe.title}</span>`;
    recipes += `<span class='recipes__recipe__ingredients'>${recipe.ingredients}</span>`;
    recipes += `<button class='recipes__recipe__change'>Change me</button>`;
    recipes += `</span>`;
  });

  json.table.rows.forEach((row, i) => {
    table += "<div class='recipes__recipe'>";
    row.c.forEach((cell) => {
      try {
        let value = cell.f ? cell.f : cell.v;
        table += "<span class='recipes__recipe__name'>" + value + "</span>";
      } catch (e) {
        table += "<span class='recipes__recipe__name'>" + "" + "</span>";
      }
    });
    table += "</div>";
  });
  table += "</div>";

  return recipes;
};

const populate = function () {
  console.log("Populating...");
};

const setup = function () {
  const randomButton = document.createElement("button");
  const randomButtonText = document.createTextNode("Choose recipes");
  const jsonEl = document.querySelector("#json");

  randomButton.appendChild(randomButtonText);

  days.map((day) => {
    document.querySelector("main").insertBefore(document.createElement('div').classList.add('day', day.toLowerCase()), jsonEl);
  });

  document.querySelector("main").insertBefore(randomButton, jsonEl);

  document.addEventListener("click", () => {
    populate();
  });

  fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      console.log(
        JSON.parse(JSON.stringify(data.substring(47).slice(0, -2), null, 2))
      );

      document.getElementById("json").innerHTML = myItems(
        data.substring(47).slice(0, -2)
      );
    });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setup);
} else {
  setup();
}
