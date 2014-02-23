#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <uv.h>

void onRead();

uv_fs_t open_req;
uv_fs_t read_req;
uv_fs_t write_req;

char buffer[1024];

void onWrite (uv_fs_t *req) {
    uv_fs_req_cleanup(req);

    if (req->result < 0) {
        fprintf(stderr, "ERROR Write: %s\n", uv_strerror(uv_last_error(uv_default_loop())));
    } else {
        uv_fs_read(uv_default_loop(), &read_req, open_req.result, buffer, sizeof(buffer), -1, onRead);
    }
}

void onRead (uv_fs_t *req) {
    uv_fs_req_cleanup(req);
    if (req->result < 0) {
        fprintf(stderr, "ERROR Read: %s\n", uv_strerror(uv_last_error(uv_default_loop())));
    } else if (req->result == 0) {
        uv_fs_t close_req;

        uv_fs_close(uv_default_loop(), &close_req, open_req.result, NULL);
    } else {
        uv_fs_write(uv_default_loop(), &write_req, 1, buffer, req->result, -1, onWrite);
    }
}

void onOpen (uv_fs_t *req) {
    if (req->result != -1) {
        uv_fs_read(uv_default_loop(), &read_req, req->result, buffer, sizeof(buffer), -1, onRead);
    } else {
        fprintf(stderr, "ERROR Opening: %d\n", req->errorno);
    }

    uv_fs_req_cleanup(req);
}

int main(int argc, char **argv) {
    uv_fs_open(uv_default_loop(), &open_req, argv[1], O_RDONLY, 0, onOpen);
    uv_run(uv_default_loop(), UV_RUN_DEFAULT);
    return 0;
}
