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

            const Card& getRandom();

        private:
            vector<Card> m_cards;
            vector<Card> m_cards_out;
            bool isTruco = false;
    };


    class Player {
        public:
            Player();
            ~Player() {}

            void addCard(Card* c);
            void print();

        private:
            vector<Card*> m_cards;
            vector<Card*> m_cards_out;
    
    };

    class Truco {
        public:
            Truco();
            ~Truco() {}

        private:
            vector<Player> m_players;
    };
}
