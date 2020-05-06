package com;
import model.Payment; 
//For REST Service
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
//For JSON
import com.google.gson.*;
//For XML
import org.jsoup.*;
import org.jsoup.parser.*;
import org.jsoup.nodes.Document;

@Path("/Payment")
public class PaymentService {

	Payment paymentobj = new Payment();
	
	
	@GET
	@Path("/")
	@Produces(MediaType.TEXT_HTML)
	public String readItems()
	{
		return paymentobj.readItems();
	}

	
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.TEXT_PLAIN)
	public String insertPayment(@FormParam("paymentID") String paymentID,
			@FormParam("appointmentID") String appointmentID,
			@FormParam("cardNo") String cardNo,
			@FormParam("expireDate") String expireDate,
			@FormParam("cvv") String cvv,
			@FormParam("cardholderName") String cardholderName)
	{
		String output = paymentobj.insertPayment(paymentID,appointmentID,cardNo,expireDate,cvv,cardholderName);
		return output;
	}
	
	
	@PUT
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String updatePayment(String paymentID) {

		JsonObject paymentObject = new JsonParser().parse(paymentID).getAsJsonObject();

		
		
		String appointmentID = paymentObject.get("appointmentID").getAsString();
		String cardNo = paymentObject.get("cardNo").getAsString();
		String expireDate = paymentObject.get("expireDate").getAsString();
		String cvv = paymentObject.get("cvv").getAsString();
		String cardholderName = paymentObject.get("cardholderName").getAsString();
		
		String output = paymentobj.updatePayment(appointmentID, cardNo, cvv, expireDate, cvv, cardholderName);
		return output;

	}
	
	@DELETE
	@Path("/")
	@Consumes(MediaType.APPLICATION_XML)
	@Produces(MediaType.TEXT_PLAIN)
	public String deletePayment(String paymentID)
	{
	//Convert the input string to an XML document
	Document doc = Jsoup.parse(paymentID, "", Parser.xmlParser());

	//Read the value from the element <paymentID>
	 String paymentID1 = doc.select("paymentID").text();	
	 String output = paymentobj.deletePayment(paymentID1);
	 return output;
	}
	
	



}


	
