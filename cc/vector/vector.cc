#include "vector.h"

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

template<typename T>
void Vector<T>::push_back (T value) {
    elem[sz] = value;
    sz++;
};
