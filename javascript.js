/*pseudocode

I.) when we click on start/reset  button 
if( we are playing)
{
reload page
}
else{
    0.)set score to zero
    1.)start timer box
    2.)reduce countdown by one per sec
    if(time is not zero){
        reduce count by one per sec
    }
    else{
        show game over and score
    }

    3.)change start game to reset game
    4.)generate new questions and answers
}

II.)when we click on one of the options
if(we are noe playing ){
    do nothing
}
else{
    if(our option is  not correct){
        show try agin for a sec
    }
    else{
        1.)increase score by one
        2.)show correct box for one sec
        3.)generate new questions and answers
    }
}
*/
var isPlaying =false;
var score=0;;
var timeRemaining;
var action;
var correctAnswer;
// clicking the start Reset game
document.getElementById('startReset').onclick=function(){
    if(isPlaying==true){
        // reload page method
        location.reload();
    }
    else{
        // set isPlaying to true
        isPlaying=true;
        // setScore(0);
        score=0;
        document.getElementById('scoreValue').innerText=score;
        // show countdown box and hide gameover box
        show("timeRemaining");
        hide("gameOver");
          timeRemaining=60;
          document.getElementById('timeValue').innerHTML=timeRemaining;
        //changeButton(start,reset)
        document.getElementById('startReset').innerHTML='Reset Game';
        // startTimer()
        startTimer();
        // startCounting
        
        // generateQuestions
            generateQA();
    }
}

for(let i=1;i<5;i++){
    // clicking on any of the answer boxes
document.getElementById("box"+i).onclick=function(){
    // if we are playing
    if(isPlaying==true){
        // check if we have clicked the right answer
        if(this.innerHTML==correctAnswer){
            // increment score
            score++;
            // show the incremented score
            document.getElementById("scoreValue").innerHTML=score;

            // show correct box and hide incorrect box
            hide("tryAgain");
            show("correct");
            // wait for a second and hide the correct box again
            setTimeout(function(){
               hide("correct");
            },1000);
            // generate new q and a
            generateQA();
        }
        else{// we have chosen the wrong answer

// show incorrect box and hide correct box
            hide("correct");
            show("tryAgain");
            // wait for a second and hide the correct box again
            setTimeout(function(){
               hide("tryAgain");
            },1000)
        }

    }
}
}


// functions 
function startTimer(){
action=setInterval(function(){
timeRemaining-=1;
document.getElementById('timeValue').innerHTML=timeRemaining;
if(timeRemaining==0){//  i.e game over
    //  stop timer
    stopCountdown();
    // show game over and the score with it
    show('gameOver');
     
     document.getElementById('gameOver').innerHTML="<p>GAME OVER</p> <p> your score is:- "+score+"</p>";

     // hide time remaining box 
     hide('timeRemaining');
     hide("correct");
     hide("tryAgain");
     isPlaying=false;
     document.getElementById('startReset').innerHTML='START GAME';
     
     
}
},1000)
}

function stopCountdown(){
    clearInterval(action);
}

function show(id){
    document.getElementById(id).style.display='block';
}

function hide(id){
    document.getElementById(id).style.display='none';
}

function generateQA(){
var x=1+Math.round(10*Math.random());
var y=1+Math.round(10*Math.random());
correctAnswer=x*y;
// printing question to screen
document.getElementById("question").innerHTML=x+"*"+y;

// putting right answer in one of the boxes
var correctPosition=1+Math.round(Math.random()*3);
document.getElementById("box"+correctPosition).innerHTML=correctAnswer;

// putting wrong answer in rest of the boxes

// we don'ty want any same correct answers,so
var answers=[correctAnswer];
for(let i=1;i<5;i++){
    if(i!=correctPosition){
       var wrongAnswer;
       do{
         wrongAnswer=(1+Math.round(Math.random()*9))*(1+Math.round(Math.random()*9));
        
       }while(answers.indexOf(wrongAnswer)>-1);
            answers.push(wrongAnswer);
       document.getElementById("box"+i).innerHTML=wrongAnswer;
    }
}
};