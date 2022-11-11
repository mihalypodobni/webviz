let counter = 0;

let arrayWidth=5;
let arrayHeight=2;
let stackHeight=30;
let shrink=60;
let sensitivity = 30;


let window2 = "";
let output = "";

for (let row = 1; row < arrayHeight; row++) {       
  for (let col = 1; col < arrayWidth; col++) {
    output+=`<div id="${`div`+`-` +row+`-`+ col}" class="base">`;
    for (let card = 1; card < stackHeight; card++) {
        output+=`
        <div id="${row}-${col}-${card}" class="square">
        `
    }
    for (let j = 1; j < stackHeight+1; j++) {
        output+=`
        </div>
        `
    }
    console.log(output);
    window2+=output;
    document.getElementById("container").innerHTML +=window2;
    window2="";
    output="";
}}

const move = (e) => {
    //Try, catch to avoid any errors for touch screens (Error thrown when user doesn't move his finger)
    try {
      //PageX and PageY return the position of client's cursor from top left of screen
      var x = e.pageX*2;
      var y = e.pageY*2;
    } catch (e) {}
    //set left and top of div based on mouse position
    for (let row = 1; row < arrayHeight; row++) {       
      for (let col = 1; col < arrayWidth; col++) {
        let currentDiv = document.getElementById(`div-${row}-${col}`);
        currentDiv.style.transform = `translateY(${col*20})`;
        for (let card = 2; card < stackHeight; card++) {
          console.log(`${row}-${col}-${card}`);
          let currentCard = document.getElementById(`${row}-${col}-${card}`);
          console.log(currentCard);
          currentCard.style.zIndex= card;
          currentCard.style.transform = `scale(${1-(card/shrink)}, ${1-(card/shrink)}`;
          currentCard.style.position = "relative";
          currentCard.style.left =x/120-(card*1.5) +"px";
          currentCard.style.top =y/90-(card*1.5) +"px";
          currentCard.style.zIndex= `${card}`;
        }
      }
    }
  }

//For mouse
document.addEventListener("mousemove", (e) => {
  move(e);
});
//For touch
document.addEventListener("touchmove", (e) => {
  move(e);
});