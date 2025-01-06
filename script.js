

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

    init_0();

    let interval = setInterval(function() {

        console.log(i);
        if (i == 0) {
            init_0();
        }
        if (i == 1) {
            _0_1();
        } else if (i == 2) {
            _0_2();
        } else if (i == 3) {
            _0_3();
        } else if (i == 4) {
            _0_4();
        } else if (i == 5) {
            _0_5();
        } else if (i == 6) {
            _0_6();
        } else if (i == 7) {
            _0_7();
        } else if (i == 8) {
            _0_8();
        } else if (i == 9) {
            _0_9();
        }
        clearInterval(interval);
    }, 1000)
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

    let interval = setInterval(function() {
        init_0();
        clearInterval(interval);
    }, 1000)
    
}

function lr_move(id, fill_or_clear, movement_dir, animate_order, animate_time) {
    set_animate_time(get_animate_id(id), animate_time/1000);

    var div = document.getElementById(get_animate_id(id))
    console.log(div);

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
    set_animate_time(get_animate_id(id), animate_time/1000);

    var div = document.getElementById(get_animate_id(id))
    console.log(div);

    var delay = animate_order * animate_time;
    
    console.log(movement_dir);

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



function clear() {

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
    fast_clear();

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
    lr_move(RBTM, CLEAR, TOP, 3, seg_time);
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