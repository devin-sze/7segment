

// set animation speed

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    var val = this.value.toString();
    for (var i = 0; i < 7; i++) {
        set_animate_time(get_animate_id(segment_parent[i]), val);
    }
}



function set_animate_time(id, time) {
    document.getElementById(id).style.transition = "width " + time + "s, height " + time + "s";
}
















const TOP = "top";
const LTOP = "l_top"
const LBTM = "l_btm";
const BTM = "btm";
const RBTM = "r_btm";
const RTOP = "r_top";
const MID = "mid";

const FILL = 1;
const CLEAR = 0;

const LEFT = 0;
const RIGHT = 1;
const DOWN = 2;
const UP = 3;

var segment_parent = [TOP, LTOP, LBTM, BTM, RBTM, RTOP, MID];













function add_num(i) {

    document.getElementById("order").innerHTML += " " + i.toString();

}

function start_animate() {
    var order = document.getElementById("order").innerHTML.split(" ");

    for (let i = 0; i < order.length - 1; i++) {
        var start = order[i];
        var end = order[i+1];

        execute_fn_by_name_delay("_" + start + "_" + end, window, i*1000);
    }
}

function execute_fn_by_name_delay(functionName, context, delay) {
    let interval = setInterval(function() {
        execute_fn_by_name(functionName, context);
        clearInterval(interval);

    }, delay)

}

function execute_fn_by_name(functionName, context) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}










function get_animate_id(name) {
    return "animate_".concat(name);
}



function create_segment() {
    for (let i = 0; i < 7; i++) {
        var parent_id = segment_parent[i];
        console.log(parent_id);
        var parent = document.getElementById(parent_id);
        var child = document.createElement("div");
        child.className = "child";
        child.id = get_animate_id(parent_id);
        parent.appendChild(child);
    }

    let interval1 = setInterval(function() {
        init_0();
        clearInterval(interval1);

        let interval2 = setInterval(function() {
            _0_6();
            clearInterval(interval2);
    
        }, 1000)

    }, 1000)
    
}

function lr_move(id, fill_or_clear, movement_dir, animate_order, animate_time) {

    if (!([TOP, MID, BTM].includes(id))) {
        console.log(id + "was illegally l/r move");
    }

    set_animate_time(get_animate_id(id), animate_time/1000);

    var div = document.getElementById(get_animate_id(id))
    var delay = animate_order * animate_time;

    let interval = setInterval(function() {
        if (fill_or_clear == FILL) {
            if (movement_dir == RIGHT) {
                div.style.left = "0px";
                div.style.right = "";
            } else if (movement_dir == LEFT) {
                div.style.right = "0px";
                div.style.left = "";
            }
            div.style.width = "100%";
        } else if (fill_or_clear == CLEAR) {
            if (movement_dir == RIGHT) {
                div.style.right = "0px";
                div.style.left = "";
            } else if (movement_dir == LEFT) {
                div.style.left = "0px";
                div.style.right = "";
            }
            div.style.width = "0px";
        }

        clearInterval(interval);
    }, delay)

    

}

function tb_move(id, fill_or_clear, movement_dir, animate_order, animate_time) {

    if (!([LTOP, RTOP, LBTM, RBTM].includes(id))) {
        console.log(id + "was illegally t/b move");
    }


    set_animate_time(get_animate_id(id), animate_time/1000);

    var div = document.getElementById(get_animate_id(id))
    var delay = animate_order * animate_time;
    
    let interval = setInterval(function() {
        if (fill_or_clear == FILL) {
            if (movement_dir == UP) {
                div.style.bottom = "0px";
                div.style.top = "";
            } else if (movement_dir == DOWN) {
                div.style.top = "0px";
                div.style.bottom = "";
            }
            div.style.height = "100%";
        } else if (fill_or_clear == CLEAR) {
            if (movement_dir == UP) {
                div.style.top = "0px";
                div.style.bottom = "";
                console.log("here");
            } else if (movement_dir == DOWN) {
                div.style.bottom = "0px";
                div.style.top = "";
            }
            div.style.height = "0px";
        }

        clearInterval(interval);
    }, delay)

}




