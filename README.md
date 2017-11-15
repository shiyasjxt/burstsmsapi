# burstsmsapi

Technical Details:

1. Download the folder in to your machine
2. Go to the file path ../../BurstSMS
3. run the command - npm installer
4. Open server.js file
5. Update the credentials for Bitly & Burst SMS for below line of codes
	
  <<Bitly>>
  client_id: "<username>", //provide bitly user name here
  Bitly.setAccessToken('<accesstoken>'); //provide bitly access token
  
  <<BurstSMS>>
  var apiKey = "<burstsmsapikey>"; // provide BurstSMS api key
  var login = "<username>";  //burstsms username

6. run the command : node server
7. The application runs in port 1185 - localhost:1185
8. Enter the phone number & message 
9. Click submit button
10 Message is send across to the given number

Example:
Number: 61432827735
Message: This is a message to test http://www.cmshiyas.com 

Pending Items:
1. Use of wait to avoid asynchronous call/ callback feature for shortening url and make the process sequence

Note: As a best practice, the workflow need to be implemented with wait feature comes with latest node version. Couldn't implement it at this point of time.
