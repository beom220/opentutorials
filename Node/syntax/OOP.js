// Object Oriented Programming 객체지향 프로그래밍

// 데이터를 담는 그릇 array, object

// 데이터를 처리하기 위한방법 function

// Note Js 에서 function은 데이터를 처리하기위한 방법이면서, 값이 될 수 있다.

/*
var i = if(true){console.log(1)} ===> error
var w = while(true){console.log(2)} ===> error
*/

/*
no error
var f = function(){
    console.log(1+1);
    console.log(1+2);
}
 */

var f = function(){
    console.log(1+1);
    console.log(1+2);
}

var a = [f];
a[0]();

var o = {
    func: f
}
o.func();