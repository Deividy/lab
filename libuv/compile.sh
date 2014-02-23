gcc -g -Wall -I../../lib/libuv/include -framework CoreServices -o bin/$1 $1.c ../../lib/libuv/libuv.a -v
rm -rf bin/$1.dSYM
