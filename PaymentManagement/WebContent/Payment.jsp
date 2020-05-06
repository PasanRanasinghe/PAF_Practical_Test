<%@page import="model.Payment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
    
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Payment Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css"> 
<script src="components/jquery-3.2.1.min.js"></script>
<script src="components/main.js"></script>
</head>
<body>
<div class="container"> 
		<div class="row">  
		
			<div class="col-8">       
				<h1 class="m-3"><b>Payment Management</b></h1>        
				
				<form id="formPayment" name="formPayment" method="post" action="Payment.jsp">
					  
					Payment ID:  
					<input id="paymentID" name="paymentID" type="text" class="form-control form-control-sm">  
					
					<br> 
					Appointment ID:  
					<input id="appointmentID" name="appointmentID" type="text" class="form-control form-control-sm">  
					
					<br>
					Card Number:  
					<input id="cardNo" name="cardNo" type="text" class="form-control form-control-sm">  
					 
					<br> 
					Expire Date:  
					<input id="expireDate" name="expireDate" type="text" class="form-control form-control-sm">  
					 
					<br> 
					cvv:  
					<input id="cvv" name="cvv" type="text" class="form-control form-control-sm">  
					 
					<br> 
					Card Holder Name:  
					<input id="" name="cardholderName" type="text" class="form-control form-control-sm"> 
					 
					 
					<br>  
					<input id="btnSave" name="btnSave" type="button" value="Confirm" class="btn btn-primary">  
					<input type="hidden" id="hidPayIDSave" name="hidPayIDSave" value=""> 
					 
				</form> 
				
				 
				<div id="alertSuccess" class="alert alert-success"></div>  
				<div id="alertError" class="alert alert-danger"></div>
				
				
				<br>  
				<div id="divItemsGrid">   
					<%    
						Payment paymentobj = new Payment();
						out.print(paymentobj.readItems());   
					%>  
					
				</div> 
				  
 			</div>
 		 
 		</div>    
 		
 
	</div> 

</body>

</html>