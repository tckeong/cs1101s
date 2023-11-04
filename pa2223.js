// Write a function insert_subseq that takes as arguments a list L ,
// a non-negative integer pos , and another list S ,
// and returns a list that is the result of inserting S at position (or index) pos of L .
// Note that the value of pos ranges from 0 to length(L) .
// Your function must not modify the input lists L and S . It must not make use of
// the set_head and set_tail functions.


// function insert_subseq(L, pos, S) {
//     return pos === 0
//           ? append(S, L)
//           : pair(head(L), insert_subseq(tail(L), pos - 1, S));
// }

// Write a function remove_subseq that takes as arguments a non-empty list L , 
// two non-negative
// integers start_pos and end_pos , and returns a list that is the result
// of removing from L all elements at positions
// from start_pos to end_pos .
// Note that the values of start_pos and end_pos range from 0 to length(L) - 1 ,
// and start_pos ≤ end_pos .
// Your function must not modify the input list L . It must not make use of 
// the set_head and set_tail functions.

// function remove_subseq(L, start_pos, end_pos) {
//     return start_pos === 0
//           ? end_pos === -1
//                 ? L
//                 : remove_subseq(tail(L), start_pos, end_pos - 1)
//           : pair(head(L), remove_subseq(tail(L), start_pos - 1, end_pos - 1));
// }

// Write a function is_prefix_of that takes as
// arguments two lists of single-character
// strings, subseq and seq , and returns true if and
// only if subseq is a prefix of seq , which is true
// if subseq occurs at the very beginning of seq . Note
// that the input seq may be shorter than subseq , and
// any of them may be an empty list.
// Your function must not modify the input
// lists subseq and seq . It must not make use of
// the set_head and set_tail functions.

// function is_prefix_of(subseq, seq) {
//     if(is_null(subseq)) {
//         return true;
//     } else if(is_null(seq)) {
//         return false;
//     }
    
//     return head(seq) === head(subseq) && is_prefix_of(tail(subseq), tail(seq));
// }

// Given a sequence S of alphabet letters, we want to search in S for 
// all occurrences of a given subsequence U and
// replace all of them by another subsequence V. Each occurrence of U 
// in S must always match the left-most occurrence
// without overlapping the earlier occurrences. For example, 
// if S = x, x, a, b, a, b, a, b, a, y, y and U = a, b, a ,
// then the occurrences are those enclosed in parentheses in 
// x, x, (a, b, a), b, (a, b, a), y, y . If V = o, p , then
// the resulting sequence is x, x, o, p, b, o, p, y, y . Note that 
// U and V may have different length, and each has
// length of at least 1.
// In this task, we are going to represent each sequence or 
// subsequence as a list of single-character string. For example,
// the sequence/subsequence a, b, c is represented as list("a", "b", "c") .
// Write a function subseq_replace that takes as arguments three sequences, 
// new_sub , old_sub and seq , and returns
// a new sequence by replacing all occurrences of old_sub in seq by new_sub . The length
// of new_sub and old_sub are at least 1, and seq may be an empty list.
// Note that all the input lists must not be modified by your function. 
// It must not make use of
// the set_head and set_tail functions.
// The correctly-implemented is_prefix_of function for the preceding 
// task has been pre-declared here for you to use
// in this task.
// You may find the following tail_n_times function helpful:

// function tail_n_times(xs, n) {
//     return is_null(xs)
//         ? null
//         : n <= 0
//         ? xs
//         : tail_n_times(tail(xs), n - 1);
// }

// function is_prefix_of(subseq, seq) {
//     if(is_null(subseq)) {
//         return true;
//     } else if(is_null(seq)) {
//         return false;
//     }
    
//     return head(seq) === head(subseq) && is_prefix_of(tail(subseq), tail(seq));
// }


// function subseq_replace(new_sub, old_sub, seq) {
//     return is_prefix_of(old_sub, seq)
//           ? append(new_sub, subseq_replace(new_sub, old_sub, tail_n_times(seq, length(old_sub))))
//           : is_null(seq)
//           ? null
//           : pair(head(seq), subseq_replace(new_sub, old_sub, tail(seq)));
// }

