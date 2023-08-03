function deleteMerchandise(merchID) {
    let link = '/delete-merchandise-ajax/';
    let data = {
      merchID: personID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(personID);
      }
    });
  }
  
  function deleteRow(personID){
      let table = document.getElementById("merch-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == personID) {
              table.deleteRow(i);
              break;
         }
      }
  }