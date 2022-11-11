let counter = 0;
let screenW = screen.width;
let screenH = screen.height;

var cx = screen.width * 0.5;
var cy = screen.height * 0.5;


let arrayWidth=5;
let arrayHeight=2;
let stackHeight=30;
let shrink=90;
let sensitivity = 30;

let isDark = true;

let globalStlye = document.getElementById("container");
globalStlye.style.outlineWidth = "10px";

function isTouchDevice() {
  try {
    //We try to create TouchEvent. It would fail for desktops and throw error
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

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
        var x = !isTouchDevice() ? e.pageX-cx : e.touches[0].pageX-cx;
        var y = !isTouchDevice() ? e.pageY-cy : e.touches[0].pageY-cy;
    } catch (e) {}
    //set left and top of div based on mouse position
    for (let row = 1; row < arrayHeight; row++) {       
      for (let col = 1; col < arrayWidth; col++) {
        let currentDiv = document.getElementById(`div-${row}-${col}`);
        currentDiv.style.transform = `translateY(${col*20})`;
        for (let card = 1; card < stackHeight; card++) {
          console.log(`${row}-${col}-${card}`);
          let currentCard = document.getElementById(`${row}-${col}-${card}`);
          let currentX = currentCard.style.top;
          let cardOffsetX = (cx-e.pageX)*-1
          let cardOffsetY = (cy-e.pageY)*-1
          let stepDiff= 255/stackHeight;

          console.log(currentCard);
          currentCard.style.zIndex= card;
          currentCard.style.backgroundColor=`rgb(${50+(card*(stepDiff))}, ${50+(card*(stepDiff))},${50+(card*(stepDiff))})`;
          currentCard.style.transform = `scale(${1-(card/shrink)}, ${1-(card/shrink)}`;
          currentCard.style.position = "relative";
          currentCard.style.left =cardOffsetX*(card*card*0.001) +"px";
          currentCard.style.top =cardOffsetY*(card*card*0.001) +"px";
          currentCard.style.zIndex= card;
        }
      }
    }
  }

function buzz(e) {
            let dark = `outline:;background-color: "white""`;
            let bright = `outline:"10px outset white";background-color: "black""`;
            


            if (isDark){
              var elements = document.getElementsByClassName('square');
              console.log(elements.length);
              for (var i = 0; i < elements.length; i++) {
                  elements[i].style.outline="10px outset white";
                  elements[i].style.backgroundColor="black";
              }
              isDark=false;
            } else {
              var elements = document.getElementsByClassName('square');
              for (var i = 0; i < elements.length; i++) {
                elements[i].style.outline="10px outset black";
                elements[i].style.backgroundColor="white";
              }
              isDark=true;

            }

    
            console.log("BANG");
    };

document.addEventListener("mousedown", (e) => {
  buzz(e);
});

//For mouse
document.addEventListener("mousemove", (e) => {
  move(e);
});
//For touch
document.addEventListener("touchmove", (e) => {
  move(e);
});