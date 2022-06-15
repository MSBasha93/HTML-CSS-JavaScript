const imgArr=["./num0.jpg", "./num1.png", "./num2.png", "./num3.png", "./num4.png", "./num5.png", "./num6.jpeg"
, "./num7.png", "./num8.png", "./num9.jpg", "./num10.jpg", "./num11.png", "./num12.png", "./num13.png"
, "./num14.png", "./num15.png", "./num16.jpeg", "./num17.png", "./num18.png", "./num19.jpg"];
var clickedNumArr=[]; 
var clickedIdArr=[];
var randImgArr=[ "./num0.jpg","./num1.png", "./num2.png", "./num3.png", "./num4.png", "./num5.png", "./num6.jpeg"
, "./num7.png", "./num8.png", "./num9.jpg","./num10.jpg", "./num11.png", "./num12.png", "./num13.png"
, "./num14.png", "./num15.png", "./num16.jpeg", "./num17.png", "./num18.png", "./num19.jpg"];

// Randomize img locations 
function shuffle(o) {
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};
var random = shuffle(randImgArr);
var timeOut;


//Game play code
const images = document.querySelectorAll("#images img");
    //flip when clicked
    images.forEach(img => 
      img.onclick= function () {
        clearTimeout(timeOut);
        this.src=randImgArr[this.id];
        clickedNumArr.unshift(imgArr.indexOf(randImgArr[this.id]));
        clickedIdArr.unshift(randImgArr[this.id]);
        console.log(clickedNumArr)
        console.log(clickedIdArr)
        //check matching if two cards are clicked
        if(clickedNumArr[1]!=null){
          //check to delete if matching
          if(clickedNumArr[0]==clickedNumArr[1]-10 || clickedNumArr[1]==clickedNumArr[0]-10 ){
            
            document.getElementById(randImgArr.indexOf(clickedIdArr[0])).classList.add("delete");
            document.getElementById(randImgArr.indexOf(clickedIdArr[1])).classList.add("delete");
            clickedNumArr.length=0;
            clickedIdArr.length=0;
              
            
          }
          //check to reflip if unmatching  
          else if(clickedNumArr[0]!=clickedNumArr[1]-10 || clickedNumArr[1]!=clickedNumArr[0]-10){
            
           setTimeout(()=>{
           document.getElementById(randImgArr.indexOf(clickedIdArr[0])).src="./back.png";
           document.getElementById(randImgArr.indexOf(clickedIdArr[1])).src="./back.png";
           
           clickedNumArr.length=0;
           clickedIdArr.length=0;
          },500);
          
          }
     
        }
      
      
      }
    ); 

     
//decision making is to be based on string value of img.src directly 