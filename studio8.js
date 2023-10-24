/*
function d_filter_1(pred, xs) {
    for(let i = xs; !is_null(i); i = tail(i)) {
        if(pred(head(i))) {
            set_tail(xs, i);
            xs = tail(xs);
        }
    }
}
*/

function d_filter_2(pred, xs) {
    if(is_null(xs)) {
        return null;
    } else {
        if(pred(head(xs))) {
            set_tail(xs, d_filter_2(pred, tail(xs)));
            return xs;
        } else {
            if(is_null(tail(xs))) {
                return null;
            }
            set_head(xs, head(tail(xs)));
            set_tail(xs, tail(tail(xs)));
            return d_filter_2(pred, xs);
        }
    }
}

const L = list(1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 15);
d_filter_2(x => x % 2 === 0, L); // returns [2, [4, [6, [8, null]]]]
display_list(L); // What is L now?
L;