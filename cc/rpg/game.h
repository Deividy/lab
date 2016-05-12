#include <vector>
#include <string>

namespace rpg {
    using namespace std;

    class Player {
        public:
            Player (string name): m_name{name} {};

            string name () const { return m_name; };
            void name (string newName) { m_name = newName; };
        private:
            string m_name;
    };

    class Game {
        public:
            Game (vector<Player> players): m_players{players} {};

            vector<Player> players () const { return m_players; };
            void addPlayer (Player player);

        private:
            vector<Player> m_players;
    };


    class Story {};
    class Action {};

    class NPC {};

}
