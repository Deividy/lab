#include <vector>

using namespace std;

namespace deck {
    struct Nype {
        char value;
    };

    struct Card {
        char value;
        Nype nype;
    };

    class Deck {
        public:
            Deck(const vector<Card>& cards);
            ~Deck() {}

            const Card& operator[](int i);
            void printDeck();
            void shuffle();
        private:
            vector<Card> cards;
    };
}
