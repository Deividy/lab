#include <iostream>

using namespace std;

void task (int* p1, int *p2, int &r1, int& r2) {
    cout << p1 << "\n";
    cout << &p1 << "\n";
    cout << *p1 << "\n";

    cout << p2 << "\n";
    cout << &p2 << "\n";
    cout << *p2 << "\n";

    cout << r1 << "\n";
    cout << &r1 << "\n";

    cout << r2 << "\n";
    cout << &r2 << "\n";

    p1++;
    p2++;
    r1 = 30;
    r2 = 40;
    r1++;
    r2++;

    cout << "\nAfter \n\n";

    cout << p1 << "\n";
    cout << &p1 << "\n";
    cout << *p1 << "\n";

    cout << p2 << "\n";
    cout << &p2 << "\n";
    cout << *p2 << "\n";

    cout << r1 << "\n";
    cout << &r1 << "\n";

    cout << r2 << "\n";
    cout << &r2 << "\n";

    cout << "\nis out \n\n";
};

int main () {
    int* x = new int {50};
    int &y = *x;
    int &z = *(new int {50});
    int* x2 = new int{5};
    int &y2 = *x2;

    cout << "Starting \n\n";

    cout << x << "\n";
    cout << &x << "\n";
    cout << *x << "\n";

    cout << x2 << "\n";
    cout << &x2 << "\n";
    cout << *x2 << "\n";

    cout << y << "\n";
    cout << y << "\n";

    cout << y2 << "\n";
    cout << &y2 << "\n";

    cout << "\n --- \n";

    task(x, x2, y, y2);

    cout << x << "\n";
    cout << &x << "\n";
    cout << *x << "\n";

    cout << x2 << "\n";
    cout << &x2 << "\n";
    cout << *x2 << "\n";

    cout << y << "\n";
    cout << y << "\n";

    cout << y2 << "\n";
    cout << &y2 << "\n";


};
