#include <iostream>
#include "calculator.cc"

using namespace calculator;

int main () {
    Token_stream ts  { cin };
    Calculator c { ts };

    c.table["pi"] = 3.1415926535897932385;
    c.table["e"] = 2.7182818284590452354; 

    c.calculate();

    return ts.no_of_errors + c.no_of_errors;
};
