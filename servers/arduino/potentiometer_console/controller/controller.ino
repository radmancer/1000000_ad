#include <SPI.h>
#include <Ethernet.h>

const int analogInPin0 = A0; //left
int sensorValue0 = 0;
const int analogInPin1 = A1; //right
int sensorValue1 = 0;
const int analogInPin2 = A2; //middle
int sensorValue2 = 0;

int potResistanceRange = 1024;
int potResistanceMiddle = (potResistanceRange/2) - 1; //minus one because the actual values are between 0 and 1023.
int potResistanceFloor = potResistanceMiddle - 15; //Establishes the lower bound of the deadzone.
int potResistanceCeiling = potResistanceMiddle + 15; //Establishes the upper bound of the deadzone.

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

  // start the Ethernet connection and the server:
  Ethernet.begin(mac, ip);
  server.begin();
}


void loop() {
    // listen for incoming clients
    EthernetClient client = server.available();
    if (client) {
        //Serial.println("new client");
        // an http request ends with a blank line
        boolean currentLineIsBlank = true;
        while (client.connected()) {
            if (client.available()) {
                char c = client.read();
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
                    sensorValue0 = analogRead(analogInPin0);
                    sensorValue1 = analogRead(analogInPin1);
                    sensorValue2 = analogRead(analogInPin2);
                    Serial.print("left knob: ");
                    Serial.print(sensorValue0);
                    Serial.print(", middle knob: ");
                    Serial.print(sensorValue2);
                    Serial.print(", right knob: ");
                    Serial.println(sensorValue1);
                    String json = "";
/*
                    if(sensorValue0 < 496){ //X axis is on
                        json += "{'translation':{'voxel':'cursor','direction':'right'}}";
                        client.println(json);
                        delay(1000);
                    }
                    else if(sensorValue0 > 526){
                        json += "{'translation':{'voxel':'cursor','direction':'left'}}";
                        client.println(json);
                        delay(1000);
                    }
*/
/*
                    if(sensorValue1 < 496){ //X axis is on
                        json += "{'translation':{'voxel':'cursor','direction':'down'}}";
                        client.println(json);
                        delay(1000);
                    }
                    else if(sensorValue1 > 526){
                        json += "{'translation':{'voxel':'cursor','direction':'up'}}";
                        client.println(json);
                        delay(1000);
                    }
*/
                    if(sensorValue2 < 496){ //X axis is on
                        json += "{'translation':{'voxel':'cursor','direction':'out'}}";
                        client.println(json);
                        delay(1000);
                    }
                    else if(sensorValue2 > 526){
                        json += "{'translation':{'voxel':'cursor','direction':'in'}}";
                        client.println(json);
                        delay(1000);
                    }
                    break;
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
        client.stop();
    }
}
