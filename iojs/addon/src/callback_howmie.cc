#include <node.h>
#include <pthread.h>
#include <uv.h>

// this thing needs to be in background thread!
// http://bravenewmethod.wordpress.com/2011/03/30/callbacks-from-threaded-node-js-c-extension/
// https://gist.github.com/dmh2000/9519489
// http://docs.libuv.org/en/latest/threadpool.html
// http://blog.trevnorris.com/2013/07/node-with-threads.html
// http://stackoverflow.com/questions/11390689/node-js-c-addon-multiple-callbacks-from-different-thread
// http://nikhilm.github.io/uvbook/threads.html

namespace howmie {
    using v8::Function;
    using v8::FunctionCallbackInfo;
    using v8::HandleScope;
    using v8::Isolate;
    using v8::Local;
    using v8::Null;
    using v8::Object;
    using v8::String;
    using v8::Value;
    using v8::Handle;
    using v8::Locker;
    using v8::Context;

    void run_callback_async(Isolate* isolate, Local<Function>& callback) {
        //Isolate* isolate = Isolate::New();
        //Locker lock(isolate);
        //HandleScope scope(isolate);

        const unsigned argc = 1;
        Local<Value> argv[argc] = { String::NewFromUtf8(isolate, "whatsup howmie?") };

        callback->Call(Null(isolate), argc, argv);
    }

    void run_callback(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Local<Function> callback = Local<Function>::Cast(args[0]);

        run_callback_async(isolate, callback);
    }

    void init(Local<Object> exports, Local<Object> module) {
        NODE_SET_METHOD(module, "exports", run_callback);
    }

    NODE_MODULE(callback_howmie, init)
}
