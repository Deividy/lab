#include <iostream>
#include <random>
#include <algorithm>
#include "deck.h"

using namespace deck;

const char nypes[] { 'C', 'H', 'S', 'D' };
const char cardValues[] {
    'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'
};

bool isTrucoCard (const Card& card)  {
    switch (card.value) {
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            return false;
    }  

    return true;
};
    

Deck::Deck () {
    for (const char &nype : nypes) {
        for (const char &card : cardValues) {
            Card c { card, nype };
            m_cards.push_back(c);
        }
    }
};

void Deck::print() {
    for (Card &c : m_cards) {
        cout << "Card: " << c.value << " - " << c.nype << "\n";
    }
};

void Deck::putCardOut (const short i) {
    Card &c = m_cards[i];

    m_cards_out.push_back(move(c));
    m_cards.erase(m_cards.begin() + i);
};

void Deck::putCardIn (const short i) {
    Card &c = m_cards_out[i];

    m_cards.push_back(move(c));
    m_cards_out.erase(m_cards_out.begin() + i);
};

void Deck::prepareTruco () {
    short idx = m_cards.size();

    isTruco = true;

    while (--idx > 0) {
        Card &card = m_cards[idx];

        if (!isTrucoCard(card)) {
            putCardOut(idx);
        }
    }
};

void Deck::shuffle () {
    srand(time(NULL));

    short size = m_cards.size();

    for (short i = 0; i < size; ++i) {
        short r = rand() % size;

        if (r == size) {
            r = 0;
        }

        if (i == r) {
            continue;
        }

        Card card = m_cards[i];
        Card randomCard = m_cards[r];

        m_cards[i] = move(randomCard);
        m_cards[r] = move(card);
    }
};

void Deck::reset () {
    short idx = m_cards_out.size();

    while (--idx > 0) {
        Card &card = m_cards_out[idx];

        if (!isTruco || isTrucoCard(card)) {
            putCardIn(idx);
            continue;
        }
    }
};

Card* Deck::getRandom () {
    srand(time(NULL));

    short size = m_cards.size();
    short i = rand() % size; 

    putCardOut(i);

    Card* c = &m_cards_out[m_cards_out.size() - 1];
    return c;
};

Player::Player(string name) : m_name{name} { };

void Player::addCard(Card* c) {
    m_cards.push_back(c);
};

void Player::print() {
    cout << "Cards of: " << m_name << "\n";

    for (auto &c : m_cards) {
        cout << "Card: " << c->value << " - " << c->nype << "\n";
    }

    cout << "\n";
};


Truco::Truco(vector<Player> players) : m_players{players} {
    m_deck.prepareTruco();
};

void Truco::startRound() {
    m_deck.reset();

    m_roundWinners.clear();
    m_usedCards.clear();

    for (Player &p : m_players) {
        for (short i = 0; i < 3; ++i) {
            p.addCard(m_deck.getRandom());
        }
    }

    m_manilha = m_deck.getRandom();

    if (m_roundWinners.size() > 0) {
        Player* lastWinner = m_roundWinners[m_roundWinners.size() - 1];

        for (short i = 0; i < m_players.size(); ++i) {
            if (m_players[i].name() == lastWinner->name()) {
                m_currentPlayerIndex = i;
            }
        }
    } else {
        m_currentPlayerIndex = 0;
    }
};

void Truco::print() {
    for (Player &p : m_players) {
        p.print();
    }

    cout << "Manilha: " << m_manilha->value << " - " << m_manilha->nype << "\n";
};

// SHOULD delegate to player
void Truco::playBestCard() {
    Player& player = m_players[m_currentPlayerIndex];

    for (Card* c : player.cards()) {
        cout << c->value;
    
    }
};
