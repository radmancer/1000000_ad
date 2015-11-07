#include <SPI.h>
#include <Ethernet.h>
#include <PS2X_lib.h>  //for v1.6
PS2X ps2x; // create PS2 Controller Class

byte mac[] = { 
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress ip(192,168,1,177);
EthernetServer server(80);

int error = 0; 
byte type = 0;
byte vibrate = 0;

void setup() {
  Serial.begin(57600);
    error = ps2x.config_gamepad(7,5,3,6, false, false);   //setup pins and settings:  GamePad(clock, command, attention, data, Pressures?, Rumble?) check for error

    if(error == 0){
        Serial.println("Found Controller, configured successful");
        Serial.println("Try out all the buttons, X will vibrate the controller, faster as you press harder;");
        Serial.println("holding L1 or R1 will print out the analog stick values.");
        Serial.println("Go to www.billporter.info for updates and to report bugs.");
    }

    else if(error == 1)
        Serial.println("No controller found, check wiring, see readme.txt to enable debug. visit www.billporter.info for troubleshooting tips");

    else if(error == 2)
        Serial.println("Controller found but not accepting commands. see readme.txt to enable debug. Visit www.billporter.info for troubleshooting tips");

    else if(error == 3)
        Serial.println("Controller refusing to enter Pressures mode, may not support it. ");

    type = ps2x.readType();
    switch(type) {
        case 0:
            Serial.println("Unknown Controller type");
            break;
        case 1:
            Serial.println("DualShock Controller Found");
            break;
    }
  Ethernet.begin(mac, ip);
  server.begin();
}

boolean right = false;
boolean up = false;
boolean left = false;
boolean down = false;
boolean in = false;
boolean out = false;
boolean dPadRight = false;
boolean dPadUp = false;
boolean dPadLeft = false;
boolean dPadDown = false;
boolean xButton = false;

void loop() {
  EthernetClient client = server.available();
  if(error == 1) //skip loop if no controller found
    return;
  ps2x.read_gamepad();
    if(!((ps2x.Analog(PSS_LY) > 96 && ps2x.Analog(PSS_LY) < 160) && (ps2x.Analog(PSS_LX) > 96 && ps2x.Analog(PSS_LX) < 160))){
        if(ps2x.Analog(PSS_LX) > 160){
            right = true;
        }
        else if(ps2x.Analog(PSS_LY) < 96){
            up = true;
        }
        else if(ps2x.Analog(PSS_LX) < 96){
            left = true;
        }
        else if(ps2x.Analog(PSS_LY) > 160){
            down = true;
        }
    }
    else if(ps2x.Button(PSB_L2)){
       in = true;
    }
    else if(ps2x.Button(PSB_R2)){
       out = true;
    }
    else if(ps2x.Button(PSB_PAD_RIGHT)){
        dPadRight = true;
    }
    else if(ps2x.Button(PSB_PAD_UP)){
        dPadUp = true;
    }
    else if(ps2x.Button(PSB_PAD_LEFT)){
        dPadLeft = true;
    }
    else if(ps2x.Button(PSB_PAD_DOWN)){
        dPadDown = true;
    }
    else if(ps2x.Button(PSB_BLUE)){
        xButton = true;
    }
/*    
    if(!((ps2x.Analog(PSS_RY) > 96 && ps2x.Analog(PSS_RY) < 160) && (ps2x.Analog(PSS_RX) > 96 && ps2x.Analog(PSS_RX) < 160))){
        Serial.print("Right Stick Values:");
        Serial.print(ps2x.Analog(PSS_RY), DEC); //Left stick, Y axis. Other options: LX, RY, RX  
        Serial.print(",");
        Serial.println(ps2x.Analog(PSS_RX), DEC);
        down = true;
    }
*/
  if (client) {
    boolean currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        if (c == '\n' && currentLineIsBlank) {
          client.println("HTTP/1.1 200 OK");
          client.println("Access-Control-Allow-Origin: *");   
          client.println("Access-Control-Allow-Methods: GET");
          client.println("Content-Type: text/html");
          client.println("Connection: close");  // the connection will be closed after completion of the response
          //client.println("Refresh: 1");  // refresh the page automatically every 5 sec
          client.println();
          String json = "";
          Serial.println("client made contact");
          if(right == true){
              client.println("right");
          }
          else if(up == true){
              client.println("up");
          }
          else if(left == true){
              client.println("left");
          }
          else if(down == true){
              client.println("down");
          }
          else if(in == true){
              client.println("in");
              delay(500);
          }
          else if(out == true){
              client.println("out");
              delay(500);
          }
          else if(dPadRight == true){
              client.println("dpad_right");
          }
          else if(dPadUp == true){
              client.println("dpad_up");
          }
          else if(dPadLeft == true){
              client.println("dpad_left");
          }
          else if(dPadDown == true){
              client.println("dpad_down");
          }
          else if(xButton == true){
              client.println("x");
          }
          right = false;
          up = false;
          left = false;
          down = false;
          in = false;
          out = false;
          dPadRight = false;
          dPadUp = false;
          dPadLeft = false;
          dPadDown = false;
          xButton = false;
          break;
        }
        if (c == '\n') {
          currentLineIsBlank = true;
        } 
        else if (c != '\r') {
          currentLineIsBlank = false;
        }
      }
    }
    delay(1);
    client.stop();
  }
}

