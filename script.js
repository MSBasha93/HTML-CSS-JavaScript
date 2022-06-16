const imgArr = Array(20).fill().map((_, i) => `./num${i}.png`);

let clickedNumArr=[];
let clickedIdArr=[];

let randImgArr = imgArr.slice();

// Randomize img locations 
function shuffle(o) {
  return o.sort(() => (Math.random() > 0.5) ? 1 : -1);
};

let random = shuffle(randImgArr);
let timeOut;

// Game play code
const images = document.querySelectorAll("#images img");

// Flip when clicked
images.forEach(img => 
  img.addEventListener('click', function (event) {
    clearTimeout(timeOut);
    this.src = randImgArr[this.id];
    clickedNumArr.unshift(imgArr.indexOf(randImgArr[this.id]));
    clickedIdArr.unshift(randImgArr[this.id]);
    console.log(clickedNumArr)
    console.log(clickedIdArr)
    // Check matching if two cards are clicked
    if (clickedNumArr[1] != null) {
      if (clickedNumArr[0] == clickedNumArr[1]-10 || clickedNumArr[1] == clickedNumArr[0]-10) {
        // Delete if matching
        document.getElementById(randImgArr.indexOf(clickedIdArr[0])).classList.add("delete");
        document.getElementById(randImgArr.indexOf(clickedIdArr[1])).classList.add("delete");
        clickedNumArr.length = 0;
        clickedIdArr.length = 0;
      } else if (clickedNumArr[0] != clickedNumArr[1]-10 || clickedNumArr[1] != clickedNumArr[0]-10) {
        // Reflip if unmatching

        // TODO: We should disable the event listener (onclick) here so that people can't click during the timeout.

        setTimeout(()=>{
          document.getElementById(randImgArr.indexOf(clickedIdArr[0])).src="./back.png";
          document.getElementById(randImgArr.indexOf(clickedIdArr[1])).src="./back.png";

          // TODO: Then re-enable it here, so that people can click cards again.

          clickedNumArr.length=0;
          clickedIdArr.length=0;
        },500);
      }
    }
  })
);

// Decision making is to be based on string value of img.src directly