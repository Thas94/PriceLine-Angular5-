var dateFirst = document.getElementById;

var dateSecond = new Date("11/28/2017");

// time difference
var timeDiff = Math.abs(dateSecond.getTime() - dateFirst.getTime());

// days difference
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

// difference
alert(diffDays);

function hello(){
    alert("Heloo")
} 