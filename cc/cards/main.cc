#include <iostream>
#include "deck.cc"

using namespace deck;
using namespace std;

int main () {
    Player a;

    Card c { 'A', 'H' };

    Card* p = &c;

    a.addCard(p);

    c.value = '2';
    a.print();
};

