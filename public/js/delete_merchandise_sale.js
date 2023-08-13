// Citation for deleting the data functions:
// Date: 8/11/23
// Adapted from from OSU CS 340 nodejs-starter-app Step 6, attribute names and IDs are our own work
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteMerchandiseSale(merchandiseSaleID) {
  // Put our data we want to send in a javascript object
  let data = {
      merchSaleID: merchandiseSaleID
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-merchandise-sale-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 204) {

          // Add the new data to the table
          deleteRow(merchandiseSaleID);

      }
      else if (xhttp.readyState == 4 && xhttp.status != 204) {
          console.log("There was an error with the input.")
      }
  }
  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
}


function deleteRow(merchandiseSaleID){

  let table = document.getElementById("merch-sales-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
     //iterate through rows
     //rows would be accessed using the "row" variable assigned in the for loop
     if (table.rows[i].getAttribute("data-value") == merchandiseSaleID) {
          table.deleteRow(i);
          break;
     }
  }
}
