const int pingPin = 11;
const int inPin = 12;
const int greenLed = 13;
const int redLed = 10;

const int sevenSegmentPins[8] = {
    2,  // A
    3,  // B
    4,  // C
    5,  // D
    6,  // E
    7,  // F
    8,  // G
    9   // DOT .
};

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

void setup () {
    // 7 segments pins
    for (byte pin = 0; pin < 8; ++pin) {
        pinMode(sevenSegmentPins[pin], OUTPUT);
    }
    // initialize with dot
    writeDigitInIndex(0);

    // led
    pinMode(greenLed, OUTPUT);
    pinMode(redLed, OUTPUT);
    
    // ultrasonic
    Serial.begin(9600);

    pinMode(pingPin, OUTPUT);
    pinMode(inPin, INPUT);
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

    // green light and seven segments
    if (cm >= 10) {
        digitalWrite(greenLed, HIGH);
        digitalWrite(redLed, LOW);
        writeDigitInIndex(0);
    } else {
        digitalWrite(greenLed, LOW);
        analogWrite(redLed, 255 / cm);
        writeDigitInIndex(cm + 1);
    }

    Serial.print(cm);
    Serial.print("cm");
    Serial.println();

    delay(300);
}

