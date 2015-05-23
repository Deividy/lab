#include <vector>

using namespace std;

namespace deck {
    static constexpr char NYPES[4] = { 'H', 'C', 'S', 'D' };
    static constexpr char CARDS[13] = {
        'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K' 
    };

    void inline print_card (pair<char, char> card) {
        cout << "Card: " << card.first << card.second << "\n";
    };

    class Deck {
        public:
            Deck();
            ~Deck() {}

            void inline print ();
            void inline print_out();

            void shuffle ();
            void reset ();

            const vector<pair<char, char>> get(short number_of_cards);
            const pair<char, char> get();

        private:
            vector<pair<char, char>> m_cards;
            vector<pair<char, char>> m_cards_out;
    };
}
