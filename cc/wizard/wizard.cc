#include <iostream>
#include "wizard.h"

using namespace wizard;

Wizard::Wizard(std::string name) : m_name { name } {

};
std::string Wizard::name() { return m_name; };

void Wizard::setPower(Power power) {
    m_power = power;

    std::cout << "Power added " << power.name << "\n";
    std::cout << "With power of : " << power.power << "\n";
};

int main () {
    std::string name;

    std::cout << "Enter a name for your wizard\n";
    std::cin >> name;

    Wizard w(name);

    std::cout << "Wizard with name " << w.name() << "\n";

    std::string powerName;

    std::cout << "Enter a power name for your wizard\n";
    std::cin >> powerName;

    w.setPower(Power { 1, 8, powerName });
};
