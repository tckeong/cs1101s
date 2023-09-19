/*
function my_map(f, xs) {
    return accumulate((x,y) => pair(f(x), y), null, xs);
}

function my_filter(pred, xs) {
    return accumulate((x, y) => pred(x) ? pair(x, y) : y, null, xs);
}

my_map(x => x + 2, list(4,2,3,4));
display_list(my_filter(x => x % 2 === 0, list(1,2,4,5,6)));
*/
/*
function remove_duplicates(lst) {
    
    function helper(xs) {
        if(is_null(xs)) {
            return null;
        } else {
            return append(helper_2(head(xs), tail(xs)), helper(tail(xs)));
        }
    }
    
    function helper_2(n, xs) {
        if(is_null(xs)) {
            return list(n);
        } else if (n === head(xs)) {
            return null;
        } else {
            return helper_2(n, tail(xs));
        }
    }
    
    return helper(lst);
}
*/

function remove_duplicates(lst) {
    return is_null(lst)
           ? null
           : pair(head(lst), 
                  remove_duplicates(filter(x => x !== head(lst), tail(lst))));
}

// my_map(x => x * 2, list(1,2,3));
remove_duplicates(list(1, 2, 3, 4, 4, 3, 2, 1, 2));

/*
function makeup_amount(x, coins) {
    if (x === 0) {
        return list(null);
    } else if (x < 0 || is_null(coins)) {
        return null;
    } else {
        // Combinations that do not use the head coin.
        const combi_A = makeup_amount(x, tail(coins));

        // Combinations that do not use the head coin 
        // for the remaining amount.
        // it is a list(list(...), list(...))
        const combi_B = map(xs => append(head(coins), xs), 
                            makeup_amount(x - head(coins), tail(coins)));

        // Combinations that use the head coin.
        const combi_C = map(xs => append(head(coins), xs), 
                            makeup_amount(x - head(coins), coins));

        return append(combi_A, combi_C);
    }
}

makeup_amount(22, list(1, 10, 5, 20, 1, 5, 1, 50));
// Result: list(list(20, 1, 1), list(10, 5, 1, 5, 1), list(1, 20, 1),
//              list(1, 20, 1), list(1, 10, 5, 5, 1), 
//              list(1, 10, 5, 1, 5))
*/
