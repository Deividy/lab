#include <iostream>

using namespace std;

void print_action (char& action) {
    bool bit1 = (action >> 0) & 1;
    bool bit2 = (action >> 1) & 1;

    // 00
    if (!bit1 && !bit2) {
        cout << "Nothing";
    }

    // 01
    if (!bit1 && bit2) {
        cout << "3 star";
    }

    // 10
    if (bit1 && !bit2) {
        cout << "4 star";
    }

    // 11
    if (bit1 && bit2) {
        cout << "5 star";
    }

    cout << "\n";
};

int main () {
    // uses 2 bits to have 4 options
    char action = 0x00;

    // 00 = nothing
    // 01 = 3 star
    // 10 = 4 star
    // 11 = 5 star
    //

    // 00
    print_action(action);

    // 01
    action |= 1 << 0;
    print_action(action);

    // 11
    action |= 1 << 1;
    print_action(action);

    // 10
    action &= ~(1 << 0);
    print_action(action);


    // 000 = nothing
    // 001 = 2 star
    // 010 = 3 star
    // 011 = 4 star
    // 100 = 5 star
    // 101 = awesome game
    // 110 = awesome better game
    // 111 = master

    cout << "--\nchar tests\n-- \n";


    char i = 0xFF;

    cout << "Bits available: " << sizeof(i) * 8 << "\n\n";

    for (short n = 0; n < 8; ++n) {
        cout << "bit " << n << ": "<< ((i >> n) & 1) << "\n";
    };

    i = 0x00;

    cout << "\n10111011\n\n";

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
