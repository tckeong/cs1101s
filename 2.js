function stream_map_optimized(f, s) {
    if (is_null(s)) {
        return null;
    } else {
        
    }
    return is_null(s)
        ? null
        : pair(f(head(s)),
            memo_fun( () => stream_map_optimized(
            f, stream_tail(s)) ));
}

function memo_fun(f) {
    let result = undefined;
    return () => {
        if(result !== undefined) {
            return result;
        } else {
            result = f();
            return result;
        }
    };
}

const x = stream_map_optimized(display, enum_stream(0, 10));
stream_ref(x, 3);
stream_ref(x, 5);