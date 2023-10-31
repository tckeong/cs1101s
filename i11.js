function stream_pairs(s) {
    return is_null(s)
        ? null
        : stream_append(
            stream_map(
                sn => pair(head(s), sn),
                stream_tail(s)),
        stream_pairs(stream_tail(s)));
}

function add_stream(s1, s2) {
    if(is_null(stream_tail(s1)) || is_null(stream_tail(s2))) {
        return null;
    }
    return pair(head(s1) + head(s2), () => add_stream(stream_tail(s1), stream_tail(s2)));
}

const ones = pair(1, () => ones);
const ints = pair(1, () => add_stream(ints, ones));
const a = stream_pairs(ints);

function stream_append_pickle(xs, ys) {
    return is_null(xs)
        ? ys()
        : pair(head(xs),
            () => stream_append_pickle(stream_tail(ys),
                    xs));
}

function stream_pairs2(s) {
    return is_null(s)
        ? null
        : stream_append_pickle(
            stream_map(
                sn => pair(head(s), sn),
                stream_tail(s)),
            () => stream_pairs2(stream_tail(s)));
}

for(let i = 0; i < 10; i = i + 1) {
    display(stream_ref(a, i));
}
