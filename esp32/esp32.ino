// ESP32 - The good Light by Davor Vinkovic

// Rotary Encoder KY-040
// CLK  => PIN 4
// DT   => PIN 2
// SW   => PIN 5
// +    => 3.3V
// GND  => GND

// PWM Pins
// LED0 => PIN 12;  
// LED1 => PIN 14; 
// LED2 => PIN 27; 
// LED3 => PIN 26; 
// LED4 => PIN 25; 
// LED5 => PIN 33; 

#include <Arduino.h>
#include "WiFi.h"
#include "aREST.h"

#define ROTARY_PIN_DT 2
#define ROTARY_PIN_CLK 4
#define ROTARY_PIN_SW 5

static uint8_t pwmValue=0; 
static bool onOff= false;
static uint8_t state=0;

const char* ssid = "XXXXXXXX";
const char* password =  "XXXXXXXX";

// PWM pins
const int ledPin0 = 12;  
const int ledPin1 = 14; 
const int ledPin2 = 27; 
const int ledPin3 = 26; 
const int ledPin4 = 25; 
const int ledPin5 = 33; 

// setting PWM properties
const int freq = 5000;
const int ledArray = 0;
const int resolution = 8;

aREST rest = aREST();
WiFiServer server(80);

void IRAM_ATTR isrRotated() {
   uint8_t s = state & 3;

    if (digitalRead(ROTARY_PIN_DT)) s |= 4;
    if (digitalRead(ROTARY_PIN_CLK)) s |= 8;
    switch (s) {
      case 0: case 5: case 10: case 15:
        break;
      case 1: case 3: case 12: case 7: case 8: case 14:
        if(pwmValue <= 250){
        pwmValue++; break;   
        }break;
      case 2: case 4: case 11: case 13: 
        if(pwmValue >= 5){
        pwmValue--; break;    
        }break;
    }
    state = (s >> 2);
   
 // Serial.println(pwmValue);
 
}

void IRAM_ATTR isrPushed() {
  onOff = !onOff;
  // Serial.print("toogle");
}

void setup(){
  //Serial.begin(115200);
   
  // configure LED PWM functionalitites
  ledcSetup(ledArray, freq, resolution);
  

  // attach the channel to the GPIO to be controlled
  ledcAttachPin(ledPin0, ledArray);
  ledcAttachPin(ledPin1, ledArray);
  ledcAttachPin(ledPin2, ledArray);
  ledcAttachPin(ledPin3, ledArray);
  ledcAttachPin(ledPin4, ledArray);
  ledcAttachPin(ledPin5, ledArray);
  
  pinMode(ROTARY_PIN_DT, INPUT_PULLUP);
  pinMode(ROTARY_PIN_CLK, INPUT_PULLUP);
  pinMode(ROTARY_PIN_SW, INPUT);

  attachInterrupt(ROTARY_PIN_DT, isrRotated, CHANGE);
  attachInterrupt(ROTARY_PIN_CLK, isrRotated, CHANGE);
  attachInterrupt(ROTARY_PIN_SW, isrPushed, HIGH);
  
  //device infos
  rest.set_id("1");
  rest.set_name("The good Light");

  // http variable
  rest.variable("pwmValue",&pwmValue);
  rest.variable("onOff",&onOff);

  // http functions
  rest.function("toggle",toggleLightHandler);
  rest.function("change",pwmValueChangeHandler);
  
  // connect Wifi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  // network settings
  IPAddress ip(192,168,0,200);   
  IPAddress gateway(192,168,0,1);   
  IPAddress subnet(255,255,255,0);   
  WiFi.config(ip, gateway, subnet);
  //Serial.println("WiFi connected with IP: ");
  //Serial.println(WiFi.localIP());
 
  // start webserver
  server.begin();
}

void webApi(){
 
  WiFiClient client = server.available();
  if (client) {
 
    while(!client.available()){
      delay(5);
    }
    rest.handle(client);
  }
}

int toggleLightHandler(String command) {
  onOff = !onOff;
  // Serial.println("toggle led");
}

// /change?params=0 executes the function
int pwmValueChangeHandler(String command) {
  pwmValue = command.toInt();
  // Serial.println("pwm value: ");
  // Serial.print(pwmValue);
}

void loop(){
  webApi();
 
   if(onOff){
     ledcWrite(ledArray, pwmValue);
   }
   else{
    ledcWrite(ledArray, 0);
   }
 }
