let pages = ["Sida 1", "Sida 2", "Sida 3", "Sida 4"];
let ul;

window.onload = init;

function init(){
    ul = document.getElementById("Nav");  

    for(let i = 0; i < pages.length; i++){
        createNavElement(pages[i], i);
    }
}

function createNavElement(name, index){
    let li = document.createElement("li");
    li.setAttribute("id", "ulli" + index);
    ul.appendChild(li);

    let a = document.createElement("a");
    a.setAttribute("href", "../Sida "+ (index+1) +"/Sida.html");
    a.innerHTML = name;
    document.getElementById("ulli" + index).appendChild(a);
}