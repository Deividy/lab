#include <iostream>
#include <vector>
#include "game.h"

void rpg::Game::addPlayer (rpg::Player player) {
    m_players.push_back(player);
}

int main() {
    using namespace rpg;
    using namespace std;

    cout << "Hello\n";
    cout << "\n";

    Player player{"Deividy"};
    vector<Player> players = { player, Player{"Ana"} };

    Game g{players};
    vector<Player> gPlayers = g.players();

    for (Player p : gPlayers) {
        cout << p.name();
        cout << "\n";
    }

    cout << "\n";

    g.addPlayer(Player {"Test 2"});

    gPlayers = g.players();
    for (Player p : gPlayers) {
        cout << p.name();
        cout << "\n";
    }

    cout << "\n\n";

    for (Player p : players) {
        cout << p.name();
        cout << "\n";
    }

    cout << "\n";
}
