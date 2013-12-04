function extend(object, properties) {
    for (var prop in properties) {
        object[prop] = properties[prop];
    }
    return object;
}

function merge(object, properties) {
    for (var prop in properties) {
        if (object.hasOwnProperty[prop]) {
            continue;
        }
        object[prop] = properties[prop];
    }
}

function restrict(object, properties) {
    for (var prop in object) {
        if (!(prop in properties)) {
            delete object[prop];
        }
    }
}

function subtract(object, properties) {
    for (var prop in properties) {
        delete object[prop];
    }
}

function union(object, properties) {
    return extend(extend({ }, object), properties);
}

function intersection(object, properties) {
    return restrict(extend({ }, object), properties);
}

function keys(object) {
    if (typeof object !== "object") {
        throw TypeError();
    }
    var result = [ ];
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            result.push(prop);
        }
    }
    return result;
}

