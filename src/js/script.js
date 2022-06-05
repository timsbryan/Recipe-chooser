const ID = '1WWiB5T7p9U-0_CSBghXRCDdpap5Rk-T6C2ZMv9W2tDM';
const GID = '0';
const URL = 'https://docs.google.com/spreadsheets/d/' + ID + '/gviz/tq?tqx=out:json&tq&gid=' + GID;

fetch(URL)
  .then(response => response.text())
  .then(data => document.getElementById("json").innerHTML = myItems(data.substring(47).slice(0, -2))
  );

function myItems(jsonString) {
  var json = JSON.parse(jsonString);
  var table = '<table><tr>'
  json.table.cols.forEach(column => table += '<th>' + column.label + '</th>')
  table += '</tr>'
  json.table.rows.forEach(row => {
    table += '<tr>'
    row.c.forEach(cell => {
      try { var value = cell.f ? cell.f : cell.v }
      catch (e) { var value = '' }
      table += '<td>' + value + '</td>'
    });
    table += '</tr>'
  });
  table += '</table>'
  return table
}