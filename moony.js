import {ribbon, circle, beside, blank, stack, square, show, beside_frac,
    stack_frac} from "rune";
/*
function moony_1(rune) {
    return beside(stack(circle, square), stack(blank, rune));
}

function moony_2(n) {
    return n === 1
           ? circle
           : moony_1(moony_2(n - 1));
}

function moony(n) {
    return n === 1
           ? circle
           : beside_frac(1 / n, 
           stack_frac(1 / n, circle, square), 
           stack_frac(1 / n, blank, moony(n - 1)));
}
*/

function moony_1(rune, n) {
    return beside_frac(1 / n, 
    stack_frac(1 / n, circle, square),
    stack_frac(1 / n, blank, rune));
}

function moony_2(n) {
    return n === 1
           ? circle
           : moony_1(moony_2(n - 1), 2);
}

function moony(n) {
    return n === 1
           ? circle
           : moony_1(moony(n - 1), n);
}

show(moony(5));