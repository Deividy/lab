#include <LiquidCrystal.h>

// Pin config
LiquidCrystal lcd(
    22, 23,
    29, 28, 27, 26
);

int leds[4] = {
    2,  // Red
    3,  // Yellow
    4,  // Blue
    5   // Green
};

int buttons[6] = {
    36, // Red
    37, // Yellow
    38, // Blue
    39,  // Green

    9, // Switch
    10  // Reset
};

// buttons to led is
// buttons[0] = leds[0]
// buttons[1] = leds[1]
// buttons[2] = leds[2]
// buttons[3] = leds[3]

int speaker = 6;

// Notes config
int notes[5] = {
    262,    // C
    294,    // D
    330,    // E
    349,    // F
    523     // B
};

// Game
int memoryCache[100] = { };
int level = 0;
int lastUserLevel = 0;
int higherLevel = 0;

boolean playing = false;

void blinkAll () {
    for(int i = 0; i < sizeof(leds)/sizeof(int); i++) {
        digitalWrite(leds[i], HIGH);
        tone(speaker, notes[i]);

        delay(100);

        digitalWrite(leds[i], LOW);
    }

    noTone(speaker);
};

void newGame () {
    blinkAll();

    playing = true;
 
    tone(speaker, notes[4]);
    delay(100);

    noTone(speaker);

    level = 0;
    lastUserLevel = 0;

    int memoryCache[100] = { };

    delay(1000);

    randomPlay();
    showMemory();
};

void gameOver() {
    int memoryCache[100] = { };

    blinkAll();

    if (level > higherLevel) {
        higherLevel = level;
    }

    playing = false;
    level = 0;
    lastUserLevel = 0;

    lcd.clear();

    lcd.setCursor(0, 0);
    lcd.print("Game over!");

    lcd.setCursor(0, 1);
    lcd.print("Push the button");
};


void randomPlay () {
    memoryCache[level] = random(4);
};

// lcd show/print
void showHigherLevel () {
    lcd.clear();

    lcd.setCursor(0, 0);
    lcd.print("Higher level ");
    lcd.print(higherLevel);

    lcd.setCursor(0, 1);
    lcd.print("Push the button");
};

void showLevel () {
    lcd.clear();

    lcd.setCursor(0, 0);
    lcd.print("Level ");
    lcd.print(level);  
};

void showMemory () {
    showLevel();
    
    int idx = 0;

    for (int i = 0; i <= level; i++) {
        idx = memoryCache[i];

        digitalWrite(leds[idx], HIGH);
        tone(speaker, notes[idx]);

        delay(250);

        digitalWrite(leds[idx], LOW);
        noTone(speaker);
        delay(200);
    }
    
    noTone(speaker);
};
//

void validateUserPlay (int btnIndex) {
    if (!playing) {
        return;
    }

    // debug
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(btnIndex);
    lcd.setCursor(0, 1);
    lcd.print(memoryCache[lastUserLevel]);

    lcd.setCursor(15, 0);
    lcd.print(lastUserLevel);

    if (btnIndex != memoryCache[lastUserLevel]) {
        gameOver();
        return;
    }

    lastUserLevel++;

    if (lastUserLevel <= level) {
        return;
    }

    delay(1000);

    lastUserLevel = 0;

    level++;
    randomPlay();
    
    showMemory();
};

// button handlers

// we need to know if the buttons is pressed or not, so we cache it
boolean isPressed[4] = { false, false, false, false };

void buttonLedPress(int idx) {
    if (isPressed[idx]) {
        return;
    }

    isPressed[idx] = true;

    digitalWrite(leds[idx], HIGH);
    tone(speaker, notes[idx]);
};

void buttonLedRelease(int idx) {
    if (!isPressed[idx]) {
        return;
    }
    
    isPressed[idx] = false;

    digitalWrite(leds[idx], LOW);
    noTone(speaker);
    
    validateUserPlay(idx);
};

// Arduino functions
void setup () {
    // init lcd
    lcd.begin(16, 2);

    // init leds
    for(int i = 0; i < sizeof(leds)/sizeof(int); i++) {
        pinMode(leds[i], OUTPUT);
    }

    // init buttons
    for(int i = 0; i < sizeof(buttons)/sizeof(int); i++) {
        pinMode(buttons[i], INPUT);
    }

    // init speaker
    pinMode(speaker, OUTPUT);

    lcd.clear();

    lcd.setCursor(0, 0);
    lcd.print("Push the button");
};

void loop () {
    // only the first 4 the led buttons
    for(int i = 0; i < 4; i++) {
        if (digitalRead(buttons[i]) == LOW) {
            buttonLedPress(i); 
        } else {
            buttonLedRelease(i);
        }
    }

    if (digitalRead(buttons[4]) == LOW) {
        newGame();
    }

    if (digitalRead(buttons[5]) == LOW) {
        showHigherLevel();
    }
};
