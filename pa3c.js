const EQUAL = (x, y) => x === y;

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

function left_branch(T) {
    return list_ref(T, 1);
}

function right_branch(T) {
    return list_ref(T, 2);
}


function flatten_bin_tree(T) {

    // WRITE YOUR SOLUTION HERE.
    if(is_null(T)) {
        return null;
    } else {
        let result = append(flatten_bin_tree(left_branch(T)), append(list(head(T)), flatten_bin_tree(right_branch(T))));
        return result;
    }
}

function bin_tree_to_BST(T) {

    // WRITE YOUR SOLUTION HERE.
    const lst = flatten_bin_tree(T);
    let sorted_lst = reverse(insertion_sort(lst));
    
    function helper(xs) {
        if(is_null(xs)) {
            return null;
        } else if(is_number(xs)) {
            const temp = head(sorted_lst);
            sorted_lst = tail(sorted_lst);
            return temp;
        } else {
            const right_tree = helper(right_branch(xs));
            const cur_node = head(sorted_lst);
            sorted_lst = tail(sorted_lst);
            const left_tree = helper(left_branch(xs));
            return list(cur_node, left_tree, right_tree);
        }
    }
    
    return display_list(helper(T));
}

const btreeA = list(2, list(5, null, null), list(3, null, null));
EQUAL( bin_tree_to_BST(btreeA),
list(3, list(2, null, null), list(5, null, null)) );