// A numbers-in-front tree (NiFT) is a tree of numbers where in every list of 
// the tree, all the number elements come
// before all the elements that are trees. The following are some example NiFTs:
// Write a function make_NiFT that takes as argument a tree of numbers, T , 
// and returns a NiFT S of T , where S has
// all the elements of T , and in every list of S , all the number elements 
// come before all the elements that are trees.
// The relative positions of the number elements in each list of S must 
// be maintained as in T , and the same applies to
// the elements that are trees in each list of S .
// Your function must not modify the input tree T . It must not 
// make use of the set_head and set_tail functions.
// function make_NiFT(T) {
//     function helper(temp) {
//         if(is_null(T)) {
//             return reverse(temp);
//         } else {
//             const node = head(T);
//             T = tail(T);
//             return is_number(node)
//                   ? pair(node, helper(temp))
//                   : helper(pair(make_NiFT(node), temp));
//         }
//     }
    
//     return helper(null);
// }

// A sorted tree of numbers (SToN) is either null or a pair 
// whose head is a number or a SToN, and whose tail is a SToN,
// such that all number elements from the head are smaller 
// than or equal to all number elements from the tail. For
// example, the following is a SToN:
// Write a function make_SToN that takes as argument a tree of 
// numbers, T , and returns a SToN S , where S has all
// the elements of T , and it has the same structure or "shape" as T . For example,

// function insertion_sort(x, xs) {
//     if(is_null(xs)) {
//         return pair(x, null);
//     } else {
//         if(x < head(xs)) {
//             return pair(x, xs);
//         } else {
//             return pair(head(xs), insertion_sort(x, tail(xs)));
//         }
//     }
// }

// function insert(x, xs) {
//     return is_null(xs)
//         ? list(x)
//         : x <= head(xs)
//         ? pair(x, xs)
//         : pair(head(xs), insert(x, tail(xs)));
// }

// function insertion_sort(xs) {
//     return is_null(xs)
//         ? xs
//         : insert(head(xs), insertion_sort(tail(xs)));
// }

// function map_tree(fun, tree) {
//     return map(sub_tree =>
//             !is_list(sub_tree)
//             ? fun(sub_tree)
//             : map_tree(fun, sub_tree),
//         tree);
// }

// function make_SToN(T) {
//     let array = null;
//     let i = 0;
    
//     function helper1(t) {
//         if(is_pair(t)) {
//             return map(helper1, t);
//         } else {
//             if(is_null(t)) {
//                 return null;
//             }
//             let temp = head(array);
//             array = tail(array);
//             return temp;
//         }
//     }
    
//     function helper2(t) {
//         if(is_pair(t)) {
//             return map(helper2, t);
//         } else {
//             if(!is_null(t)) {
//                 array = insertion_sort(t, array);   
//             }
//         }
//     }
    
//     helper2(T);
//     return map(helper1, T);
// }

// In a R x C maze, every cell has (row, column)-coordinates,
// where Row 0 is the northern-most row, Row R - 1 is
// the southern-most, Column 0 is the western-most column, 
// and Column C - 1 is the eastern-most.
// In this task, you are to write a shortest_path_length function, which takes as 
// arguments a maze , and a starting cell
// location (start_row, start_col) , and returns the length of the 
// shortest path from the starting cell, through the
// maze, to the target/goal cell. The given starting cell is always 
// an empty cell or a target/goal cell. If there is no path to
// the target/goal cell from the starting cell, your function should 
// return the value Infinity . Note that the robot can
// move only in the north, south, east or west direction, and cannot 
// move "diagonally".
// Complete the given template to implement the shortest_path_length function. 
// Your function is allowed to modify
// the input maze during its computation, but must restore it to its original 
// values before the end of the
// computation.

function shortest_path_length(maze, start_row, start_col) {
    let result = Infinity;
    const row = array_length(maze);
    const col = array_length(maze[0]);
    
    function helper(i, j, step) {
        if(i === row || j === col || i < 0 || j < 0) {
            return undefined;
        } else if(maze[i][j] === "G") {
            result = math_min(result, step);
            return undefined;
        } else if(maze[i][j] === "X" || maze[i][j] === "#") {
            return undefined;
        }
        
        maze[i][j] = "X";
        
        helper(i + 1, j, step + 1);
        helper(i, j + 1, step + 1);
        helper(i - 1, j, step + 1);
        helper(i, j - 1, step + 1);
        
        maze[i][j] = ".";
    }
    
    helper(start_row, start_col, 0);
    return result;
}

const maze =
[[".", "#", ".", "#"],
[".", "#", "#", "."],
[".", ".", ".", "G"],
[".", "#", ".", "."],
[".", ".", ".", "#"]];

shortest_path_length(maze, 3, 0); // returns 4