function fast_clear() {
    var time = output.innerHTML * 1000;
    var num_segments = 1;
    var seg_time = Math.round(time/num_segments, 3);
    
    lr_move(TOP, CLEAR, RIGHT,   0, seg_time);
    tb_move(LTOP, CLEAR, DOWN,    0, seg_time);
    
    tb_move(RTOP, CLEAR, DOWN,    0, seg_time);
    lr_move(BTM, CLEAR, RIGHT,    0, seg_time);
    tb_move(LBTM, CLEAR, DOWN,    0, seg_time);

    tb_move(RBTM, CLEAR, DOWN,    0, seg_time);
    lr_move(BTM, CLEAR, RIGHT,    0, seg_time);
}



function clear_segments() {

    console.log("clear");

    var time = output.innerHTML * 1000;
    var num_segments = 3;
    var seg_time = Math.round(time/num_segments, 3);
    
    lr_move(TOP, CLEAR, RIGHT,   0, seg_time);
    tb_move(LTOP, CLEAR, DOWN,    0, seg_time);
    
    tb_move(RTOP, CLEAR, DOWN,    1, seg_time);
    lr_move(MID, CLEAR, RIGHT,    1, seg_time);
    tb_move(LBTM, CLEAR, DOWN,    1, seg_time);

    tb_move(RBTM, CLEAR, DOWN,    2, seg_time);
    lr_move(BTM, CLEAR, RIGHT,    2, seg_time);
}


function init_0() {
    // fast_clear();

    var time = output.innerHTML * 1000;
    var num_segments = 6;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, FILL, RIGHT,   0, seg_time);
    tb_move(RTOP, FILL, DOWN,    1, seg_time);
    tb_move(RBTM, FILL, DOWN,    2, seg_time);
    lr_move(BTM, FILL, LEFT,    3, seg_time);
    tb_move(LBTM, FILL, UP,    4, seg_time);
    tb_move(LTOP, FILL, UP,    5, seg_time);
}


function _0_1() {
    var time = output.innerHTML * 1000;
    var num_segments = 4;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, CLEAR, LEFT, 0, seg_time);
    tb_move(LTOP, CLEAR, DOWN, 1, seg_time);
    tb_move(LBTM, CLEAR, DOWN, 2, seg_time);
    lr_move(BTM, CLEAR, RIGHT, 3, seg_time);
}

function _0_2() {
    var time = output.innerHTML * 1000;
    var num_segments = 7;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(LTOP, CLEAR, DOWN, 0, seg_time);
    tb_move(LBTM, CLEAR, DOWN, 1, seg_time);
    lr_move(BTM, CLEAR, RIGHT, 2, seg_time);
    tb_move(RBTM, CLEAR, UP, 3, seg_time);
    lr_move(MID, FILL, LEFT, 4, seg_time);
    tb_move(LBTM, FILL, DOWN, 5, seg_time);
    lr_move(BTM, FILL, RIGHT, 6, seg_time);
}

function _0_3() {
    var time = output.innerHTML * 1000;
    var num_segments = 8;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(LTOP, CLEAR, DOWN, 0, seg_time);
    tb_move(LBTM, CLEAR, DOWN, 1, seg_time);
    lr_move(BTM, CLEAR, RIGHT, 2, seg_time);
    lr_move(RBTM, CLEAR, UP, 3, seg_time);
    lr_move(MID, FILL, LEFT, 4, seg_time);
    tb_move(LBTM, FILL, DOWN, 5, seg_time);
    lr_move(BTM, FILL, RIGHT, 6, seg_time);
    tb_move(LBTM, CLEAR, DOWN, 7, seg_time);
    lr_move(RBTM, FILL, RIGHT, 7, seg_time);
}

function _0_4() {
    var time = output.innerHTML * 1000;
    var num_segments = 3;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, CLEAR, LEFT, 0, seg_time);
    lr_move(MID, FILL, RIGHT, 0, seg_time);
    lr_move(BTM, CLEAR, LEFT, 0, seg_time);
    tb_move(LBTM, CLEAR, UP, 1, seg_time);
}

function _0_5() {
    var time = output.innerHTML * 1000;
    var num_segments = 7;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(LBTM, CLEAR, DOWN, 0, seg_time);
    lr_move(BTM, CLEAR, RIGHT, 1, seg_time);
    tb_move(RBTM, CLEAR, UP, 2, seg_time);
    tb_move(RTOP, CLEAR, UP, 3, seg_time);
    lr_move(MID, FILL, RIGHT, 4, seg_time);
    tb_move(RBTM, FILL, BTM, 5, seg_time);
    lr_move(BTM, FILL, LEFT, 6, seg_time);
}

