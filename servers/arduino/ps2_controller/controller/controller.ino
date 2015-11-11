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

boolean joypadRight = false;
boolean joypadUp = false;
boolean joypadLeft = false;
boolean joypadDown = false;
boolean l2Button = false;
boolean r2Button = false;
boolean dPadRight = false;
boolean dPadUp = false;
boolean dPadLeft = false;
boolean dPadDown = false;
boolean xButton = false;
boolean startButton = false;
boolean selectButton = false;
boolean triangleButton = false;
boolean squareButton = false;
boolean circleButton = false;
boolean l1Button = false;
boolean r1Button = false;

void loop() {
  EthernetClient client = server.available();
  if(error == 1) //skip loop if no controller found
    return;
  ps2x.read_gamepad();
    if(!((ps2x.Analog(PSS_LY) > 96 && ps2x.Analog(PSS_LY) < 160) && (ps2x.Analog(PSS_LX) > 96 && ps2x.Analog(PSS_LX) < 160))){
        if(ps2x.Analog(PSS_LX) > 160){
            joypadRight = true;
        }
        if(ps2x.Analog(PSS_LY) < 96){
            joypadUp = true;
        }
        if(ps2x.Analog(PSS_LX) < 96){
            joypadLeft = true;
        }
        if(ps2x.Analog(PSS_LY) > 160){
            joypadDown = true;
        }
    }
    if(ps2x.Button(PSB_L2)){
       l2Button = true;
    }
    if(ps2x.Button(PSB_R2)){
       r2Button = true;
    }
    if(ps2x.Button(PSB_PAD_RIGHT)){
        dPadRight = true;
    }
    if(ps2x.Button(PSB_PAD_UP)){
        dPadUp = true;
    }
    if(ps2x.Button(PSB_PAD_LEFT)){
        dPadLeft = true;
    }
    if(ps2x.Button(PSB_PAD_DOWN)){
        dPadDown = true;
    }
    if(ps2x.Button(PSB_BLUE)){
        xButton = true;
    }
    if(ps2x.Button(PSB_START)){
        startButton = true;
    }
    if(ps2x.Button(PSB_SELECT)){
        selectButton = true;
    }
    if(ps2x.Button(PSB_GREEN)){
        triangleButton = true;
    }
    if(ps2x.Button(PSB_PINK)){
        squareButton = true;
    }
    if(ps2x.Button(PSB_RED)){
        circleButton = true;
    }
    if(ps2x.Button(PSB_L1)){
        l1Button = true;
    }
    if(ps2x.Button(PSB_R1)){
        r1Button = true;
    }
/*    
    if(!((ps2x.Analog(PSS_RY) > 96 && ps2x.Analog(PSS_RY) < 160) && (ps2x.Analog(PSS_RX) > 96 && ps2x.Analog(PSS_RX) < 160))){
        Serial.print("Right Stick Values:");
        Serial.print(ps2x.Analog(PSS_RY), DEC); //Left stick, Y axis. Other options: LX, RY, RX  
        Serial.print(",");
        Serial.println(ps2x.Analog(PSS_RX), DEC);
        joypadDown = true;
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
          client.println("Content-Type: application/json");
          client.println("Connection: close");  // the connection will be closed after completion of the response
          //client.println("Refresh: 1");  // refresh the page automatically every 5 sec
          client.println();
          String json = "";
          Serial.println("client made contact");
          if(joypadRight == true){
              client.println("{\"voxel\":\"right\"}");
          }
          else if(joypadUp == true){
              client.println("{\"voxel\":\"up\"}");
          }
          else if(joypadLeft == true){
              client.println("{\"voxel\":\"left\"}");
          }
          else if(joypadDown == true){
              client.println("{\"voxel\":\"down\"}");
          }
          else if(l2Button == true){
              client.println("{\"voxel\":\"in\"}");
              delay(100);
          }
          else if(r2Button == true){
              client.println("{\"voxel\":\"out\"}");
              delay(100);
          }
          else if(dPadRight == true){
              client.println("{\"stage\":\"yawCCW\"}");
          }
          else if(dPadUp == true){
              client.println("{\"stage\":\"pitchCCW\"}");
          }
          else if(dPadLeft == true){
              client.println("{\"stage\":\"yawCW\"}");
          }
          else if(dPadDown == true){
              client.println("{\"stage\":\"pitchCW\"}");
          }
          else if(xButton == true){
              client.println("{\"vertex\":\"add\"}");
              delay(100);
          }
          else if(startButton == true){
              client.println("{\"stage\":\"center\"}");
          }
          else if(selectButton == true){
              client.println("{\"stage\":\"reset\"}");
          }
          else if(triangleButton == true){
              client.println("{\"vertex\":\"delete\"}");
              delay(500);
          }
          else if(squareButton == true){
              client.println("{\"stage\":\"import\"}");
              delay(500);
          }
          else if(circleButton == true){
              client.println("{\"stage\":\"export\"}");
          }
          else if(l1Button == true){
              client.println("{\"vertex\":\"back\"}");
          }
          else if(r1Button == true){
              client.println("{\"vertex\":\"forward\"}");
          }
          joypadRight = false;
          joypadUp = false;
          joypadLeft = false;
          joypadDown = false;
          l2Button = false;
          r2Button = false;
          dPadRight = false;
          dPadUp = false;
          dPadLeft = false;
          dPadDown = false;
          xButton = false;
          startButton = false;
          selectButton = false;
          triangleButton = false;
          squareButton = false;
          circleButton = false;
          l1Button = false;
          r1Button = false;
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
