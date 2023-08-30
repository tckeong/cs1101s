/*
function my_sum(n) {
    return n === 1
           ? 2
           : n * (n + 1) + solution(n - 1);
}


function my_sum(n) {
    return n === 1
           ? n * (n + 1)
           : n * (n + 1) + solution(n - 1);
}
*/

function sum(term, a, next, b) {
    return (a > b) ? 0
                   : term(a) + sum(term, next(a), next, b);
}

function my_sum(n) { 
    return sum(x => x * (x + 1), 1, x => x + 1, n); 
}


my_sum(10);