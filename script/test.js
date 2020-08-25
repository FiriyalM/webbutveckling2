let myJSON = '{"name":"Tim Tuvestam","age":28}';
let myObj = JSON.parse(myJSON);

students = {student:[
    {"elevID":1,"Firstname":"Tim", "Lastname": "Tuvestam", "age":28},
    {"elevID":2,"Firstname":"David", "Lastname": "Wernow", "age":"old"}   
]
}
let text = document.getElementById("text");


document.getElementById("Fname").innerHTML= students.student[0].Firstname;
document.getElementById("Lname").innerHTML= students.student[0].Lastname;
document.getElementById("age").innerHTML= students.student[0].age;

document.getElementById("Fname1").innerHTML= students.student[1].Firstname;
document.getElementById("Lname1").innerHTML= students.student[1].Lastname;
document.getElementById("age1").innerHTML= students.student[1].age;
