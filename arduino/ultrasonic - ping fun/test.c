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
    9  // DOT .
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

void setup () {
    for (int pinIdx = 0; pinIdx < 8; ++pinIdx) {
        pinMode(sevenSegmentPins[pinIdx], OUTPUT);
    }

    // led
    pinMode(greenLed, OUTPUT);
    pinMode(redLed, OUTPUT);
    
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
        analogWrite(greenLed, 25 * cm);
        digitalWrite(redLed, LOW);
        writeDigitInIndex(0);
    } else {
        analogWrite(redLed, 255 / cm);
        digitalWrite(greenLed, LOW);
        writeDigit(cm);
    }

    delay(300);
}

void writeDigit (int digit) {
    writeDigitInIndex(digit + 1);
}

void writeDigitInIndex (byte index) {
    for (byte idx = 0; idx < 8; ++idx) {
        digitalWrite(sevenSegmentPins[idx], digits[index][idx]);
    }
}

long msToCm(long microseconds) {
    // The speed of sound is 340 m/s or 29 ms per cm
    // The ping travels out and back, so to find the distance of the
    // object we take half of the distance travelled
    return microseconds / 29 / 2;
}


