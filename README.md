# The good Light
esp32 control with react-native

Control LEDs via PWM using a ESP32 with a KY-040 Decoder and a REACT NATIVE app.

iOS and Android compatible.

## ESP32
The ESP32 is used as a restAPI with [aREST](https://github.com/marcoschwartz/aREST)

### Pins
#### Rotary Encoder KY-040
+ CLK  => PIN 4
+ DT   => PIN 2
+ SW   => PIN 5
+ "+"    => 3.3V
+ GND  => GND

#### PWM Pins
+ LED0 => PIN 12
+ LED1 => PIN 14 
+ LED2 => PIN 27 
+ LED3 => PIN 26 
+ LED4 => PIN 25 
+ LED5 => PIN 33 

## REACT NATIVE
The REACT NATIVE app sends simple HTTP request and uses the responses for its variables and components.

The app is developed with [expo](https://expo.io) so you need to install expo first.
##### ```npm install expo-cli --global```
or
##### ```yarn global add expo-cli```
