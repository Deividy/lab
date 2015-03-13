#include <iostream>
#include <random>
#include <algorithm>
#include "deck.h"

using namespace deck;

const char nypes[] = { 'C', 'H', 'S', 'D' };
char allCards[] = {
    'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'
};
char trucoCards[] = {
    'A', '2', '3', 'T', 'J', 'Q', 'K'
};   

Deck::Deck(const std::vector<Card>& cards) : cards{cards} {}

std::vector<Card> buidCards (char cards[]) {
    int nypesLength = sizeof(nypes) / sizeof(*nypes);

    std::vector<Card> d;

    for (int i = 0; i < nypesLength; ++i) {
        Nype nype = { nypes[i] };

        for (int n = 0; cards[n] != 0; ++n) {
            Card c = { cards[n], nype };
            d.push_back(c);
        }
    }

    return d;
};

Deck createDeck (DeckType type) {
    std::vector<Card> cards;

    switch (type) {
        case DeckType::full:
            cards = buidCards(allCards);

        case DeckType::truco:
            cards = buidCards(trucoCards);
    }

    // SHOULD initialize TrucoDeck and return
    Deck dc(cards);
    return dc;
};

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

        if (r == cards.size()) {
            r = 0;
        }

        if (i == r) {
            continue;
        }

        Card card = cards[i];
        Card randomCard = cards[r];

        cards[i] = randomCard;
        cards[r] = card;
    }
};

int main () {
    Deck dc = createDeck(DeckType::full);

    std::cout << "first card \n";
    std::cout << dc[0].value << " " << dc[0].nype.value << "\n";

    std::cout << "last card \n";
    std::cout << dc[51].value << " " << dc[51].nype.value << "\n";

    std::cout << "\nShuffle \n\n";
    dc.shuffle();

    std::cout << "first card \n";
    std::cout << dc[0].value << " " << dc[0].nype.value << "\n";

    std::cout << "last card \n";
    std::cout << dc[51].value << " " << dc[51].nype.value << "\n";

    std::cout << "Truco deck \n\n";
    

    Deck truco = createDeck(DeckType::truco);
    truco.shuffle();
    truco.printDeck();
};

