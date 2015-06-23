#include <iostream>
#include <vector>

using namespace std;

int main () {
    char val { 'a' };
    char* a = &val;
    char* b = &val;

    cout << "Var b value - a value:\n";
    cout << *b << " - " << a << "\n\n";

    cout << "changing val = 'b':\n";
    val = 'b';

    cout << "Var b value - a value:\n";
    cout << *b << " - " << a << "\n\n";

    cout << "b address:\n";
    cout << &b << "\n";

    cout << "a address:\n";
    cout << &a << "\n\n";

    cout << "b first element address:\n";
    cout << (void *) &b[0] << "\n";

    cout << "a first element address:\n";
    cout << (void *) &a[0] << "\n\n";

    cout << "---\n";

    char* c = new char('a');
    char &d = *c;

    cout << *c << " - " << d << "\n";

    *c = 'd';
    cout << *c << " - " << d << "\n";

    d = 'b';
    cout << *c << " - " << d << "\n";

    cout << "\n\n";

    char* arr = new char[3] { 'a', 'b', 'c' };

    cout << arr[0] << " " << arr[1] << " " << arr[2] << "\n";

    char &arrR = *arr;

    arrR = 'o';

    cout << arr[0] << " " << arr[1] << " " << arr[2] << "\n";
    cout << arrR << "\n";

    cout << "\n";

    arr[0] = 'f';

    cout << arrR << "\n";
    cout << &arrR << "\n";
    cout << arr[0] << " " << arr[1] << " " << arr[2] << "\n";

    cout << "\n";

    arr[1] = 'N';

    cout << arrR << "\n";
    cout << &arrR << "\n";
    cout << arr[0] << " " << arr[1] << " " << arr[2] << "\n";


    const char ca = 'a';
    const char* p1 = &ca;
    const char* p2 = &ca;

    const char cb = 'b';
    const char* p3 = &cb;
    const char* p4 = new char (cb);

    cout << "\n";

    cout << &p1 << "\n";
    cout << &p2 << "\n";
    cout << &p3 << "\n";
    cout << &p4<< "\n";

    cout << "\n";

    cout << p1 << "\n";
    cout << p2 << "\n";
    cout << p3 << "\n";
    cout << p4 << "\n";

    cout << "\n\n";

    vector<int> v { 1, 5, 6 };
    vector<int> *p = &v;

    p->push_back(2);
    v.push_back(3);

    for (auto val : v) {
        cout << val << "\n";
    }

    cout << "\nPointer \n";

    for (auto &val : *p) {
        cout << val << "\n";
    }
};
