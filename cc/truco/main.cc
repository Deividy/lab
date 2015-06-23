#include "src/deck/deck.cc"
#include "src/player/player.h"
#include "src/game/game.h"

using namespace std;
using namespace deck;

int main () {
    Deck* deck = new Deck();
    Player* a = new Player("Hero");
    Player* b = new Player("Vilain");

    vector<Player*> players { a, b };

    Game game { deck, players };

    game.draw_card(a);
    game.draw_card(a);

    game.draw_card(b);
    game.draw_card(b);

    a->print_hand();
    b->print_hand();
}
