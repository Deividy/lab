using namespace std;
using namespace calculator;

void Token_stream::set_input(istream& s) {
    close();
    ip = &s;
    owns = false;
}

void Token_stream::set_input(istream* p) {
    close();
    ip = p;
    owns = true;
}

double Token_stream::error(const string& s) {
    no_of_errors++;
    cerr << "error: " << s << '\n';
    return 1;
}

Token Token_stream::get() {
    char ch;

    do {
        if (!ip->get(ch)) {
            return ct = { Kind::end };
        }
    } while (ch != '\n' && isspace(ch));

    switch (ch) {
        case 0:
            return ct = { Kind::end };

        case ';':
        case '\n':
            return ct = { Kind::print };

        case '*':
        case '/':
        case '+':
        case '-':
        case '(':
        case ')':
        case '=':
            return ct = { static_cast<Kind>(ch) };

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            ip->putback(ch);
            *ip >> ct.number_value;
            ct.kind = Kind::number;
            return ct;

        default:
            if (!isalpha(ch)) {
                error("bad token");
                cout << ch << '\n';
                return ct = { Kind::print };
            }


            ct.string_value = ch;
            while (ip->get(ch)) {
                if (isalnum(ch)) {
                    ct.string_value += ch;
                } else {
                    ip->putback(ch);
                    break;
                }
            }

            ct.kind = Kind::name;
            return ct;
    }

}
