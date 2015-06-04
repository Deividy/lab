#include <stdio.h>

void swap (int *a, int *b) {
    int temp = *a;

    *a = *b;
    *b = temp;
}

int main () {
    char d = 'd';
    char* c = &d;

    printf("%c\n", d);
    printf("%c\n", *c);

    d = 'e';

    printf("%c\n", d);
    printf("%c\n", *c);

    int x = 1;
    int y = 2;
    int z[10];

    int *ip;
    int *ip2;

    printf("%d\n", *ip);

    ip = &x;
    printf("%d\n", *ip);

    ip2 = ip;
    printf("%d\n", *ip2);

    y = *ip;

    *ip = 0;

    printf("%d\n", *ip);
    ip = &z[0];

    printf("%d\n", *ip);


    int a = 5;
    int b = 10;

    swap(&a, &b);

    printf("%d\n", a);
    printf("%d\n", b);
}