function _0_6() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(RTOP, CLEAR, DOWN, 0, seg_time);
    lr_move(MID, FILL, LEFT, 1, seg_time);
}

function _0_7() {
    var time = output.innerHTML * 1000;
    var num_segments = 3;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(LTOP, CLEAR, DOWN, 0, seg_time);
    tb_move(LBTM, CLEAR, DOWN, 1, seg_time);
    lr_move(BTM, CLEAR, RIGHT, 2, seg_time);
}

function _0_8() {
    var time = output.innerHTML * 1000;
    var num_segments = 3;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(MID, FILL, RIGHT, 0, seg_time);
}

function _0_9() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(MID, FILL, RIGHT, 0, seg_time);
    tb_move(LBTM, CLEAR, UP, 1, seg_time);
}




function _1_0() {
    var time = output.innerHTML * 1000;
    var num_segments = 4;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, FILL, LEFT, 0, seg_time);
    tb_move(LTOP, FILL, DOWN, 1, seg_time);
    tb_move(LBTM, FILL, DOWN, 2, seg_time);
    lr_move(BTM, FILL, RIGHT, 3, seg_time);
}

function _1_2() {
    var time = output.innerHTML * 1000;
    var num_segments = 5;
    var seg_time = Math.round(time/num_segments, 3);

    
    tb_move(RBTM, CLEAR, UP, 0, seg_time);
    lr_move(TOP, FILL, LEFT, 1, seg_time);
    lr_move(MID, FILL, RIGHT, 2, seg_time);
    tb_move(LBTM, FILL, DOWN, 3, seg_time);
    lr_move(BTM, FILL, RIGHT, 4, seg_time);
}

function _1_3() {
    var time = output.innerHTML * 1000;
    var num_segments = 3;
    var seg_time = Math.round(time/num_segments, 3);

    
    lr_move(TOP, FILL, LEFT, 0, seg_time);
    lr_move(MID, FILL, LEFT, 1, seg_time);
    lr_move(BTM, FILL, LEFT, 2, seg_time);
}

function _1_4() {
    var time = output.innerHTML * 1000;
    var num_segments = 3;
    var seg_time = Math.round(time/num_segments, 3);

    
    lr_move(TOP, FILL, LEFT, 0, seg_time);
    tb_move(RTOP, CLEAR, UP, 0, seg_time);
    lr_move(TOP, CLEAR, LEFT, 1, seg_time);
    tb_move(LTOP, FILL, DOWN, 1, seg_time);
    lr_move(MID, FILL, RIGHT, 2, seg_time);
    tb_move(RTOP, FILL, UP, 3, seg_time);
}

function _1_5() {
    var time = output.innerHTML * 1000;
    var num_segments = 5;
    var seg_time = Math.round(time/num_segments, 3);

    
    lr_move(TOP, FILL, LEFT, 0, seg_time);
    tb_move(RBTM, CLEAR, UP, 0, seg_time);
    tb_move(LTOP, FILL, DOWN, 1, seg_time);
    tb_move(RTOP, CLEAR, UP, 1, seg_time);
    lr_move(MID, FILL, RIGHT, 2, seg_time);
    tb_move(RBTM, FILL, DOWN, 3, seg_time);
    lr_move(BTM, FILL, LEFT, 4, seg_time);
}

function _1_6() {
    var time = output.innerHTML * 1000;
    var num_segments = 6;
    var seg_time = Math.round(time/num_segments, 3);

    
    lr_move(TOP, FILL, LEFT, 0, seg_time);
    tb_move(RBTM, CLEAR, UP, 0, seg_time);
    tb_move(LTOP, FILL, DOWN, 1, seg_time);
    tb_move(RTOP, CLEAR, UP, 1, seg_time);
    lr_move(MID, FILL, RIGHT, 2, seg_time);
    tb_move(RBTM, FILL, DOWN, 3, seg_time);
    lr_move(BTM, FILL, LEFT, 4, seg_time);
    tb_move(LBTM, FILL, UP, 5, seg_time);
}

function _1_7() {
    var time = output.innerHTML * 1000;
    var num_segments = 1;
    var seg_time = Math.round(time/num_segments, 3);

    
    lr_move(TOP, FILL, LEFT, 0, seg_time);
}

