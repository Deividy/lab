#include <vector>

using namespace std;

namespace deck {

    struct Card {
        char value;
        char nype;
    };

    class Deck {
        public:
            Deck();
            ~Deck() {}

            void shuffle();
            void print();
            void prepareTruco();
            void reset();
            void putCardOut(const short i);
            void putCardIn(const short i);

            Card* getRandom();

        private:
            vector<Card> m_cards;
            vector<Card> m_cards_out;
            bool isTruco = false;
    };


    class Player {
        public:
            Player(string name);
            ~Player() {}

            void addCard(Card* c);
            void print();

            vector<Card*> cards() { return m_cards; };
            const string name () { return m_name; };
        private:
            string m_name;
            vector<Card*> m_cards;
            vector<Card*> m_cards_out;
    
    };

    class Truco {
        public:
            Truco(vector<Player> players);
            ~Truco() {}

            void startRound();
            void print();
            void play(Player& player, Card& card);
            void playBestCard();

        private:
            vector<Player> m_players;
            vector<Player*> m_roundWinners;
            vector<Card*> m_usedCards;
            pair<Player*, short> m_points;
            short m_currentPlayerIndex;
            
            Card* m_manilha;
            Deck m_deck;
    };
}
