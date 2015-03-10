#include <iostream>
#include <string>
#include <vector>
#include "grok-game.h"

using namespace grok;

class Sword : public Weapon {
    public:
        Sword(double power) : m_power { power } { }
        double power() { return m_power; };
        ~Sword () {};

    private:
        double m_power;
};

class Mage : public Human {
    public:
        Mage(std::string name) : m_name { name } { }
        std::string name () { return m_name; };


        Spell addSpell(std::string name, double power)  {
            Spell s;

            s.name = name;
            s.power = power;

            spells.push_back(s);

            return s;
        };

        void addSword (Sword& w) { swords.push_back(w); };

        ~Mage() {
        }

    private:
        std::string m_name;
        std::vector<Spell> spells;
        std::vector<Sword> swords;
};

int main () {
    std::string userName;

    std::cout << "What is your name? \n";
    std::cin >> userName;

    char type;
    std::cout << "What class of human? \n w for Warrior \n m for Mage \n";
    std::cin >> type;

    if (type != 'm') {
        throw std::invalid_argument("not implemented");
    }

    Mage player(userName);

    std::string spellName;
    std::cout << "Enter your first spell name: \n";
    std::cin >> spellName;

    Spell s = player.addSpell(spellName, 5);

    std::cout << "So, your name is: " << player.name() << "\n";
    std::cout << "And your first spell is: " << s.name;
    std::cout << ", with power of " << s.power << ".\n";

    Sword sw(1);
    player.addSword(sw);

};