function _1_8() {
    var time = output.innerHTML * 1000;
    var num_segments = 6;
    var seg_time = Math.round(time/num_segments, 3);

    
    lr_move(TOP, FILL, LEFT, 0, seg_time);
    tb_move(RBTM, CLEAR, UP, 0, seg_time);
    tb_move(LTOP, FILL, DOWN, 1, seg_time);
    lr_move(MID, FILL, RIGHT, 2, seg_time);
    tb_move(RBTM, FILL, DOWN, 3, seg_time);
    lr_move(BTM, FILL, LEFT, 4, seg_time);
    tb_move(LBTM, FILL, UP, 5, seg_time);
}

function _1_9() {
    var time = output.innerHTML * 1000;
    var num_segments = 5;
    var seg_time = Math.round(time/num_segments, 3);

    
    lr_move(TOP, FILL, LEFT, 0, seg_time);
    tb_move(RBTM, CLEAR, UP, 0, seg_time);
    tb_move(LTOP, FILL, DOWN, 1, seg_time);
    lr_move(MID, FILL, RIGHT, 2, seg_time);
    tb_move(RBTM, FILL, DOWN, 3, seg_time);
    lr_move(BTM, FILL, LEFT, 4, seg_time);
}



function _2_0() {
    var time = output.innerHTML * 1000;
    var num_segments = 7;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(BTM, CLEAR, LEFT, 0, seg_time);
    tb_move(LBTM, CLEAR, UP, 1, seg_time);
    lr_move(MID, CLEAR, RIGHT, 2, seg_time);
    tb_move(RBTM, FILL, DOWN, 3, seg_time);
    lr_move(BTM, FILL, LEFT, 4, seg_time);
    tb_move(LBTM, FILL, UP, 5, seg_time);
    tb_move(LTOP, FILL, UP, 6, seg_time);
}

function _2_1() {
    var time = output.innerHTML * 1000;
    var num_segments = 4;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(BTM, CLEAR, LEFT, 0, seg_time);
    tb_move(LBTM, CLEAR, UP, 1, seg_time);
    lr_move(MID, CLEAR, RIGHT, 2, seg_time);
    tb_move(RBTM, FILL, DOWN, 3, seg_time);
    lr_move(TOP, CLEAR, RIGHT, 3, seg_time);
}

function _2_3() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(BTM, CLEAR, LEFT, 0, seg_time);
    tb_move(RBTM, FILL, DOWN, 0, seg_time);
    tb_move(LBTM, CLEAR, UP, 1, seg_time);
    lr_move(BTM, FILL, LEFT, 1, seg_time);
}

function _2_4() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    
    lr_move(TOP, CLEAR, LEFT, 0, seg_time);
    tb_move(LTOP, FILL, DOWN, 0, seg_time);
    
    lr_move(BTM, CLEAR, LEFT, 0, seg_time);
    lr_move(RBTM, FILL, DOWN, 0, seg_time);
    
    tb_move(LBTM, CLEAR, UP, 1, seg_time);
    tb_move(RBTM, FILL, DOWN, 1, seg_time);
}

function _2_5() {
    var time = output.innerHTML * 1000;
    var num_segments = 8;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(BTM, CLEAR, LEFT, 0, seg_time);
    tb_move(LBTM, CLEAR, UP, 1, seg_time);
    lr_move(MID, CLEAR, RIGHT, 2, seg_time);
    tb_move(RTOP, CLEAR, UP, 3, seg_time);

    tb_move(LTOP, FILL, DOWN, 4, seg_time);
    lr_move(MID, FILL, RIGHT, 5, seg_time);
    tb_move(RBTM, FILL, DOWN, 6, seg_time);
    lr_move(BTM, FILL, LEFT, 7, seg_time);
}

function _2_6() {
    var time = output.innerHTML * 1000;
    var num_segments = 6;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, CLEAR, RIGHT, 0, seg_time);
    tb_move(RTOP, CLEAR, DOWN, 1, seg_time);

    tb_move(RBTM, FILL, UP, 2, seg_time);
    lr_move(MID, CLEAR, LEFT, 2, seg_time);

    lr_move(MID, FILL, LEFT, 3, seg_time);

    tb_move(LTOP, FILL, UP, 4, seg_time);
    lr_move(TOP, FILL, RIGHT, 5, seg_time);
}

