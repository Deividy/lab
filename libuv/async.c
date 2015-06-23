#include <uv.h>
#include <stdio.h>

void tortoise (void *arg) {
    int tracklen = *((int *) arg);

    while (tracklen) {
        tracklen--;
        //sleep(1);
        printf("Tortoise ran another step\n");
    }

    printf("Tortoise done running!\n");
}

void hare (void *arg) {
    int tracklen = *((int *) arg);

    while (tracklen) {
        tracklen--;
        //sleep(1);
        printf("Hare ran another step\n");
    }

    printf("Hare done running!\n");
}

int main() {
    int tracklen = 1;

    uv_thread_t hare_id;
    uv_thread_t tortoise_id;
    uv_thread_create(&hare_id, hare, &tracklen);
    uv_thread_create(&tortoise_id, tortoise, &tracklen);

    uv_thread_join(&hare_id);
    uv_thread_join(&tortoise_id);

    printf("\nHey man\n");

    return 0;
}
