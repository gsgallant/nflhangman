// Greg Gallant February 2016


window.onload=function(){
//setting up some local variables
var football = ["texans","steelers","giants", "jets", "broncos", "panthers", "buccaneers", "bills", "dolphins", "patriots", "bengals", "browns", "ravens", "falcons","vikings", "packers", "lions","bears", "colts", "jaguars", "titans","cardinals","chiefs","raiders","chargers","saints","cowboys","eagles","redskins","rams","49ers","seahawks"];
var totalWins = 0;//keeps track of all wins
var totalLosses = 0;//tracks all losses
var endOfGame = false;//flag for endOfGame to disallow extra key presses during 2 second delay for display of logo, reset values, etc.
var reminders = "";// string containing all data such as guesses made, guesses allowed, etc.
var targetWord = "";//this is the team that is selected randomly
var maxGuessesAllowed = Math.floor(targetWord.length*1.8); //maximum allowed guesses calc by length of target word.
var priorGuesses =[];//array holding all prior guesses
var correctGuesses = 0;//correct number of guesses used to calculate if the end of game is a winner
var guessesMade = 0;// total number of guesses made.
var correctFlag = false;//a flag for keeping track of a correct guess so that the solution array can be updated
var userGuess = "";//holds the keypress
var solution = [];//holds underscores and correct letters during the game.
var usedLettersDisplay = [];//holds the used letters during the game
var delay=3000;//3 seconds delay at end of game before a reset
var winaudio = new Audio('assets/audio/nfltheme.mp3');//winner audio
var loseaudio = new Audio('assets/audio/wronganswer.mp3');//loser audio
var teamImages = "assets/images/teams/";//path to teams logo images
var refPic = $('<img src=assets/images/refbw.gif>');

$("#refPicLeft").append(refPic);
$("#refPicRight").append(refPic)

//function for starting a new game and resetting some variables
	function startNewGame(){
							$("#refPicLeft").hide();
							$("#refPicRight").hide();
							endOfGame = false;
							reminders = "";
							targetWord = football[Math.floor(Math.random() * football.length)];
							maxGuessesAllowed = Math.floor(targetWord.length*1.8);
							priorGuesses =[];
							correctGuesses = 0;
							guessesMade = 0;
							maxGuessesAllowed = Math.floor(targetWord.length*1.8);
							correctFlag = false;
							userGuess = "";
							solution = [];
							usedLettersDisplay = [];
							for (i=0; i < targetWord.length; i++){
									solution.push("_ ");
							}	
							//within the startNewGame function is the setup of the screen for the new game.
							game.makeShowSolution();
							game.showReminders();
							$("#jQuery-area").empty();
							document.querySelector('#winOrLose').innerHTML = "Kickoff!";
							document.getElementById('bkgrd').style.backgroundImage="url(assets/images/goalposts.png)";
							
	}
	//This is an object containing some code that is used repeatedly.
	var game = { 
			checkGuess : function(userGuess){
						
						// Check to see if the key press is in the priorGuesses array, if not, push it and increment guessesMade ELSE ignore.
						priorGuess = false
						for (i=0; i < priorGuesses.length; i++){
							if (priorGuesses[i] == userGuess){
								priorGuess = true
								
							}
						}
						//check to see if the userguess is in the target word.  if yes, increment correctguesses for each occurence and place the letter in the solution array at the appropriate location.
						if (priorGuess == false){
							priorGuesses.push(userGuess);
							guessesMade++;
							
							correctFlag = false;
							for (i=0; i < targetWord.length; i++){
								if (targetWord[i] == userGuess){
									correctGuesses++;
									correctFlag = true;
									//place the letter in the appropriate spot in the solution array.
									solution[i] = userGuess;
								}
							}
							
							if (correctFlag === false){
								usedLettersDisplay = usedLettersDisplay + userGuess + ", ";
							}		
						}		
				
			},
			// makes a display of letters and underscores from the array which is incrementally getting pushed the correct letter guesses.
			makeShowSolution : function(){
							var showSolution = "<p>";
							for (i=0; i<solution.length; i++){
								showSolution = showSolution + solution[i]+" ";
							}
								showSolution = showSolution + "</p>";
		
							// Placing the html into the game ID
							document.querySelector('#keepTrack').innerHTML = showSolution;
			},
			showReminders : function(){
					//update the display for guesses made & guesses left
					// Placing the html into the game ID
						
							reminders = "<p>Total Wins: " + totalWins + "</p><p> Total Losses: "+ totalLosses + "</p><p>Guesses Remaining: " + (maxGuessesAllowed - guessesMade) + "</p>" +
							"<p> Guesses used: " + guessesMade + "</p>" + "<p>"+ "Wrong guesses: " + usedLettersDisplay + "</p>"
							
							document.querySelector('#letters').innerHTML = reminders;
			}
	}
						
	
    // jQuery used for the team logo image that is displayed at the end of each game.  JQuery is very useful for this!!!
    $( document ).ready(function() {
      function showLogo() { 
      		
      		var pathToLogo = '<img src=' + teamImages +  targetWord +'.gif>'
			var pic = $(pathToLogo);
			$("#jQuery-area").append(pic);
        };
	
	
		//The game begins here, plays the NFL theme and calls the startNewGame function:
			winaudio.play();
			startNewGame();
			
			//begin accepting keystrokes(keyup event)
			document.onkeyup = function(event) {
				var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
						if (endOfGame === false){
								//check the user's guess 			
								game.checkGuess(userGuess);

								//update the letters and underscores
								game.makeShowSolution();

								//update the reminders (guesses made and max guesses allowable)
								game.showReminders();

								//if the correctguesses is equal to the target word length>winner
								if (correctGuesses==targetWord.length){
									
									document.querySelector('#winOrLose').innerHTML = "Touch Down!";
									
									totalWins++;
									endOfGame = true;
									$("#refPicLeft").show();
									$("#refPicRight").show();
									// document.getElementById('bkgrd').style.backgroundImage="url(assets/images/refs.jpg)"; 
									winaudio.play();

								//if the maxguessesallowed is equal to the number of guesses made (without first being a winner)>loser.
								}else if (maxGuessesAllowed==guessesMade){
										document.querySelector('#keepTrack').innerHTML = "Correct Answer: <p></p>" + targetWord;
										document.querySelector('#winOrLose').innerHTML = "Fumble!";
										
										totalLosses++;
										endOfGame = true;
										
										document.getElementById('bkgrd').style.backgroundImage="url(assets/images/nfllogos.jpg)";
										loseaudio.play();
									{
										
										
									}
								}
								
								game.showReminders();
								
								if (endOfGame == true){
									showLogo();
									setTimeout(function(){
									  startNewGame();
									}, delay); 
			
								}
						}
			}
		});
}
