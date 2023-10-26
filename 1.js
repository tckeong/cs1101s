function add_streams(s1, s2) {
    return is_null(s1)
        ? s2
        : is_null(s2)
            ? s1
            : pair(head(s1) + head(s2),
                () => add_streams(stream_tail(s1),
                    stream_tail(s2)));
}

// function partial_sum(s) {
//     return pair(head(s), () => add_streams(partial_sum(s), stream_tail(s)));
// }

function partial_sum(s) {
    function helper(sum, xs) {
        sum = sum + head(xs);
        return () => pair(sum, helper(sum, stream_tail(xs)));
    }
    
    return pair(head(s), helper(head(s), stream_tail(s)));
}
                
                
const x = partial_sum(enum_stream(1, 100));

for(let i = 0; i < 10; i = i + 1) {
    display(stream_ref(x, i));
}