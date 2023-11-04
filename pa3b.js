const EQUAL = (x, y) => x === y;

function make_tree(num, left, right) {
    return list(num, left, right);
}

function insert(x, xs) {
    return is_null(xs)
           ? list(x)
           : x <= head(xs)
           ? pair(x, xs)
           : pair(head(xs), insert(x, tail(xs)));
}

function insertion_sort(xs) {
    return is_null(xs)
           ? xs
           : insert(head(xs), insertion_sort(tail(xs)));
}

function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}

function make_balanced_BST(L) {

    // WRITE YOUR SOLUTION HERE.
    if(length(L) === 1) {
        return make_tree(head(L), null, null);
    }
    
    L = insertion_sort(L);
    const array = list_to_array(L);
    const len = array_length(array);
    
    function helper(start, end) {
        display(end, stringify(start));
        if(start >= end) {
            if(start === end) {
                if(start >= len) {
                    return null;
                }
                return list(array[start], null, null);
            }
            return null;
        } else {
            const mid = math_ceil((start + end) / 2);
            if(mid >= len) {
                return make_tree(array[len - 1], null, null);
            }
            display(stringify(array[mid]), "array: ");
            return list(array[mid], helper(start, mid - 1), helper(mid + 1, end));
        }
    }
    
    return display_list(helper(0, len));
}