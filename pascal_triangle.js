function pascal_triangle(row, pos) {
    return pos === 0 || pos === row
            ? 1
            : pascal_triangle(row - 1, pos - 1) + pascal_triangle(row - 1, pos); 
}

pascal_triangle(2, 1);