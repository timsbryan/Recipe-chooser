const ID = "1WWiB5T7p9U-0_CSBghXRCDdpap5Rk-T6C2ZMv9W2tDM";
const GID = "0";
const URL =
  "https://docs.google.com/spreadsheets/d/" +
  ID +
  "/gviz/tq?tqx=out:json&tq=&gid=0" +
  GID;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
};

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

window.data = "";

let app = function () { };

let myItems = function (jsonString) {
  let json = JSON.parse(jsonString);
  let table = "<table><tr><th>Title</th><th>Ingredients</th></tr>";

  json.table.rows.forEach((row) => {
    table += "<tr>";
    row.c.forEach((cell) => {
      try {
        let value = cell.f ? cell.f : cell.v;
        table += "<td>" + value + "</td>";
      } catch (e) {
        table += "<td>" + "" + "</td>";
      }
    });
    table += "</tr>";
  });
  table += "</table>";

  return table;
};

fetch(URL)
  .then((response) => response.text())
  .then((data) => {
    console.log(
      JSON.parse(JSON.stringify(data.substring(47).slice(0, -2), null, 2))
    );
    window.data = data;
    document.getElementById("json").innerHTML = myItems(
      data.substring(47).slice(0, -2)
    );
  });