function _2_7() {
    var time = output.innerHTML * 1000;
    var num_segments = 4;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(BTM, CLEAR, LEFT, 0, seg_time);
    tb_move(LBTM, CLEAR, UP, 1, seg_time);
    lr_move(MID, CLEAR, RIGHT, 2, seg_time);
    tb_move(RBTM, FILL, DOWN, 3, seg_time);
}

function _2_8() {
    var time = output.innerHTML * 1000;
    var num_segments = 3;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(RBTM, FILL, UP, 0, seg_time);
    tb_move(LTOP, FILL, UP, 2, seg_time);
}

function _2_9() {
    var time = output.innerHTML * 1000;
    var num_segments = 3;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(MID, CLEAR, LEFT, 0, seg_time);
    tb_move(RBTM, FILL, UP, 0, seg_time);

    lr_move(MID, FILL, LEFT, 1, seg_time);
    tb_move(LBTM, CLEAR, DOWN, 1, seg_time);

    tb_move(LTOP, FILL, UP, 2, seg_time);
}





function _3_0() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(MID, CLEAR, RIGHT, 0, seg_time);
    tb_move(LBTM, FILL, UP, 0, seg_time);
    tb_move(LTOP, FILL, UP, 1, seg_time);
}

function _3_1() {
    var time = output.innerHTML * 1000;
    var num_segments = 3;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, CLEAR, RIGHT, 0, seg_time);
    lr_move(MID, CLEAR, RIGHT, 1, seg_time);
    lr_move(BTM, CLEAR, RIGHT, 2, seg_time);
}

function _3_2() {
    var time = output.innerHTML * 1000;
    var num_segments = 3;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(LBTM, FILL, DOWN, 0, seg_time);
    lr_move(BTM, CLEAR, RIGHT, 0, seg_time);
    
    lr_move(BTM, FILL, RIGHT, 1, seg_time);
    tb_move(RBTM, CLEAR, UP, 1, seg_time);
}

function _3_4() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(LTOP, FILL, UP, 0, seg_time);
    lr_move(BTM, CLEAR, RIGHT, 0, seg_time);
    
    lr_move(TOP, CLEAR, RIGHT, 1, seg_time);
}

function _3_5() {
    var time = output.innerHTML * 1000;
    var num_segments = 1;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(LTOP, FILL, DOWN, 0, seg_time);
    tb_move(RTOP, CLEAR, UP, 0, seg_time);
}

function _3_6() {
    var time = output.innerHTML * 1000;
    var num_segments = 3;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, CLEAR, RIGHT, 0, seg_time);
    tb_move(LBTM, FILL, UP, 0, seg_time);
    
    tb_move(RTOP, CLEAR, DOWN, 1, seg_time);
    tb_move(LTOP, FILL, UP, 1, seg_time);

    lr_move(TOP, FILL, RIGHT, 2, seg_time);
}

function _3_7() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(MID, CLEAR, RIGHT, 0, seg_time);
    lr_move(BTM, CLEAR, RIGHT, 1, seg_time);
}

function _3_8() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(LBTM, FILL, UP, 0, seg_time);
    tb_move(LTOP, FILL, UP, 1, seg_time);
}

function _3_9() {
    var time = output.innerHTML * 1000;
    var num_segments = 1;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(LTOP, FILL, UP, 0, seg_time);
}




function _4_0() {
    var time = output.innerHTML * 1000;
    var num_segments = 3;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(MID, CLEAR, LEFT, 0, seg_time);
    lr_move(TOP, FILL, RIGHT, 0, seg_time);

    lr_move(BTM, FILL, LEFT, 1, seg_time);
    tb_move(LBTM, FILL, UP, 2, seg_time);
}

function _4_1() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(LTOP, CLEAR, DOWN, 0, seg_time);
    lr_move(MID, CLEAR, RIGHT, 1, seg_time);
}

function _4_2() {
    var time = output.innerHTML * 1000;
    var num_segments = 5;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(BTM, FILL, LEFT, 0, seg_time);
    tb_move(LTOP, CLEAR, DOWN, 0, seg_time);
    
    tb_move(LBTM, FILL, UP, 1, seg_time);
    lr_move(MID, CLEAR, RIGHT, 1, seg_time);

    lr_move(MID, FILL, RIGHT, 2, seg_time);
    tb_move(RBTM, CLEAR, DOWN, 2, seg_time);

    lr_move(TOP, FILL, LEFT, 4, seg_time);
}

