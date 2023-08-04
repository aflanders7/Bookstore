
// Get the objects we need to modify
let updateMerchForm = document.getElementById('update-merch-form-ajax');

// Modify the objects we need
updateMerchForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMerchID = document.getElementById("mySelect");
    let inputMerchName = document.getElementById("input-merchName-update");
    let inputMerchPrice = document.getElementById("input-merchPrice-update");
    let inputMerchQuantity = document.getElementById("input-merchQuantity-update");

    // Get the values from the form fields
    let merchIDValue = inputMerchID.value;
    let merchNameValue = inputMerchName.value;
    let merchPriceValue = inputMerchPrice.value;
    let merchQuantityValue = inputMerchQuantity.value;
    

    // if (isNaN(merchNameValue)) 
    // {
    //     return;
    // }


    // Put our data we want to send in a javascript object
    let data = {
        merchID: merchIDValue,
        merchName: merchNameValue,
        merchPrice: merchPriceValue,
        merchQuantity: merchQuantityValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-merch-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, merchID);

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

        let updateRowIndex = table.getElementsByTagName("tr")[i];

        // Get td of homeworld value
        let merchNameTD = updateRowIndex.getElementsByTagName("td")[1];
        let merchPriceTD = updateRowIndex.getElementsByTagName("td")[2];
        let merchQuantityTD = updateRowIndex.getElementsByTagName("td")[3];

        // Reassign homeworld to our value we updated to
        merchNameTD.innerHTML = parsedData[0].merchName;
        merchPriceTD.innerHTML = parsedData[0].merchPrice;
        merchQuantityTD.innerHTML = parsedData[0].merchQuantity;
       }
    }
}
