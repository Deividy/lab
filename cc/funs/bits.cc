#include <iostream>

using namespace std;

/*
// 1 bit
0000 0000 // 0
0000 0001 // 1

// 2 bit
0000 0010 // 2
0000 0011 // 3

// 3 bit
0000 0100 // 4
0000 0101 // 5
0000 0110 // 6
0000 0111 // 7

// 4 bit
0000 1000 // 8
0000 1001 // 9
0000 1010 // 10
0000 1011 // 11
0000 1100 // 12
0000 1101 // 13
0000 1110 // 14
0000 1111 // 15

// 5 bit
0001 0000 // 16
0001 0001 // 17
0001 0010 // 18
0001 0011 // 19
0001 0100 // 20
0001 0101 // 21
0001 0110 // 22
0001 0111 // 23
0001 1000 // 24
0001 1001 // 25
0001 1010 // 26
0001 1011 // 27
0001 1100 // 28
0001 1101 // 29
0001 1110 // 30
0001 1111 // 31

// 6 bit
0010 0000 // 32
0010 0001 // 33
0010 0010 // 34
0010 0011 // 35
0010 0100 // 36
0010 0101 // 37
0010 0110 // 38
0010 0111 // 39
0010 1000 // 40
0010 1001 // 41
0010 1010 // 42
0010 1011 // 43
0010 1100 // 44
0010 1101 // 45
0010 1110 // 46
0010 1111 // 47
0011 0000 // 48
0011 0001 // 49
0011 0010 // 50
0011 0011 // 51
0011 0100 // 52
0011 0101 // 53
0011 0110 // 54
0011 0111 // 55
0011 1000 // 56
0011 1001 // 57
0011 1010 // 58
0011 1011 // 59
0011 1100 // 60
0011 1101 // 61
0011 1110 // 62
0011 1111 // 63

// 7 bit
0100 0000 // 64
0100 0001 // 65
*/

// when we operate in bits we always operate in the most right

void print_action (char& action) {
    // action = 0000 0001
    // so the SHIFT (>>) moves the bits to right
    // and then the AND (&) compares if the last bit
    // is that value
    bool bit1 = action & 0x01;
    bool bit2 = (action >> 1) & 0x01;

    cout << ((action >> 7) & 0x01);
    cout << ((action >> 6) & 0x01);
    cout << ((action >> 5) & 0x01);
    cout << ((action >> 4) & 0x01);

    cout << " ";

    cout << ((action >> 3) & 0x01);
    cout << ((action >> 2) & 0x01);
    cout << ((action >> 1) & 0x01);
    cout << (action & 0x01) << " - ";

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

void print_bits (int i) {
    short n = 8;
    while (n--) {
        cout << ((i >> n) & 1);

        if (n == 4) {
            cout << " ";
        }
    };

    cout << "\n";
};

int main () {
    unsigned short bfoo = 0x0000;

    // 1 byte = 8 bits
    // 1 hexadecimal = 4 bits
    //
    // short = 2 bytes = 16 bits = 4 hexadecimal
    unsigned short m = 0xFF00;

    // uses 2 bits to have 4 options
    char action = 0x00;

    // 00 = nothing
    // 01 = 3 star
    // 10 = 4 star
    // 11 = 5 star

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

    cout << "\n";
    char i = 0xFF;

    cout << "Bits available: " << sizeof(i) * 8 << "\n\n";

    print_bits(i);

    i = 0x00;

    cout << "\nshould now be: 1101 1101\n\n";

    i |= 1 << 0;
    i |= 1 << 2;
    i |= 1 << 3;
    i |= 1 << 4;
    i |= 1 << 6;
    i |= 1 << 7;

    print_bits(i);

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

    cout << "\ninvert\n";

    print_bits(i);

    // reinvert with for
    cout << "\nreinvert\n";
    for (short n = 0; n < 8; ++n) {
        i ^= 1 << n;
    };
    print_bits(i);

    cout << "\nusing AND\n";
    i = i & 0x0F;
    print_bits(i);

    cout << "\nusing OR\n";
    i = i | 0xD0;
    print_bits(i);

    cout <<"\nshifting with and\n";
    i = (i >> 2) & 0x01;
    print_bits(i);
};
