#include <SoftwareSerial.h>



#include <dht11.h>
#include <XBee.h>


/*-----( Declare Constants, Pin Numbers )-----*/
#define DHT11PIN 2
#define TYPE 1
#define ON 2
#define OFF 1
#define AUTO 0
int heat = 0;
SoftwareSerial ss(10,11);
dht11 DHT11;
XBee xbee = XBee();
uint8_t payload[11] = {};
uint8_t payloadPointer = 0;
long previousMillis = 0;
long interval = 5000;
float setTemp = 50.0;
// SH + SL Address of receiving XBee
XBeeAddress64 addr64 = XBeeAddress64(0x0013a200, 0x408a7c99);
ZBTxRequest zbTx = ZBTxRequest(addr64, payload, sizeof(payload));
ZBTxStatusResponse txStatus = ZBTxStatusResponse();
int state = OFF;
int pin5 = 0;
ZBRxResponse rx = ZBRxResponse();
ModemStatusResponse msr = ModemStatusResponse();
int statusLed = 13;
int errorLed = 13;
int heatLed = 9;

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

void setup() {
  ss.begin(9600);
  ss.println("starting debug code version 12");
  pinMode(statusLed, OUTPUT);
  pinMode(errorLed, OUTPUT);
  pinMode(heatLed, OUTPUT);
  Serial.begin(9600);
  xbee.setSerial(Serial);
  flashLed(statusLed, 30, 100);
  flashLed(statusLed, 1, 100);
}

void loop() {   
  
  

  // flash TX indicator
 // flashLed(statusLed, 1, 100);
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
        flashLed(statusLed, 5, 100);
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
  
  unsigned long currentMillis = millis();
  
  if(currentMillis - previousMillis > interval) {
    // save the last time you blinked the LED 
    previousMillis = currentMillis;   
    checkAndReport();
  
  }
  //delay(5000);
}
void checkAndReport(){
    int chk = DHT11.read(DHT11PIN);
  
  float currentTemp = Fahrenheit(DHT11.temperature) ;
  
  if(currentTemp < setTemp && state == AUTO && heat == 0){
    ss.println("turning heat on because its cold");
    heat = 1;
    digitalWrite(heatLed, HIGH);
  }
  else if(currentTemp >= setTemp && state == AUTO && heat == 1){
    heat = 0;
    ss.println("turning heat off because its hot");
    digitalWrite(heatLed, LOW);
  }else if(state == ON && heat == 0){
    ss.println("turning heat on because it was explicitly turned on");
    heat = 1;
    digitalWrite(heatLed, HIGH);
  }else if(state == OFF && heat ==1){
    ss.println("turning heat off because it was explicitly turned off");
    heat = 0;
    digitalWrite(heatLed, LOW);
  }
  
  
  
  payloadPointer = 0;
  addByteToPayload(TYPE);
  addFloatToPayload(currentTemp);
  addFloatToPayload(setTemp);
  addByteToPayload(state);
  addByteToPayload(heat);
  xbee.send(zbTx);
}
void processPacket(ZBRxResponse rx){
 
  ss.println("processing data");
  switch (rx.getData(0)){
    case 0:
      ss.println("got packet for set action");
      set(rx);
      break;
    case 1:
      ss.println("got packet of type 1");
      break;
    default:
      ss.println("got unknown packet type");
      break;
  } 
  
}
void set(ZBRxResponse rx){
  state = rx.getData(1); //second byte is the state
  setTemp = readFloatFromPayload(rx, 2);
  ss.print("set Temp: ");
  ss.println(setTemp);
  ss.print("state :");
  ss.println(state);
  ss.print("heat :");
  ss.println(heat);
  checkAndReport();
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
float Fahrenheit(float celsius)
{
        return 1.8 * celsius + 32;
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
