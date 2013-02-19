#include <LiquidCrystal.h>
#include <XBee.h>
#define TYPE 2
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
const int buttonPin = 7;     // the number of the pushbutton pin
const int ledPin =  13;      // the number of the LED pin
XBee xbee = XBee();
//packet payload
uint8_t payload[11] = {};
uint8_t payloadPointer = 0;
long previousMillis = 0;
long interval = 5000;
XBeeAddress64 addr64 = XBeeAddress64(0x0013a200, 0x408a7c99);
ZBTxRequest zbTx = ZBTxRequest(addr64, payload, sizeof(payload));
ZBTxStatusResponse txStatus = ZBTxStatusResponse();
ZBRxResponse rx = ZBRxResponse();
ModemStatusResponse msr = ModemStatusResponse();



// Variables will change:
int ledState = HIGH;         // the current state of the output pin
int buttonState;             // the current reading from the input pin
int lastButtonState = LOW;   // the previous reading from the input pin

// the following variables are long's because the time, measured in miliseconds,
// will quickly become a bigger number than can be stored in an int.
long lastDebounceTime = 0;  // the last time the output pin was toggled
long debounceDelay = 200;    // the debounce time; increase if the output flickers

void setup() {
  lcd.begin(16, 2);
  lcd.print("No Messages13!");
  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
  xbee.setSerial(Serial);
  flashLed(ledPin, 5, 100);
}

void loop() {
  checkButton();
  readIncoming();
}

void readIncoming(){
  xbee.readPacket(500);

  if (xbee.getResponse().isAvailable()) {        
    if (xbee.getResponse().getApiId() == ZB_TX_STATUS_RESPONSE) {
      xbee.getResponse().getZBTxStatusResponse(txStatus);
      if (txStatus.getDeliveryStatus() == SUCCESS) {
        // success.  time to celebrate
      //  flashLed(statusLed, 5, 50);
      } else {
        // the remote XBee did not receive our packet. is it powered on?
    //    flashLed(errorLed, 3, 500);
      }
    } else if (xbee.getResponse().getApiId() == ZB_RX_RESPONSE) {
        // got a zb rx packet
        
        // now fill our zb rx class
        xbee.getResponse().getZBRxResponse(rx);
            
        if (rx.getOption() == ZB_PACKET_ACKNOWLEDGED) {
            // the sender got an ACK
         //   flashLed(statusLed, 10, 10);
        } else {
            // we got it (obviously) but sender didn't get an ACK
        //    flashLed(errorLed, 2, 20);
        }
       // flashLed(ledPin, 5, 100);
        // set dataLed PWM to value of the first byte in the data
      //  analogWrite(dataLed, rx.getData(0));
        processPacket(rx);
      } else if (xbee.getResponse().getApiId() == MODEM_STATUS_RESPONSE) {
        xbee.getResponse().getModemStatusResponse(msr);
        // the local XBee sends this response on certain events, like association/dissociation
        
        if (msr.getStatus() == ASSOCIATED) {
          // yay this is great.  flash led
       //   flashLed(statusLed, 10, 10);
        } else if (msr.getStatus() == DISASSOCIATED) {
          // this is awful.. flash led to show our discontent
      //    flashLed(errorLed, 10, 10);
        } else {
          // another status
      //    flashLed(statusLed, 5, 10);
        }
      } else {
        // not something we were expecting
   //     flashLed(errorLed, 1, 25);    
      }
  } else if (xbee.getResponse().isError()) {
  } else {
 //   flashLed(errorLed, 2, 50);
  }
  
}

void flashLed(int pin, int times, int wait) {
  for (int i = 0; i < times; i++) {
    digitalWrite(pin, HIGH);
    delay(wait);
    digitalWrite(pin, LOW);
    if (i + 1 < times) {
      delay(wait);
    }
  }
}
void checkButton(){
    // read the state of the switch into a local variable:
  int reading = digitalRead(buttonPin);
  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  } 
  
  if ((millis() - lastDebounceTime) > debounceDelay) {
    if(reading == HIGH){
      buttonState = LOW;
    }
    else{
      if(buttonState != HIGH){
        sendButtonEvent();
        buttonState = HIGH;
      }
    }
  }
  
  // set the LED using the state of the button:
  digitalWrite(ledPin, buttonState);
  lastButtonState = reading;
  
}
void sendButtonEvent(){
  payloadPointer = 0;
  addByteToPayload(TYPE);
  addByteToPayload(buttonState); 
  addByteToPayload(true); 
  xbee.send(zbTx);
}
void processPacket(ZBRxResponse rx){
 

  switch (rx.getData(0)){
    case 0:
      set(rx);
      break;
    case 1:

      break;
    default:

      break;
  } 
  
}
void set(ZBRxResponse rx){
 
 String line1 = getStringFromPayload(rx,1);
 int line1length = rx.getData(1);
 String line2 = getStringFromPayload(rx, 1 + (line1length +1));
 
 lcd.clear();

 lcd.print(line1); 
 lcd.setCursor(0,1);
 lcd.print(line2);
 return;
}
//I is the index of the uint8 stored length of the string that comes after it.
String getStringFromPayload(ZBRxResponse rx, int i){
  int length = rx.getData(i);
  String line= "";

  for(int k=i+1; k < (length + i + 1); k++){
   line += (char)rx.getData(k);
  }
  return line;
}
float readFloatFromPayload(ZBRxResponse rx, int i){
 union u_tag {
    byte b[4]; 
    float fval;
  } u;
  u.b[0] = rx.getData(i);
  u.b[1] = rx.getData(i+1);
  u.b[2] = rx.getData(i+2);
  u.b[3] = rx.getData(i+3);
  return u.fval;

}
void addByteToPayload(byte value){
  payload[payloadPointer++]=value;
}
void addFloatToPayload(float value){
  byte * b = (byte *) &value;
  payload[payloadPointer++]=b[0];
  payload[payloadPointer++]=b[1];
  payload[payloadPointer++]=b[2];
  payload[payloadPointer++]=b[3];
}
