/* 
Daniel corman
11/19/2013
prog 109

will pass JsLint assuming that browser, plusplus, and messy white space are checked off 
*/

/*jslint browser: true, plusplus: true, white: true */

//This compNumber object has many uses. It has the think function in it which generates the random number
//when it is triggered by the website's start button, also generating the text input bar and submit
//button. then the object also keeps track of the random number under chosen, and the level number under Level
//It also keeps track of how many times the user has guessed under count.

 


var compNumber={
	level:1,
	count:0,
	chosen:-1,
	
	think: function (){
	
	'use strict';
		document.getElementById("start").style.visibility="visible";
		compNumber.levelDone=false;
		document.getElementById("start").innerHTML = "Thinking...";
		
		//these if else cases define the different levels and depending on what
		//the level property is set two, the think function will supply that level.
		if(compNumber.level === 1){
			this.chosen=Math.floor((Math.random()*20))+1;
			document.getElementById("output").innerHTML = "Guess the number between 1-20";
			document.getElementById("picture").innerHTML="<img src='images/questionmarkCopy.png'  width='355' height='355' alt='guess a number.' >";
			
		}else if(compNumber.level === 2){
			this.chosen=Math.floor((Math.random()*50))+1;	
			document.getElementById("output").innerHTML = "Guess the number between 1-50";
			document.getElementById("picture").innerHTML="<img src='images/questionmarkc.png'  width='355' height='355' alt='guess a number.' >";
			
		}else if(compNumber.level === 3){
			this.chosen=Math.floor((Math.random()*100))+1;
			document.getElementById("output").innerHTML = "Guess the number between 1-100";
			document.getElementById("picture").innerHTML="<img src='images/questionmarkb.png'  width='355' height='355' alt='guess a number.' >";
			}
			
		document.getElementById("guesses").innerHTML = "5 attempt(s) left";
		document.getElementById("next").style.visibility="hidden";
		
		//2 second pause for the think function
		setTimeout(function(){
			document.getElementById("start").innerHTML = '<input id="input" type="text" onkeypress="searchKeyPress(event);"/>';
			document.getElementById("submit").innerHTML = '<input id="btnSearch" type="button" value="submit" onClick="game();" />';
			
			
			document.getElementById("submit").style.visibility="visible";
			document.getElementById("start").style.visibility="visible";
			},2000);
		}
	};
	//This is to listen for the enter key whenever there is a text box to type in.
	function searchKeyPress(e) {
           'use strict';
             // look for window.event in case event isn't passed in
             if (e === 'undefined' && window.event) { e = window.event; }
             if (e.keyCode === 13 && compNumber.levelDone===false) {
                 document.getElementById('btnSearch').click();
             }
             
         }


//This is where the game function starts. This single function is really the core of logic 
//portion of this program.
function game(){
	'use strict';
	
	//This is where the program gets input from the user
	var guessCounter,userNumber, userOutput;
	    guessCounter = document.getElementById("guesses");
	    userNumber=parseInt(document.getElementById("input").value,10);
	    userOutput=document.getElementById("output");
	

	userOutput.innerHTML = "...";

	
//1 second pause for guessing
setTimeout(function(){

//This is the final phase of the game for if the player finishes
//the third level. All buttons become hidden, the game congratulates the player
//with text and a picture, and the background color changes.
	if(userNumber === compNumber.chosen && compNumber.count <=4 && compNumber.level === 3){
		userOutput.innerHTML = "Congratulations!";
		guessCounter.innerHTML = "You are now the Guessing Game champion!";
		document.getElementById("picture").innerHTML="<img src='images/Congrats.jpg' height='255' width='458' alt='congratulations!' >";
		document.body.style.backgroundColor="magenta";
		document.getElementById("submit").style.visibility="hidden";
		document.getElementById("start").style.visibility="hidden";
		
		
//If the user submits the number equal to the comp's before count reaches 5 they
// win, and can click the next level button which triggers the think function 
//again. But this time the game function increases the level property  first.
// making the think function go to the next level.
//It also displays a picture if you win.
	}else if(userNumber === compNumber.chosen && compNumber.count <=4){
		userOutput.innerHTML = "Nice job!";
		guessCounter.innerHTML = "You beat level "+compNumber.level+"! Now get ready for level "+(1+compNumber.level)+".";
		compNumber.count=0;
		compNumber.level++;
		
		document.getElementById("submit").style.visibility="hidden";
		document.getElementById("start").style.visibility="hidden";
		
		document.getElementById("next").innerHTML = '<input id="next" type="button" value="Next level" onClick="compNumber.think();" />';
		document.getElementById("next").style.visibility="visible";
		document.getElementById("picture").innerHTML="<img src='images/smiley.png' width='300' height='300' alt='congratulations!' >";
		compNumber.levelDone = true;
	
//If the comp's number is greater or lesser than what the user submits, 
//then the comp gives the user a hint. The count variable also increases by 1 each time.
	}else if(compNumber.chosen > userNumber && compNumber.count <4){
		guessCounter.innerHTML = (5 - (compNumber.count+1)) + " attempt(s) left";
		userOutput.innerHTML = "The number I'm thinking of is larger.";

	compNumber.count++;

	}else if(compNumber.chosen<userNumber && compNumber.count <4){
		guessCounter.innerHTML = (5 - (compNumber.count+1)) + " attempt(s) left";
		userOutput.innerHTML = "The number I'm thinking of is smaller.";

	compNumber.count++;

//If count reaches 5 the comp wins, and any submissions after that tell the user the game is over.
//This also displays a picture.
	}else if(compNumber.count === 4){
	userOutput.innerHTML = "Game over!";
	guessCounter.innerHTML = "Refresh the page to play again.";
	document.getElementById("picture").innerHTML="<img src='images/frown.png' alt='better luck next time.' >";	
	document.getElementById("submit").style.visibility="hidden";
	document.getElementById("start").style.visibility="hidden";
	compNumber.count++;
	compNumber.levelDone = true;
	
	//Just encase the user submits a non-number, this message would trigger.
	}else{
	userOutput.innerHTML = "I don't recognize that as a number. Try something else.";
	guessCounter.innerHTML = (5 - compNumber.count) + " attempt(s) left";
	
	}
	},1000);
}

