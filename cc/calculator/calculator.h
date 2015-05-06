#include <string>
#include <map>

using namespace std;

namespace calculator {
    enum class Kind : char {
        name,
        number,
        end,
        plus = '+',
        minus = '-',
        mul = '*',
        div = '/',
        print = ';',
        assign = '=',
        lp = '(',
        rp = ')'
    };

    struct Token {
        Kind kind;
        string string_value;
        double number_value;
    };   

    class Token_stream {
        public:
            Token_stream(istream& s) : ip{&s}, owns{false} {}
            Token_stream(istream* p) : ip{p}, owns{true} {}

            ~Token_stream() { close(); }

            Token get();
            const Token& current() { return ct; }

            void set_input(istream& s);
            void set_input(istream* p);
            
            int no_of_errors;

        private:
            void close() {
                if (owns) {
                    delete ip;
                }
            }

            istream* ip;
            bool owns;
            Token ct { Kind::end };

            double error(const string& s);
    };


    class Calculator {
        public:
            Calculator(Token_stream& ts) : ts{&ts} {}

            void calculate ();

            map<string, double> table;

            int no_of_errors;

        private:
            double expr (bool);
            double term (bool);
            double prim (bool);

            double error(const string& s);

            Token_stream* ts;
    };
}
