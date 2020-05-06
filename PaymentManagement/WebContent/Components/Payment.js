$(document).ready(function() 
{  
	if ($("#alertSuccess").text().trim() == "")  
	{   
		$("#alertSuccess").hide();  
	} 
	$("#alertError").hide(); 
}); 

//SAVE ============================================ 
$(document).on("click", "#btnSave", function(event) 
{  
	// Clear alerts---------------------  
	$("#alertSuccess").text("");  
	$("#alertSuccess").hide();  
	$("#alertError").text("");  
	$("#alertError").hide(); 

	// Form validation-------------------  
	var status = validatePayment();  
	if (status != true)  
	{   
		$("#alertError").text(status);   
		$("#alertError").show();   
		return;  
	} 

	// If valid------------------------
	var type =($("#hidPayIDSave").val() == "") ? "POST" : "PUT";
	 
	$.ajax(
	{
		url : "PaymentAPI",
		type : type,
		data : $("#formPayment").serialize(),
		dataType : "text",
		complete : function(response, status)
		{
			onPaymentSaveComplete(response.responseText, status);
		}
	});

});

function onPaymentSaveComplete(response, status)
{
	if(status == "success")
	{
		var resultSet = JSON.parse(response);
			
		if(resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully Saved.");
			$("#alertSuccess").show();
					
			$("#divItemsGrid").html(resultSet.data);
	
		}else if(resultSet.status.trim() == "error"){
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
		
	}else if(status == "error"){
		
		$("#alertError").text("Error While Saving.");
		$("#alertError").show();
		
	}else{
		
		$("#alertError").text("Unknown Error While Saving.");
		$("#alertError").show();
	}
	
	$("#hidItemIDSave").val("");
	$("#formPayment")[0].reset();

}

//UPDATE========================================== 
$(document).on("click", ".btnUpdate", function(event) 
{     
	$("#hidPayIDSave").val($(this).closest("tr").find('#hidPayIDSave').val());     
	$("#paymentID").val($(this).closest("tr").find('td:eq(0)').text());    
	$("#appointmentID").val($(this).closest("tr").find('td:eq(1)').text());     
	$("#cardNo").val($(this).closest("tr").find('td:eq(2)').text());     
	$("#expireDate").val($(this).closest("tr").find('td:eq(3)').text()); 
	$("#cvv").val($(this).closest("tr").find('td:eq(4)').text()); 
	$("#cardholderName").val($(this).closest("tr").find('td:eq(5)').text()); 
	

});
 

//Remove Operation
$(document).on("click", ".btnRemove", function(event){
	$.ajax(
	{
		url : "PaymentAPI",
		type : "DELETE",
		data : "paymentID=" + $(this).data("paymentID"),
		dataType : "text",
		complete : function(response, status)
		{
			onPaymentDeletedComplete(response.responseText, status);
		}
	});
});

function onPaymentDeletedComplete(response, status)
{
	if(status == "success")
	{
		var resultSet = JSON.parse(response);
			
		if(resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully Deleted.");
			$("#alertSuccess").show();
					
			$("#divItemsGrid").html(resultSet.data);
	
		}else if(resultSet.status.trim() == "error"){
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	}else if(status == "error"){
		$("#alertError").text("Error While Deleting.");
		$("#alertError").show();
	}else{
		$("#alertError").text("Unknown Error While Deleting.");
		$("#alertError").show();
	}
}




//CLIENTMODEL
function validatePaymentform() {  
	// Payment ID  
	if ($("#paymentID").val().trim() == "")  {   
		return "Insert Payment ID";  
		
	} 
	
	 // Appointment ID  
	if ($("#appointmentID").val().trim() == "")  {   
		return "Insert Appointment ID";  
		
	}
	
	// Card Number  
	if ($("#cardNo").val().trim() == "")  {   
		return "Insert Card Number";  
		
	}
	 
	 // Card Number validation  
	var tmpCard = $("#cardNo").val().trim();  
	if (!$.isNumeric(tmpCard))  {   
		return "Insert a valid Card Number";  
		
	}
	
	// Expire Date  
	if ($("#expireDate").val().trim() == "")  {   
		return "Insert Expire date";  
		
	}
	 
	 // Expire date validation  
	var tmpDate = $("#expireDate").val().trim();  
	if (!$.isNumeric(tmpDate))  {   
		return "Insert a valid Date";  
		
	}
	
	// cvv  
	if ($("#cvv").val().trim() == "")  {   
		return "Insert CVV";  
		
	}
	 
	 // cvv validation  
	var tmpCVV = $("#cvv").val().trim();  
	if (!$.isNumeric(tmpCVV))  {   
		return "Insert a valid CVV";  
		
	}
	 
	 // Card holder 
	if ($("#cardholderName").val().trim() == "")  {   
		return "Insert Cardholder Name";  
		
	}
	 
	return true; 
	 
}