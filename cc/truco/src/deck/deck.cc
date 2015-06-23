#include <iostream>
#include "deck.h"

using namespace std;
using namespace deck;

Deck::Deck () {
    for (const char &nype : NYPES) {
        for (const char &card : CARDS) {
            m_cards.push_back(pair<char, char> (card, nype));
        }
    }
};

void Deck::reset () {
    short i = m_cards_out.size();

    while (i--) {
        pair<char, char> card = m_cards_out[i];

        m_cards.push_back(move(card));
        m_cards_out.erase(m_cards_out.begin() + i);
    }
};

void inline Deck::print () {
    cout << "Deck has the cards: \n";

    for (auto card : m_cards) {
        print_card(card);
    }
};

void inline Deck::print_out () {
    cout << "Deck has the cards out: \n";

    for (auto card : m_cards_out) {
        print_card(card);
    }
};

void Deck::shuffle () {
    srand(time(0));

    short size = m_cards.size() - 1;

    for (short i = 0; i < size; ++i) {
        short r = rand() % size;

        if (i == r) {
            continue;
        }

        pair<char, char> card = m_cards[i];
        pair<char, char> random_card = m_cards[r];

        m_cards[i] = move(random_card);
        m_cards[r] = move(card);
    }
};

const pair<char, char> Deck::get () {
    srand(time(0));
    short i = rand() % m_cards.size() - 1;

    pair<char, char> card = m_cards[i];

    m_cards_out.push_back(move(card));
    m_cards.erase(m_cards.begin() + i);

    return card;
};

const vector<pair<char, char>> Deck::get (short number_of_cards) {
    srand(time(0));
    short size = m_cards.size() - 1;

    vector<pair<char, char>> cards;

    while (number_of_cards) {
        short i = rand() % size;

        pair<char, char> card = m_cards[i];

        m_cards_out.push_back(move(card));
        m_cards.erase(m_cards.begin() + i);

        cards.push_back(card);

        size--;
        number_of_cards--;
    }

    return cards;
};
