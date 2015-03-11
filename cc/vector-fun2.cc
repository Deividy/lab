#include <iostream>

class Vector {
    private:
        double* elem;
        int sz;

    public:
        Vector(int s);
        ~Vector() { delete[] elem; }

        // copy constructor
        Vector(const Vector& a);

        // copy assignment
        Vector& operator=(const Vector& a);

        // move constructor
        Vector(Vector&& a);

        // move assignment
        // && means rvalue reference. The word rvalue is intended to complement
        // '1value', which roughly means 'something that can appear on the
        // left-hand side of an assignment'
        Vector& operator=(Vector&& a);

        double& operator[](int i);
        const double& operator[](int i) const;

        int size() const;
};


// default constructor
Vector::Vector(int s) : elem{new double[s]}, sz{s} {}

// operator []
double& Vector::operator[] (int i) { return elem[i]; }

// copy constructor
Vector::Vector(const Vector& a) : elem{new double[a.sz]}, sz{a.sz} {
    for (int i = 0; i != sz; ++i) {
        elem[i] = a.elem[i];
    }
}

// copy assignment
Vector& Vector::operator=(const Vector& a) {
    double* p = new double[a.sz];
    for (int i = 0; i != a.sz; ++i) {
        p[i] = a.elem[i];
    }

    // delete old elements
    delete[] elem;

    elem = p;
    sz = a.sz;

    return *this;
}

// move constructor
Vector::Vector(Vector&& a) : elem{a.elem}, sz{a.sz} {
    a.elem = nullptr;
    a.sz = 0;
}

int main () {
    Vector a(5);
    a[0] = 1;
    a[1] = 5;

    Vector b(a);

    Vector c = b;

    a[0] = 2;
    a[1] = 3;

    std::cout << "Vector a[0] = " << a[0] << "\n";
    std::cout << "Vector b[0] = " << b[0] << "\n";
    std::cout << "Vector c[0] = " << c[0] << "\n";

    std::cout << "Vector a[1] = " << a[1] << "\n";
    std::cout << "Vector b[1] = " << b[1] << "\n";
    std::cout << "Vector c[1] = " << c[1] << "\n";

};
