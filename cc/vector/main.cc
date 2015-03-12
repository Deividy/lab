#include <iostream>
#include "vector.cc"

int main () {
    Vector<double> a(5);
    a[0] = 1;
    a[1] = 5;

    Vector<double> b(a);

    Vector<double> c = b;

    a[0] = 2;
    a[1] = 3;

    std::cout << "Vector a[0] = " << a[0] << "\n";
    std::cout << "Vector b[0] = " << b[0] << "\n";
    std::cout << "Vector c[0] = " << c[0] << "\n";

    std::cout << "Vector a[1] = " << a[1] << "\n";
    std::cout << "Vector b[1] = " << b[1] << "\n";
    std::cout << "Vector c[1] = " << c[1] << "\n";

    Vector<char> d(5);
    d[0] = 'a';
    d[1] = 'b';

    std::cout << "Vector d[0] = " << d[0] << " | d[1] = " << d[1] << "\n";
};
