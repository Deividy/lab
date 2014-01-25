#include <Wire.h>

void setup() {
    Wire.begin();
    Serial.begin(9600);
}

byte readValue () {
    byte value;

    Wire.requestFrom(B00111001, 1);
    if(Wire.available()) {
        value = Wire.read();
    }
    Wire.endTransmission();
    
    return value;
}

void writeByValue (byte value) {
    byte writeValue;

    switch (value) {
        case 191:
            writeValue = B00000010;
            break;

        case 223:
            writeValue = B00000001;
            break;

        case 247:
            writeValue = B00000100;
            break;

        case 251:
            writeValue = B00001000;
            break;
        default:
            writeValue = B00000000;
    };

    Wire.beginTransmission(B00111000);
    Wire.write(writeValue);
    Wire.endTransmission();
}

void loop() {
    byte value = readValue();
    writeByValue(value);

    Serial.print(value);
    Serial.println();
  
    delay(100);  
}