function _4_3() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(LTOP, CLEAR, DOWN, 0, seg_time);
    lr_move(TOP, FILL, LEFT, 0, seg_time);
    
    lr_move(BTM, FILL, LEFT, 1, seg_time);
}

function _4_5() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(RTOP, CLEAR, DOWN, 0, seg_time);
    lr_move(TOP, FILL, RIGHT, 0, seg_time);
    
    lr_move(BTM, FILL, LEFT, 1, seg_time);
}

function _4_6() {
    var time = output.innerHTML * 1000;
    var num_segments = 4;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, FILL, LEFT, 0, seg_time);
    tb_move(RBTM, CLEAR, UP, 0, seg_time);

    tb_move(RTOP, CLEAR, UP, 1, seg_time);
    tb_move(LBTM, FILL, DOWN, 1, seg_time);

    lr_move(BTM, FILL, RIGHT, 2, seg_time);
    tb_move(RBTM, FILL, UP, 3, seg_time);
}

function _4_7() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(LTOP, CLEAR, DOWN, 0, seg_time);
    lr_move(TOP, FILL, LEFT, 0, seg_time);

    lr_move(MID, CLEAR, LEFT, 1, seg_time);
}

function _4_8() {
    var time = output.innerHTML * 1000;
    var num_segments = 4;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, FILL, LEFT, 0, seg_time);
    tb_move(RBTM, CLEAR, UP, 0, seg_time);

    tb_move(LBTM, FILL, DOWN, 1, seg_time);
    lr_move(BTM, FILL, RIGHT, 2, seg_time);
    tb_move(RBTM, FILL, UP, 3, seg_time);
}

function _4_9() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, FILL, RIGHT, 0, seg_time);
    lr_move(BTM, FILL, LEFT, 1, seg_time);
}




function _5_0() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(MID, CLEAR, RIGHT, 0, seg_time);
    tb_move(LBTM, FILL, UP, 0, seg_time);

    tb_move(RTOP, FILL, DOWN, 1, seg_time);
}

function _5_1() {
    var time = output.innerHTML * 1000;
    var num_segments = 4;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, CLEAR, LEFT, 0, seg_time);
    lr_move(BTM, CLEAR, RIGHT, 0, seg_time);

    tb_move(LTOP, CLEAR, DOWN, 1, seg_time);
    lr_move(MID, CLEAR, RIGHT, 2, seg_time);

    tb_move(RTOP, FILL, UP, 3, seg_time);
}

function _5_2() {
    var time = output.innerHTML * 1000;
    var num_segments = 4;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, CLEAR, LEFT, 0, seg_time);
    lr_move(BTM, CLEAR, RIGHT, 0, seg_time);

    tb_move(LTOP, CLEAR, DOWN, 1, seg_time);
    tb_move(RBTM, CLEAR, UP, 1, seg_time);

    tb_move(LBTM, FILL, DOWN, 2, seg_time);
    tb_move(RTOP, FILL, UP, 2, seg_time);

    lr_move(TOP, FILL, LEFT, 3, seg_time);
    lr_move(BTM, FILL, RIGHT, 3, seg_time);
}

function _5_3() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, CLEAR, LEFT, 0, seg_time);
    tb_move(RTOP, FILL, UP, 0, seg_time);

    tb_move(LTOP, CLEAR, DOWN, 1, seg_time);
    lr_move(TOP, FILL, LEFT, 1, seg_time);
}

function _5_4() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, CLEAR, LEFT, 0, seg_time);
    tb_move(RTOP, FILL, UP, 0, seg_time);

    lr_move(BTM, CLEAR, RIGHT, 1, seg_time);
}

function _5_6() {
    var time = output.innerHTML * 1000;
    var num_segments = 1;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(LBTM, FILL, UP, 0, seg_time);
}

function _5_7() {
    var time = output.innerHTML * 1000;
    var num_segments = 4;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, CLEAR, LEFT, 0, seg_time);
    tb_move(RTOP, FILL, UP, 0, seg_time);

    tb_move(LTOP, CLEAR, DOWN, 1, seg_time);
    lr_move(TOP, FILL, LEFT, 1, seg_time);

    lr_move(MID, CLEAR, RIGHT, 2, seg_time);
    lr_move(BTM, CLEAR, RIGHT, 3, seg_time);
}

