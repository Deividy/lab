gcc -g -Wall -I../../lib/libuv/include -framework CoreServices -o $1 $2 ../../lib/libuv/libuv.a -v
rm -rf $1.dSYM
