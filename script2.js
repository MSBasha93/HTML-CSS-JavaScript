// Attempt 2 : added new game button (js not refresh page),highscore, and counter & timer. (still got animations for flipping to go)

const imgArr = Array(20).fill().map((_, i) => `./num${i}.png`);
let clickedNumArr=[]; 
let clickedSrcArr=[];
let deleted = 0;
let randImgArr=imgArr.slice();
let timerId; 
let counter = 0;
let timer = 0;
let highScores=[ , , ];




// Game play code
// Flip when clicked
shuffle(randImgArr);
const images = document.querySelectorAll("#images img");
images.forEach(img =>img.onclick = function () {
  
  increaseCounter();
  this.src = randImgArr[this.id];
  clickedNumArr.unshift(imgArr.indexOf(randImgArr[this.id]));
  clickedSrcArr.unshift(randImgArr[this.id]);
  console.log(clickedNumArr)
  console.log(clickedSrcArr)
  //check matching if two cards are clicked
  if(clickedNumArr[1]!=null){
    //check to delete if matching
    if(clickedNumArr[0]==clickedNumArr[1]-10 || clickedNumArr[1]==clickedNumArr[0]-10 ){
      
      document.getElementById(randImgArr.indexOf(clickedSrcArr[0])).classList.add("delete");
      document.getElementById(randImgArr.indexOf(clickedSrcArr[1])).classList.add("delete");
      clickedNumArr.length = 0;
      clickedSrcArr.length = 0;
      deleted++;
      console.log(deleted)
      if (deleted==10){
        endScene();
        if(timer!=0){
          addNewHighScore();
        }
        showHighScores();
      }
        
    //check to reflip if unmatching 
    }else {
      
     setTimeout(()=>{
      document.getElementById(randImgArr.indexOf(clickedSrcArr[0])).src="./back.png";
      document.getElementById(randImgArr.indexOf(clickedSrcArr[1])).src="./back.png";
      clickedNumArr.length = 0;
      clickedSrcArr.length = 0;
     },500);
    
    }

  }
});    


// List of functions

function addNewHighScore(){
  highScores.unshift(timer);
  highScores.sort(function(a, b) {
  return a - b;
  });
  highScores.length = 3;
  console.log(highScores)
}
function showHighScores(){
  const list=document.getElementById("highScores");
  list.innerHTML ="High Scores:" + highScores.map(i => `<li> (${i} Seconds!)</li>`).join('');
 
}


function endScene(){

  const button = document.createElement("button");
  button.setAttribute('class', 'btn');  
  button.setAttribute('id', 'showCards');
  button.textContent = 'Show Cards';
  button.setAttribute('onClick', 'showCards()');
  document.getElementById("newGameBtn").parentNode.insertBefore(button, document.getElementById("newGameBtn"));
  clearInterval(timerId);
  
}

function newGame(){
resetCards();
restartCounter();
restartTimer();
if (document.getElementById("showCards")){
document.getElementById("showCards").remove();
}
}

function showCards(){
  document.querySelectorAll("#images img").forEach(img=> img.classList.remove("delete"));
  document.querySelectorAll("#images img").forEach(img=> img.src=randImgArr[img.id]);
 
}
// Randomize img locations 
function shuffle(o) {
  o.sort(() => (Math.random() > 0.5) ? 5 : -5);
  console.log(o)
  return o;
}
function increaseCounter(){
  counter++;
  document.getElementById("counter").innerHTML=counter;
}
function increaseTimer(){
  timer++;
  document.getElementById("timer").innerHTML=timer;
}
function restartCounter(){
  counter=0;
  document.getElementById("counter").innerHTML=counter;
}
function restartTimer(){
  timer = 0;
  clearInterval(timerId); 
  timerId = setInterval(increaseTimer,1000);
}
function resetCards(){
  deleted = 0 ;
  clickedNumArr.length = 0;
  clickedSrcArr.length = 0;
  document.querySelectorAll("#images img").forEach(img=> img.classList.remove("delete"));
  document.querySelectorAll("#images img").forEach(img=> img.src="./back.png");
  shuffle(randImgArr);
}
