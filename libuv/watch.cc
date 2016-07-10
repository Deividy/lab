#include <stdio.h>
#include <uv.h>

int main() {
    uv_loop_t *loop = uv_loop_new();

    printf("Hello, this one day will watch something.. :P\n");
    uv_run(loop, UV_RUN_DEFAULT);

    return 0;
}
