//Telling the script that p is the <p> tag in the html.
let p = document.querySelector("p");
var size;

//The function that helps us make the size of the balloon bigger or smaller.
function Size(newSize){
    size = newSize;
    p.style.fontSize = size + "px";
}

//The start size of the ballon.

Size(20);

//The movement function.

function Arrow(event){

    //When arrow up key is pressed down the ballon increases in size.

    if(event.key == "ArrowUp"){

        //When it reaches 300 pixels the pop emoji will apear.


        if(size > 300){
            p.textContent = "💥";

        //When the pop emoji apears the removeEventListener makes the emoji not movable in any way. 
        //You can press both keys without anything happning.It has a stop.


            document.body.removeEventListener("keydown", Arrow);
        }else {
            Size(size * 1.1);
            event.preventDefault();
        }

    //When arrow down key is pressed down the ballon decreases in size.
    //It does not have a stop. 

    }else if(event.key == "ArrowDown") {
            Size(size * 0.9);
             event.preventDefault();
            }
}

//This makes the arrow keys work when it is pressed down.
document.body.addEventListener("keydown", Arrow);
