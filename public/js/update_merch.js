
// Get the objects we need to modify
let updateMerchForm = document.getElementById('update-merch-form-ajax');

// Modify the objects we need
updateMerchForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMerchID = document.getElementById("input-merchID");
    let inputMerchName = document.getElementById("input-merchName");
    let inputMerchPrice = document.getElementById("input-merchPrice");
    let inputMerchQuantity = document.getElementById("input-merchQuantity");

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
            updateRow(xhttp.response, merchNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("merch-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == merchID) {

        table.rows[i].cells[1].innerText = data.merchName;
        table.rows[i].cells[2].innerText = data.merchPrice;
        table.rows[i].cells[3].innerText = data.merchQuantity;
        break;
       }
    }
}
