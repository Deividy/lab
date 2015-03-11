#include <iostream>

template<typename T>
class Vector {
    private:
        T* elem;
        int sz;

    public:
        Vector(int s);
        ~Vector() { delete[] elem; }

        T& operator[](int i);
        const T& operator[](int i) const;
        int size() const { return sz; }
};

template<typename T>
Vector<T>::Vector(int s) {
    if (s < 0) {
        throw "Negative size";
    }

    elem = new T[s];
    sz = s;
}

template<typename T>
const T& Vector<T>::operator[](int i) const {
    if (i < 0 || size() <= i) {
        throw "Out of range Vector::operator[]";
    }

    return elem[i];
}

int main () {
    Vector<double> v(5);
};



