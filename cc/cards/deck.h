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

    class TrucoDeck : public Deck {
        public:
            TrucoDeck(const vector<Card>& cards);
            ~TrucoDeck() {}

        private:
            vector<Card> cards;
    
    };

    enum class DeckType { full, truco };
}
