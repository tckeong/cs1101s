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

function sum(term, a, next, b) {
    return (a > b) 
            ? 0
            : term(a) + sum(term, next(a), next, b);
}
*/

function sum(term, a, next, b, result) {
    return a > b
           ? result
           : sum(term, next(a), next, b, term(a) + result);
}

function my_sum(n) { 
    return sum(x => x * (x + 1), 1, x => x + 1, n, 0); 
}


my_sum(10);