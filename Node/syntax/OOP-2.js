var v1 = 'v1';
// something 10000 code...
v1 = 'HaHaHa new v1!!';
var v2 = 'v2';
// ▲ 드넓은 공간에 수많은 파일들이 나뒹굴고 있다...
console.log(v1);
console.log(v2);

var o = {
    v1: 'o.v1',
    v2: 'o.v2',
}
// ▲ 파일을 폴더로 묶었다...

function f1(){
    console.log(o.v1);
}
// something 10000 code...
function f1(){
    console.log('new f1 ^^');
}
// 누군가 같은 이름의 함수를 선언...😱😱

function f2(){
    console.log(o.v2);
}

f1(); // 기대값 o.v1 but... new f1
f2();

var o2 = {
    v1: 'o2.v1',
    v2: 'o2.v2',
    f1: function(){console.log(this.v1)},
    f2: function(){console.log(this.v2)}
}

o2.f1();
o2.f2();