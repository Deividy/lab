rm -rf bin/tmp

gcc -g -Wall -I/Users/deividy/dev/personal/lib/libuv/include/ \
    -framework CoreServices -o bin/tmp $1 \
    -framework CoreFoundation \
    ~/dev/personal/lib/libuv/.libs/libuv.a -v

rm -rf bin/tmp.dSYM
