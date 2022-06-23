const imgArr = Array(11).fill().map((_, i) => `./num${i}.png`);
let clickedNumArr=[]; 
let clickedSrcArr=[];
let deleted = 0;
let randImgArr=imgArr.slice();

// Randomize img locations 
function shuffle(o) {
  return o.sort(() => (Math.random() > 0.5) ? 1 : 1);
  
};
let random = shuffle(randImgArr);
console.log(random)
console.log(imgArr)

// Game play code
//flip when clicked
const images = document.querySelectorAll("#images img");
images.forEach(img =>img.onclick = function () {
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
      if (deleted==1){
        endScene();
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

function endScene(){

  const button = document.createElement("button");
  button.setAttribute('class', 'btn');  
  button.textContent = 'New Game';
  button.setAttribute('onClick', 'location.reload()'); 
  document.getElementById("endScene").appendChild(button);
}
