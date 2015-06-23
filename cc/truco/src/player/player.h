#include <vector>

using namespace std;

namespace deck {
    class Player {
        public:
            Player(string name) : m_name{name} {};
            ~Player() {}

            void add_card(const pair<char, char> card) {
                m_cards.push_back(card);
            }

            void print_hand () {
                cout << "Cards of " << m_name << ":\n---\n";
                for (auto card : m_cards) {
                    print_card(card);
                }

                cout << "---\n";
            }

        private:
            string m_name;
            vector<pair<char, char>> m_cards;
    };
}
