function my_sum(n) {
    return n === 1
           ? 2
           : n * (n + 1) + solution(n - 1);
}

/*
function my_sum(n) {
    return n === 1
           ? n * (n + 1)
           : n * (n + 1) + solution(n - 1);
}
*/

solution(11);