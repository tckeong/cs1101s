function bubblesort_list(L) {
    // Your solution here.
    let n = length(L);
    
    for(let i = 0; i < n - 1; i = i + 1) {
        for (let j = L; !is_null(tail(j)); j = tail(j)) {
            if (head(j) > head(tail(j))) {
                let temp = head(j);
                set_head(j, head(tail(j)));
                set_head(tail(j), temp);
            }
        }
    }
}

const LL = list(3, 5, 2, 4, 1);
bubblesort_list(LL);
LL; // should show [1, [2, [3, [4, [5, null]]]]]
