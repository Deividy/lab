#include <iostream>

using namespace std;

int main () {
    char i = 0x00;

    cout << "Bits available: " << sizeof(i) * 8 << "\n\n";

    // 10111011
    i |= 1 << 0;
    i |= 1 << 2;
    i |= 1 << 3;
    i |= 1 << 4;
    i |= 1 << 6;
    i |= 1 << 7;

    for (short n = 0; n < 8; ++n) {
        cout << "bit " << n << ": "<< ((i >> n) & 1) << "\n";
    };

    // invert
    // 01000100

    // clear
    i &= ~(1 << 0);

    // toggle
    i ^= 1 << 1;
    i ^= 1 << 2;
    i ^= 1 << 3;

    // clear
    i &= ~(1 << 4);

    // set
    i |= 1 << 5;

    i &= ~(1 << 6);
    i &= ~(1 << 7);

    cout << "\ninvert\n\n";

    for (short n = 0; n < 8; ++n) {
        cout << "bit " << n << ": "<< ((i >> n) & 1) << "\n";
    };


    // reinvert with for
    cout << "\nreinvert\n\n";

    for (short n = 0; n < 8; ++n) {
        i ^= 1 << n;
    };

    for (short n = 0; n < 8; ++n) {
        cout << "bit " << n << ": "<< ((i >> n) & 1) << "\n";
    };

    cout << "\n\n";
};
