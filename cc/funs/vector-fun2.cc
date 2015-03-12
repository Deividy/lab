#include <iostream>

template<typename T>
class Vector {
    private:
        T* elem;
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

        T& operator[](int i);
        const T& operator[](int i) const;

        int size() const;
};


// default constructor
template<typename T>
Vector<T>::Vector(int s) : elem{new T[s]}, sz{s} {}

// operator []
template<typename T>
T& Vector<T>::operator[] (int i) { return elem[i]; }

// copy constructor
template<typename T>
Vector<T>::Vector(const Vector& a) : elem{new T[a.sz]}, sz{a.sz} {
    for (int i = 0; i != sz; ++i) {
        elem[i] = a.elem[i];
    }
}

// copy assignment
template<typename T>
Vector<T>& Vector<T>::operator=(const Vector& a) {
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
template<typename T>
Vector<T>::Vector(Vector&& a) : elem{a.elem}, sz{a.sz} {
    a.elem = nullptr;
    a.sz = 0;
}

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
