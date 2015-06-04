#include <stdio.h>

int main () {
    int lower = 0;
    int upper = 300;
    int step = 20;

    float fahr = lower;
    float celcius;

    while (fahr <= upper) {
        celcius = (5.0 / 9.0) * (fahr - 32.0);
        printf("%3.0f %6.1f\n", fahr, celcius);
        fahr = fahr + step;
    }
}
