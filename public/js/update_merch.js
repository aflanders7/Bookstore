
// Get the objects we need to modify
let updateMerchForm = document.getElementById('update-merch-form-ajax');

// Modify the objects we need
updateMerchForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputmerchName = document.getElementById("mySelect");
    let inputMerchPrice = document.getElementById("input-merchPrice-update");

    // Get the values from the form fields
    let merchNameValue = inputmerchName.value;
    let merchPriceValue = inputmerchPrice.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(merchNameValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        merchName: merchNameValue,
        homeworld: merchPriceValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-merch-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, merchNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, merchID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("merch-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == merchID) {

            // Get the location of the row where we found the matching merch ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].merchName; 
       }
    }
}
