#include <iostream>
#include "deck.cc"

using namespace deck;
using namespace std;

int main () {
    string playerName;
    cout << "Whats your nick? \n";

    cin >> playerName;

    Player a(playerName);
    Player b("John Doe");

    vector<Player> players { a, b };

    Truco truco(players);

    truco.startRound();

    truco.playBestCard();
};

