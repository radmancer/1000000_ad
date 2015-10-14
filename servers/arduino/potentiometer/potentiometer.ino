/*
  Web Server
 
 A simple web server that shows the value of the analog input pins.
 using an Arduino Wiznet Ethernet shield. 
 
 Circuit:
 * Ethernet shield attached to pins 10, 11, 12, 13
 * Analog inputs attached to pins A0 through A5 (optional)
 
 created 18 Dec 2009
 by David A. Mellis
 modified 9 Apr 2012
 by Tom Igoe
 
 */

const int analogInPin0 = A0;
int sensorValue0 = 0;
const int analogInPin1 = A1;
int sensorValue1 = 0;
const int analogInPin2 = A2;
int sensorValue2 = 0;

int potResistanceRange = 1024;
int potResistanceMiddle = (potResistanceRange/2) - 1; //minus one because the actual values are between 0 and 1023.
int potResistanceFloor = potResistanceMiddle - 15; //Establishes the lower bound of the deadzone.
int potResistanceCeiling = potResistanceMiddle + 15; //Establishes the upper bound of the deadzone.

#include <SPI.h>
#include <Ethernet.h>

// Enter a MAC address and IP address for your controller below.
// The IP address will be dependent on your local network:
byte mac[] = { 
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192,168,1,177);

// Initialize the Ethernet server library
// with the IP address and port you want to use 
// (port 80 is default for HTTP):
EthernetServer server(80);

boolean isInDeadZone(int knobValue){
  if(knobValue >= potResistanceFloor && knobValue <= potResistanceCeiling){
    return true;
  }
  return false;
}

void setup() {
 // Open serial communications and wait for port to open:
  Serial.begin(9600);
   while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }


  // start the Ethernet connection and the server:
  Ethernet.begin(mac, ip);
  server.begin();
  Serial.print("server is at ");
  Serial.println(Ethernet.localIP());
}


void loop() {
  // listen for incoming clients
  EthernetClient client = server.available();
  if (client) {
    Serial.println("new client");
    // an http request ends with a blank line
    boolean currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.write(c);
        // if you've gotten to the end of the line (received a newline
        // character) and the line is blank, the http request has ended,
        // so you can send a reply
        if (c == '\n' && currentLineIsBlank) {
          // send a standard http response header
          client.println("HTTP/1.1 200 OK");
          client.println("Access-Control-Allow-Origin: *");   
          client.println("Access-Control-Allow-Methods: GET");
          client.println("Content-Type: text/html");
          client.println("Connection: close");  // the connection will be closed after completion of the response
	  client.println("Refresh: 5");  // refresh the page automatically every 5 sec
          client.println();
 /*
          client.println("<!DOCTYPE HTML>");
          client.println("<html>");
          // output the value of each analog input pin
          for (int analogChannel = 0; analogChannel < 6; analogChannel++) {
            int sensorReading = analogRead(analogChannel);
            client.print("analog input ");
            client.print(analogChannel);
            client.print(" is ");
            client.print(sensorReading);
            client.println("<br />");       
          }
*/
  sensorValue0 = analogRead(analogInPin0);
  sensorValue1 = analogRead(analogInPin1);
  sensorValue2 = analogRead(analogInPin2);

  String json = "";
  if(isInDeadZone(sensorValue1) && isInDeadZone(sensorValue2)){ //X axis is on
    json += "{'translation':{'voxel':'cursor','direction':'right'}}";
    client.println(json);
    delay(1000);
    break;
  }
  else if(isInDeadZone(sensorValue0) && isInDeadZone(sensorValue2)){ //Y axis is on
    json += "{'translation':{'voxel':'cursor','direction':'out'}}";
    client.println(json);
    delay(1000);
    break;
  }
  else if(isInDeadZone(sensorValue0) && isInDeadZone(sensorValue1)){ //Z axis is on
    json += "{'translation':{'voxel':'cursor','direction':'down'}}";
    client.println(json);
    delay(1000);
    break;
  }
  //json += "]}";
  //client.println(json);
/*
          client.println("{'objects':[{'events':[{'translation':{'voxel':'cursor','direction':'right'}}]}]}");
          //client.println("</html>");
          break;
*/
  //break;
        }
        if (c == '\n') {
          // you're starting a new line
          currentLineIsBlank = true;
        } 
        else if (c != '\r') {
          // you've gotten a character on the current line
          currentLineIsBlank = false;
        }
      }
    }
    // give the web browser time to receive the data
    delay(1);
    // close the connection:
    client.stop();
    Serial.println("client disconnected");
  }
}

