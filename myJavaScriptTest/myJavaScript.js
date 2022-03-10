// var myName;
// myName = prompt("请输入姓名：");
// alert(myName);

// var age = '12.34';
// console.log(parseInt(age));
// console.log(parseFloat(age));
// console.log(Number(age));
// console.log(age * 1);

// var keepsHisWord;
// keepsHisWord = true;
// promise1 = new Promise(function(resolve, reject){
//     if(keepsHisWord){
//         resolve("resolve");
//     }else{
//         reject("reject");
//     }
// });
// console.log(promise1);

// promise2 = new Promise(function(resolve, reject){
//     setTimeout(function() {
//         resolve({message: "resolve", code: "200"});
//     }, 10 * 1000);
// });
// console.log(promise2);

// //计算年龄
// var birthday = prompt("请输入出生年份");
// alert( 2020 - birthday);

//加法器
var input1 = prompt("请输入第一个值");
var input2 = prompt("请输入第二个值");
var sum = 0;
sum = parseFloat(input1) + parseFloat(input2);
alert(input1 + '和' + input2 + "相加为：" + sum);