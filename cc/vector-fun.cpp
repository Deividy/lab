#include <iostream>
#include "vector-fun.h"

Vector::Vector(int s) :elem{new double[s]}, sz{s} {}

double& Vector::operator[] (int i) { return elem[i]; }
int Vector::size() { return sz; }

int main() {
    int countNumbers;
    std::cout << "How much numbers do you want to sum?\n";
    std::cin >> countNumbers;

    Vector v(countNumbers);

    for (int i =0; i < v.size(); ++i) {
        std::cout << "Please enter a number \n";
        std::cin >> v[i];
    }

    double sum = 0;
    for (int i = 0; i < v.size(); ++i) {
        sum += v[i];
    }

    std::cout << "SUM: " << sum << "\n";
};
