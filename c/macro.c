#include <stdio.h>

#define forever for (;;)

#if 1 == 1
    #define MAX_LOOP 10
#endif

#define is_max(N) (N) == MAX_LOOP ? 1 : 0

int main () {
    short n = 0;
    forever {
        printf("%d\n", ++n);
        if (is_max(n)) {
            break;
        }
    }
}
