#include <vector>

using namespace std;

namespace deck {
    // abstract
    class Game {
        public:
            Game(Deck* deck, vector<Player*> players) :
                m_deck{deck},
                m_players{players}
            {}

            ~Game() {
                delete m_deck;

                short i = m_players.size();

                while (i--) {
                    Player* player = m_players[i];
                    m_players.erase(m_players.begin() + i);
                    delete player;
                }
            }

            void draw_card (Player* player) {
                pair<char, char> card = m_deck->get();
                player->add_card(card);
            }

        private:
            Deck* m_deck;
            vector<Player*> m_players;
    };
}