function _5_8() {
    var time = output.innerHTML * 1000;
    var num_segments = 3;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(MID, CLEAR, RIGHT, 0, seg_time);
    tb_move(LBTM, FILL, UP, 0, seg_time);
    
    lr_move(MID, FILL, RIGHT, 1, seg_time);
    tb_move(RTOP, FILL, UP, 2, seg_time);
}

function _5_9() {
    var time = output.innerHTML * 1000;
    var num_segments = 1;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(RTOP, FILL, DOWN, 1, seg_time);
}






function _6_0() {
    var time = output.innerHTML * 1000;
    var num_segments = 1;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(MID, CLEAR, LEFT, 0, seg_time);
    tb_move(RTOP, FILL, DOWN, 0, seg_time);
}

function _6_1() {
    var time = output.innerHTML * 1000;
    var num_segments = 6;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(MID, CLEAR, RIGHT, 0, seg_time);
    tb_move(RBTM, CLEAR, DOWN, 1, seg_time);
    lr_move(BTM, CLEAR, LEFT, 2, seg_time);
    tb_move(LBTM, CLEAR, UP, 3, seg_time);

    tb_move(RTOP, FILL, DOWN, 4, seg_time);
    tb_move(LTOP, CLEAR, UP, 4, seg_time);

    lr_move(TOP, CLEAR, RIGHT, 5, seg_time);
    tb_move(RBTM, FILL, DOWN, 5, seg_time);
}

function _6_2() {
    var time = output.innerHTML * 1000;
    var num_segments = 5;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, CLEAR, LEFT, 0, seg_time);
    tb_move(LBTM, CLEAR, DOWN, 0, seg_time);
    

    tb_move(LTOP, CLEAR, DOWN, 1, seg_time);
    lr_move(BTM, CLEAR, RIGHT, 1, seg_time);

    tb_move(RBTM, CLEAR, UP, 2, seg_time);
    tb_move(LBTM, FILL, DOWN, 2, seg_time);

    tb_move(RTOP, FILL, UP, 3, seg_time);
    lr_move(BTM, FILL, RIGHT, 3, seg_time);

    lr_move(TOP, FILL, LEFT, 4, seg_time);
}

function _6_3() {
    var time = output.innerHTML * 1000;
    var num_segments = 2;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(RTOP, FILL, UP, 0, seg_time);
    tb_move(LTOP, CLEAR, DOWN, 0, seg_time);

    tb_move(LBTM, CLEAR, DOWN, 1, seg_time);
}

function _6_4() {
    var time = output.innerHTML * 1000;
    var num_segments = 3;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(TOP, CLEAR, LEFT, 0, seg_time);
    tb_move(RTOP, FILL, UP, 0, seg_time);

    tb_move(LBTM, CLEAR, DOWN, 1, seg_time);
    lr_move(BTM, CLEAR, RIGHT, 2, seg_time);
}

function _6_5() {
    var time = output.innerHTML * 1000;
    var num_segments = 1;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(LBTM, CLEAR, DOWN, 0, seg_time);
}

function _6_7() {
    var time = output.innerHTML * 1000;
    var num_segments = 5;
    var seg_time = Math.round(time/num_segments, 3);

    lr_move(MID, CLEAR, RIGHT, 0, seg_time);
    tb_move(RBTM, CLEAR, DOWN, 1, seg_time);
    lr_move(BTM, CLEAR, LEFT, 2, seg_time);

    tb_move(LBTM, CLEAR, UP, 3, seg_time);
    tb_move(RTOP, FILL, DOWN, 3, seg_time);

    tb_move(LTOP, CLEAR, UP, 4, seg_time);
    tb_move(RBTM, FILL, DOWN, 4, seg_time);
}

function _6_8() {
    var time = output.innerHTML * 1000;
    var num_segments = 1;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(RTOP, FILL, DOWN, 0, seg_time);
}

function _6_9() {
    var time = output.innerHTML * 1000;
    var num_segments = 1;
    var seg_time = Math.round(time/num_segments, 3);

    tb_move(RTOP, FILL, DOWN, 0, seg_time);
    tb_move(LBTM, CLEAR, DOWN, 0, seg_time);
}

