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

        void insert(T value);
};
