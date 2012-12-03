#include <dht11.h>
#include <XBee.h>


/*-----( Declare Constants, Pin Numbers )-----*/
#define DHT11PIN 2
#define TYPE 1
#define ON 1
#define OFF 0

dht11 DHT11;
XBee xbee = XBee();
uint8_t payload[10] = {};
uint8_t payloadPointer = 0;
float setTemp = 50.0;
// SH + SL Address of receiving XBee
XBeeAddress64 addr64 = XBeeAddress64(0x0013a200, 0x4077324f);
ZBTxRequest zbTx = ZBTxRequest(addr64, payload, sizeof(payload));
ZBTxStatusResponse txStatus = ZBTxStatusResponse();
int state = OFF;
int pin5 = 0;

int statusLed = 13;
int errorLed = 13;

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
  pinMode(statusLed, OUTPUT);
  pinMode(errorLed, OUTPUT);
  Serial.begin(9600);
  xbee.setSerial(Serial);
}

void loop() {   
  
  int chk = DHT11.read(DHT11PIN);
  
  float currentTemp = Fahrenheit(DHT11.temperature) ;
  
  if(currentTemp < setTemp)
    state = ON;
  else
    state = OFF;
  
  payloadPointer = 0;
  addByteToPayload(TYPE);
  addFloatToPayload(currentTemp);
  addFloatToPayload(setTemp);
  addByteToPayload(state);
  xbee.send(zbTx);

  // flash TX indicator
  flashLed(statusLed, 1, 100);


  if (xbee.readPacket(500)) {        
    if (xbee.getResponse().getApiId() == ZB_TX_STATUS_RESPONSE) {
      xbee.getResponse().getZBTxStatusResponse(txStatus);
      if (txStatus.getDeliveryStatus() == SUCCESS) {
        // success.  time to celebrate
        flashLed(statusLed, 5, 50);
      } else {
        // the remote XBee did not receive our packet. is it powered on?
        flashLed(errorLed, 3, 500);
      }
    }
  } else if (xbee.getResponse().isError()) {
  } else {
    flashLed(errorLed, 2, 50);
  }

  delay(5000);
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
