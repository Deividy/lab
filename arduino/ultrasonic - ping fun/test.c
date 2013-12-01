const int pingPin = 11;
const int inPin = 12;
const int ledPin = 13;

byte digits[11][8] = {
    { 1, 1, 1, 1, 1, 1, 1, 0 }, //  .
    { 0, 0, 0, 0, 0, 0, 1, 1 }, // 0
    { 1, 0, 0, 1, 1, 1, 1, 1 }, // 1
    { 0, 0, 1, 0, 0, 1, 0, 1 }, // 2
    { 0, 0, 0, 0, 1, 1, 0, 1 }, // 3
    { 1, 0, 0, 1, 1, 0, 0, 1 }, // 4
    { 0, 1, 0, 0, 1, 0, 0, 1 }, // 5
    { 0, 1, 0, 0, 0, 0, 0, 1 }, // 6
    { 0, 0, 0, 1, 1, 1, 1, 1 }, // 7
    { 0, 0, 0, 0, 0, 0, 0, 1 }, // 8
    { 0, 0, 0, 0, 1, 0, 0, 1 }  // 9
};

void setup () {
    pinMode(2, OUTPUT); // A
    pinMode(3, OUTPUT); // B
    pinMode(4, OUTPUT); // C
    pinMode(5, OUTPUT); // D
    pinMode(6, OUTPUT); // E
    pinMode(7, OUTPUT); // F
    pinMode(8, OUTPUT); // G
    pinMode(9, OUTPUT); // DOT .

    // led
    pinMode(ledPin, OUTPUT);
    
    writeDigitInIndex(0);

    // initialize serial communication
    Serial.begin(9600);
}   

void loop () {
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

    if (cm >= 10) {
        digitalWrite(ledPin, HIGH);
    } else {
        digitalWrite(ledPin, LOW);
    }

    delay(200);
}

void writeDigitInIndex (byte index) {
    byte pin = 2;
    for (byte seg = 0; seg < 8; ++seg) {
        digitalWrite(pin, digits[index][seg]);
        ++pin;
    }
}

long msToCm(long microseconds) {
    // The speed of sound is 340 m/s or 29 ms per cm
    // The ping travels out and back, so to find the distance of the
    // object we take half of the distance travelled
    return microseconds / 29 / 2;
}
