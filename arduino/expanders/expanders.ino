#include <Wire.h>
#include <LiquidCrystal_I2C.h>

int data_pin = 7;
int clock_pin = 3;
int latch_pin = 8;

LiquidCrystal_I2C lcd(56, 16, 2);

unsigned int wait_ms_for_new_btn_press = 200;

unsigned long current_time = millis();

unsigned long prev_binary_count_time = 0;
unsigned long prev_btn_pressed_time[7] = { 0, 0, 0, 0, 0, 0, 0 };

unsigned long prev_command_time = 0;
unsigned short prev_toggled_bit = 0;

// short = 2 bytes = 16 bits = my led qty :)
unsigned short count = 0;

long binary_count_delay = 1000;

bool is_paused = false;

void print_current_state () {
    char bits[16];

    digitalWrite(latch_pin, 0);
    for (int i = 16; i >= 0; --i) {
        bits[15 - i] = (count >> i) & 0x01 == 1 ? '1' : '0';

        digitalWrite(clock_pin, 0);
        digitalWrite(data_pin, (count >> i) & 0x01);
        digitalWrite(clock_pin, 1);
    }
    digitalWrite(latch_pin, 1);

    Serial.println(count);

    char hex[4];

    sprintf(hex, "%x", count);
    puts(hex);

    hex[0] = toupper(hex[0]);
    hex[1] = toupper(hex[1]);
    hex[2] = toupper(hex[2]);
    hex[3] = toupper(hex[3]);

    lcd.clear();
    lcd.setCursor(0, 0);

    lcd.print(bits);
    lcd.setCursor(0, 1);

    lcd.print(hex);
    lcd.print("h");

    lcd.print(" ");
    lcd.print(count);

    lcd.print(" ");
    lcd.print(prev_toggled_bit);
}

void count_increment_and_print_current_state () {
    if (is_paused || current_time - prev_binary_count_time < binary_count_delay) {
        return;
    }

    prev_binary_count_time = current_time;
    count++;

    print_current_state();
}

void setup_acknowledge_led (byte i2c_bus_value) {
    unsigned long diff = current_time - prev_command_time;

    byte value = 255;

    if ((diff < 50 || diff > 200) && ((i2c_bus_value >> 7) & 1) == 1) {
        value &= ~(1 << 7);
    } else if (diff < 200 && ((i2c_bus_value >> 7) & 1) == 0) {
        value |= 1 << 7;
    } else {
        return;
    }

    Wire.beginTransmission(57);
    Wire.write(value);
    Wire.endTransmission();
}

void increment_prev_toggled_bit () {
    if (++prev_toggled_bit == 16) prev_toggled_bit = 0;
}

void handle_i2c_p0 () {
    Serial.println("p0 is pressed");

    increment_prev_toggled_bit();
    count ^= 1 << prev_toggled_bit;

    increment_prev_toggled_bit();
    count ^= 1 << prev_toggled_bit;

    increment_prev_toggled_bit();
    count ^= 1 << prev_toggled_bit;

    increment_prev_toggled_bit();
    count ^= 1 << prev_toggled_bit;

    increment_prev_toggled_bit();
    count ^= 1 << prev_toggled_bit;

    print_current_state();
}

void handle_i2c_p1 () {
    Serial.println("p1 is pressed");

    binary_count_delay = binary_count_delay * 2;
}

void handle_i2c_p2 () {
    Serial.println("p2 is pressed");

    binary_count_delay = binary_count_delay / 2;
}

void handle_i2c_p3 () {
    Serial.println("p3 is pressed");

    if (is_paused) {
        is_paused = false;
    } else {
        is_paused = true;
    }
}

void handle_i2c_p4 () {
    Serial.println("p4 is pressed");
}

void handle_i2c_p5 () {
    Serial.println("p5 is pressed");
    increment_prev_toggled_bit();
    print_current_state();
}

void handle_i2c_p6 () {
    Serial.println("p6 is pressed");

    count ^= 1 << prev_toggled_bit;
    print_current_state();
}

bool is_valid_press (unsigned short i2c_bus_position) {
    unsigned long diff = current_time - prev_btn_pressed_time[i2c_bus_position];

    if (diff > wait_ms_for_new_btn_press) {
        prev_btn_pressed_time[i2c_bus_position] = current_time;
        prev_command_time = current_time;

        return true;
    }

    return false;
}

bool is_pressed (byte i2c_bus_value, unsigned short i2c_bus_position) {
    // position is with low, what means that its pressed
    if (((i2c_bus_value >> i2c_bus_position) & 1) == 0) {
        // BUT if the button is pressed we need to breath a little
        // we cannot call the same command every loop, we will loop at 16MHZ
        // and it will be insane, also we DONT want to use delay since it
        // blocks the loop
        return is_valid_press(i2c_bus_position);
    }

    return false;
};

void handle_i2c_bus (byte i2c_bus_value) {
    setup_acknowledge_led(i2c_bus_value);

    if (is_pressed(i2c_bus_value, 0)) handle_i2c_p0();
    if (is_pressed(i2c_bus_value, 1)) handle_i2c_p1();
    if (is_pressed(i2c_bus_value, 2)) handle_i2c_p2();
    if (is_pressed(i2c_bus_value, 3)) handle_i2c_p3();
    if (is_pressed(i2c_bus_value, 4)) handle_i2c_p4();
    if (is_pressed(i2c_bus_value, 5)) handle_i2c_p5();
    if (is_pressed(i2c_bus_value, 6)) handle_i2c_p6();
}



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

void loop() {
    current_time = millis();

    Wire.requestFrom(57, 1);
    if (Wire.available()) {
        byte i2c_bus_value = Wire.read();

        handle_i2c_bus(i2c_bus_value);
    }

    count_increment_and_print_current_state();
}

