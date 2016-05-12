#include <stdio.h>
#include <uv.h>

int count = 1;

void done () {
    printf("\nIts done baby\n\n");
}

void done_2 () {
    printf("\n2 its done\n\n");
}


void callback_2 (uv_timer_t* timer) {
    printf("!! 2 callback! %d \n", count);

    if (count > 10) {
        uv_timer_stop(timer);
        done_2();
    }

    count++;
}

void callback (uv_timer_t* timer) {
    printf("Callbacks! %d \n", count);

    if (count > 10) {
        uv_timer_stop(timer);
        done();
    }

    count++;
}

uv_loop_t *loop;

int main () {
    loop = uv_default_loop();

    uv_timer_t timer;
    uv_timer_init(loop, &timer);
    uv_timer_start(&timer, callback, 100, 500);

    uv_timer_t timer_2;
    uv_timer_init(loop, &timer_2);

    uv_timer_start(&timer_2, callback_2, 100, 500);

    uv_run(loop, UV_RUN_DEFAULT);

    uv_loop_close(loop);

    return 0;
}


