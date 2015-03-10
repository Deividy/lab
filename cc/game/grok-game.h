#include <string>
#include <vector>

namespace grok {
    struct Spell {
        double power;
        std::string name;
    };

    struct Skill {
        double power;
        std::string name;
    };

    class Weapon {
        public:
            virtual double power() = 0;
            virtual ~Weapon () {}
    };

    class Human {
        public:
            virtual ~Human() {}
            virtual std::string name() = 0;
    };
}
