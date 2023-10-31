function add_stream(s1, s2) {
    if(is_null(stream_tail(s1)) || is_null(stream_tail(s2))) {
        return null;
    } else {
        return pair(head(s1) + head(s2), () => add_stream(stream_tail(s1), stream_tail(s2)));
    }
}

const alt_ones = pair(1, () => pair(-1 * head(alt_ones), () => alt_ones));
const zeros = add_stream(alt_ones, stream_tail(alt_ones));

for(let i = 0; i < 10; i = i + 1) {
    display(stream_ref(alt_ones, i));
}