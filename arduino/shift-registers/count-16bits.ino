#include <Wire.h>
#include <LiquidCrystal_I2C.h>

int data_pin = 7;
int clock_pin = 3;
int latch_pin = 8;

unsigned long prev_binary_count_time = 0;
unsigned long prev_btn_p0_pressed_time = 0;
unsigned long current_time = millis();

LiquidCrystal_I2C lcd(56, 16, 2);

void setup() {
    Serial.begin(9600);

    pinMode(data_pin, OUTPUT);
    pinMode(clock_pin, OUTPUT);
    pinMode(latch_pin, OUTPUT);

    Wire.begin();

    lcd.init();
    lcd.clear();
    lcd.print("Hey bro");

    delay(1000);
}

// short = 2 bytes = 16 bits = my led qty :)
unsigned short count = 0;

void binary_count () {
    if (current_time - prev_binary_count_time < 1000) {
        return;
    }

    prev_binary_count_time = current_time;
    digitalWrite(latch_pin, 0);

    for (int i = 16; i >= 0; --i) {
        digitalWrite(clock_pin, 0);
        digitalWrite(data_pin, (count >> i) & 0x01);
        digitalWrite(clock_pin, 1);
    }

    Serial.println(count);

    digitalWrite(latch_pin, 1);

    lcd.clear();
    lcd.setCursor(0, 0);

    char hex[4];

    sprintf(hex, "%x", count);
    puts(hex);

    hex[0] = toupper(hex[0]);
    hex[1] = toupper(hex[1]);
    hex[2] = toupper(hex[2]);
    hex[3] = toupper(hex[3]);

    lcd.print(hex);
    lcd.print("h");

    lcd.setCursor(0, 1);
    lcd.print(count);

    count++;
}


void loop() {
    current_time = millis();
    // 56
    // 57
    Wire.requestFrom(57, 1);

    if (Wire.available()) {
        byte i2c_bus = Wire.read();

        if ((i2c_bus & 1) == 0) { // p0 is pressed
            Serial.println("P0 is pressed");

            if (current_time - prev_btn_p0_pressed_time > 10) {
                prev_btn_p0_pressed_time = current_time;
                count++;
            }
        }

        if (((i2c_bus >> 1) & 1) == 0) { // p1 is pressed
            Serial.println("P1 is pressed");
        }

        if (((i2c_bus >> 2) & 1) == 0) { // p3 is pressed
            Serial.println("P2 is pressed");
        }

        if (((i2c_bus >> 3) & 1) == 0) { // p3 is pressed
            Serial.println("P3 is pressed");
        }

        if (((i2c_bus >> 4) & 1) == 0) { // p4 is pressed
            Serial.println("P4 is pressed");
        }

        if (((i2c_bus >> 5) & 1) == 0) { // p5 is pressed
            Serial.println("P5 is pressed");
        }

        if (((i2c_bus >> 6) & 1) == 0) { // p6 is pressed
            Serial.println("P6 is pressed");
        }


        if (((i2c_bus >> 7) & 1) == 0) { // p6 is pressed
            Serial.println("P7 is pressed");
        }


    }

    binary_count();
}
