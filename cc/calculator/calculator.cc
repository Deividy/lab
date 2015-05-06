#include "calculator.h"
#include "token.cc"

using namespace std;
using namespace calculator;

double Calculator::error(const string& s) {
    no_of_errors++;
    cerr << "error: " << s << '\n';
    return 1;
}

double Calculator::prim (bool get) {
    if (get) ts->get();

    switch (ts->current().kind) {
        case Kind::number: { // necessary, variable declaration
            double v = ts->current().number_value;
            ts->get();

            return v;
        }

        case Kind::name: {
            double& v = table[ts->current().string_value];
            if (ts->get().kind == Kind::assign) {
                v = expr(true);
            }

            return v;
        }


        case Kind::minus:
            return -prim(true);

        case Kind::lp: {
            auto e = expr(true);

            if (ts->current().kind != Kind::rp) {
                return error("')' expected");
            }

            ts->get();

            return e;
        }

        default:
            return error("primary expected");
    }
}        

double Calculator::term (bool get) {
    double left = prim(get);

    while (true) {
        switch (ts->current().kind) {
            case Kind::mul:
                left *= prim(true);
                break;

            case Kind::div:
                if (auto d = prim(true)) {
                    left /= d;
                    break;
                }

                return error("divide by 0");

            default:
                return left;
        }
    }
}

double Calculator::expr (bool get) {
    double left = term(get);

    while (true) {
        switch (ts->current().kind) {
            case Kind::plus:
                left += term(true);
                break;

            case Kind::minus:
                left -= term(true);
                break;

            default:
                return left;
        
        }
    }
}

void Calculator::calculate () {
    while (true) {
        ts->get();

        if (ts->current().kind == Kind::end) {
            break;
        }

        if (ts->current().kind == Kind::print) {
            continue;
        }

        cout << expr(false) << '\n';
    }
}
