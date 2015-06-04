#include <stdio.h>

void say_hello (char* name) {
    printf("Hello, %s.\n", name);
}

int main () {
    char* name = "Deividy";

    say_hello(name);
    printf("May the force be with you.\n");
}
