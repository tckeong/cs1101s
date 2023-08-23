import {heart, stackn, quarter_turn_left, quarter_turn_right, show, pink} from "rune";

const result = stackn(10, quarter_turn_right(stackn(10, quarter_turn_left(pink(heart)))));
show(result);