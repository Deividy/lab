int motor_pin1 = 9;   //L239D INPUT2 -> MAPPING TO OUTPUT2 MOTOR(-)
int motor_pin2 = 10;   //L239D INPUT1 -> MAPPING TO OUTPUT1 MOTOR(+)
int enable_pin = 11;   //L239D ENABLE1

int motor_pin3 = 8;   //L239D INPUT2 -> MAPPING TO OUTPUT2 MOTOR(-)
int motor_pin4 = 7;   //L239D INPUT1 -> MAPPING TO OUTPUT1 MOTOR(+)
int enable_pin2 = 6;   //L239D ENABLE1
 
void setup(){
 pinMode(motor_pin1, OUTPUT);
 pinMode(motor_pin2, OUTPUT);
 pinMode(enable_pin, OUTPUT);
 
}
 
void loop(){
 // When enable_pin to HIGH, it's will be let motor to rotate.
 analogWrite(enable_pin, 250);
 analogWrite(enable_pin2, 250);
 
 // turn motor rotate to postive direction <--
 digitalWrite(motor_pin1, HIGH);
 digitalWrite(motor_pin2, LOW);
 
 // turn motor rotate to opposite direction -->
 digitalWrite(motor_pin3, HIGH);
 digitalWrite(motor_pin4, LOW);
 
 delay(5000);
 
 analogWrite(enable_pin2, 250);
 analogWrite(enable_pin, 150);
 
 delay(1000);
 
 analogWrite(enable_pin2, 150);
 analogWrite(enable_pin, 250);
 
 delay(1000);
}
