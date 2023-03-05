const defaultSort = "asc";

function sortTable(argEl, argTbl, argCol = 0, argSortBy = null) {
  // get sort dir, set to ASC by default, swap otherwise.
  let sortDir = '';
  if (argEl.dataset.sort) {
    sortDir = (argEl.dataset.sort === 'asc') ? 'dsc' : 'asc';
  } else {
    sortDir = defaultSort;
  }
  argEl.dataset.sort = sortDir;

  // sort rows (courtesy of w3schools.org)
  let rows, switching, i, x, y, shouldSwitch;
  const table = document.getElementById(argTbl);
  switching = true;
  /* Make a loop that will continue until no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare, one from current row and one from the next: */
      let x = argSortBy ? rows[i].getElementsByTagName("TD")[argCol].dataset[argSortBy] : rows[i].getElementsByTagName("TD")[argCol].innerHTML.toLowerCase();
      let y = argSortBy ? rows[i + 1].getElementsByTagName("TD")[argCol].dataset[argSortBy] : rows[i + 1].getElementsByTagName("TD")[argCol].innerHTML.toLowerCase();
      // Check if the two rows should switch place:
      if (sortDir === "asc") {
        if (x > y) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else {
        if (x < y) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

const headers = document.getElementsByTagName('th');
for(let key in headers) {
  if (typeof headers[key] === 'object' && headers[key].dataset.sortable === "1") {
    let sortBy = (headers[key].dataset.sortBy) ? headers[key].dataset.sortBy : null;
    let parentTableId = headers[key].closest('table').getAttribute('id');
    document.getElementById(parentTableId).classList.add('sortable_table');
    headers[key].innerHTML = "<span>" + headers[key].innerHTML + "</span>";
    headers[key].onclick = () => {sortTable(headers[key], parentTableId, key, sortBy);}
  }
}
