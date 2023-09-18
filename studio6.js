function my_map(f, xs) {
    return accumulate((x,y) => append(list(f(x)), y), null, xs);
}

/*
function remove_duplicates(lst) {
    
    function helper();
    
    return filter(helper, lst);
}
*/

// my_map(x => x * 2, list(1,2,3));
// remove_duplicates(list(1, 2, 3, 4, 4, 3, 2, 1, 2));
