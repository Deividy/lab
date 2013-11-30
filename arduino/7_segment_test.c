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
}   

void loop () {
    for (byte idx = 0; idx < 11; ++idx) {
        writeDigitInIndex(idx);
        delay(1000);
    }
}

void writeDigitInIndex (byte index) {
    byte pin = 2;
    for (byte seg = 0; seg < 8; ++seg) {
        digitalWrite(pin, digits[index][seg]);
        ++pin;
    }
}

