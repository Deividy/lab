#include <string>

using namespace std;

namespace wizard {
    struct Power {
        int id;
        double power;
        string name;
    };

    class Wizard {
        public:
            Wizard(string m_name);
            string name ();
            void setPower (Power m_power);
        private:
            string m_name;
            Power m_power;
    };
};
