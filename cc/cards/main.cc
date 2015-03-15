#include <iostream>
#include "deck.cc"

using namespace deck;
using namespace std;

int main () {
    Deck dc;
    dc.prepareTruco();
    dc.shuffle();


    Card c1 = dc.getRandom();
    Card c2 = dc.getRandom();
    Card c3 = dc.getRandom();

    cout << "Card 1: " << c1.value << " - " << c1.nype << "\n";
    cout << "Card 2: " << c2.value << " - " << c2.nype << "\n";
    cout << "Card 3: " << c3.value << " - " << c3.nype << "\n";

    cout << "\n\nDeck now \n\n";

    dc.print();
};

