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
            void putCardOut(short i);

            Card& getRandom();

        private:
            vector<Card> m_cards;
            vector<Card> m_cards_out;
    };

}
