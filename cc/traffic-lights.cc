#include <iostream>

enum class TrafficLight { green, yellow, red };

TrafficLight& operator++(TrafficLight& t) {
    switch (t) {
        case TrafficLight::green:
            return t = TrafficLight::yellow;

        case TrafficLight::yellow:
            return t = TrafficLight::red;
        
        case TrafficLight::red:
            return t = TrafficLight::green;
    }
}

void printLight (TrafficLight& t) {
    switch (t) {
        case TrafficLight::green:
            std::cout << "Light green!\n";
            return;

        case TrafficLight::yellow:
            std::cout << "Light yellow\n";
            return;
        
        case TrafficLight::red:
            std::cout << "Light red...\n";
            return;
    }
}

int main () {
    TrafficLight state = TrafficLight::green;

    std::cout << "Waiting... \n";

    int pass = 2;
    while (pass != 0) {
        state = ++state;
        printLight(state);

        if (state == TrafficLight::green) {
            pass--;
        }
    }
}
