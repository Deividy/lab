#include <iostream>
#include <random>
#include <algorithm>
#include "deck.h"

using namespace deck;

Deck::Deck(const std::vector<Card>& cards) : cards{cards} {}

const Card& Deck::operator[](int i) {
    return cards[i];
};

void Deck::printDeck() {
    for (Card c : cards) {
        std::cout << c.value << " " << c.nype.value << "\n";
    }
};

void Deck::shuffle() {
    srand(time(NULL));

    for (unsigned i = 0; i < cards.size(); ++i) {
        int r = rand() % cards.size();

        Card card = cards[i];
        Card randomCard = cards[r];

        cards[i] = randomCard;
        cards[r] = card;
    }
};

int main () {
    const char nypes[] = { 'C', 'H', 'S', 'D' };
    const char cards[] = {
        'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'
    };

    int nypesLength = sizeof(nypes) / sizeof(*nypes);
    int cardsLength = sizeof(cards) / sizeof(*cards);

    std::vector<Card> d;

    for (unsigned i = 0; i < nypesLength; ++i) {
        Nype nype = { nypes[i] };

        for (unsigned n = 0; n < cardsLength; ++n) {
            Card c = { cards[n], nype };
            d.push_back(c);
        }
    }

    Deck dc(d);
    dc.shuffle();
    dc.printDeck();
};

