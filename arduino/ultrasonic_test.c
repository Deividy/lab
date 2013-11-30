const int pingPin = 11;
int inPin = 12;
 
void setup() {
    // initialize serial communication
    Serial.begin(9600);
}
 
void loop() {
    long duration, cm;
    
    pinMode(pingPin, OUTPUT);
    pinMode(inPin, INPUT);

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

    delay(200);
}
 
long msToCm(long microseconds) {
    // The speed of sound is 340 m/s or 29 ms per cm
    // The ping travels out and back, so to find the distance of the
    // object we take half of the distance travelled
    return microseconds / 29 / 2;
}
