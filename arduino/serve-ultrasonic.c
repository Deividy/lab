#include <Servo.h> 

const int pingPin = 11;
const int inPin = 12;

Servo servo1; 

long msToCm(long microseconds) {
    // The speed of sound is 340 m/s or 29 ms per cm
    // The ping travels out and back, so to find the distance of the
    // object we take half of the distance travelled
    return microseconds / 29 / 2;
}

void setup () {
    Serial.begin(9600);

    pinMode(pingPin, OUTPUT);
    pinMode(inPin, INPUT);

    servo1.attach(8);
}   

void loop () {
    long duration, cm;

    // send the signal, starting with LOW for a clean signal
    digitalWrite(pingPin, LOW);
    delayMicroseconds(2);
    digitalWrite(pingPin, HIGH);
    delayMicroseconds(5);
    digitalWrite(pingPin, LOW);

    duration = pulseIn(inPin, HIGH);

    cm = msToCm(duration);

    Serial.print(cm);
    Serial.print("cm");
    Serial.println();
    
    if (cm <= 18) {
        servo1.write(cm * 10);
    } else if (cm <= 36) {
        servo1.write((cm / 2) * 10); 
    } else if (cm <= 54) {
            servo1.write((cm / 3) * 10); 
    } else {
        servo1.write(cm); 
    }
    
    delay(300);
}

