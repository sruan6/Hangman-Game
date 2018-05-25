//GLOBAL VARIABLES
//---------------------------------------
// Used to record how many times a letter can be pressed
var doubleWord = ['A','B','C',
					  'D','E','F',
					  'G','H','I',
					  'J','K','L',
					  'M','N','O',
					  'P','Q','R',
					  'S','T','U',
					  'V','W','X',
					  'Y','Z'];
//Holds the all the words
var wordBank =['AATROX', 'AHRI', 'AKALI', 'ALISTAR', 'AMUMU', 'ANIVIA', 'ANNIE', 'ASHE', 'AURELIONSOL', 'AZIR', 'BARD', 'BLITZCRANK', 'BRAND', 'BRAUM', 
'CAITLYN', 'CAMILLE', 'CASSIOPEIA', 'CHOGATH', 'CORKI', 'DARIUS', 'DIANA', 'DRMUNDO', 'DRAVEN', 'EKKO', 'ELISE', 'EVELYNN', 'EZREAL', 'FIDDLESTICKS', 
'FIORA', 'FIZZ', 'GALIO', 'GANGPLANK', 'GAREN', 'GNAR', 'GRAGAS', 'GRAVES', 'HECARIM', 'HEIMERDINGER', 'ILLAOI', 'IRELLA', 'IVERN', 'JANNA', 'JARVAN', ' JAX',
'JAYCE', 'JHIN', 'JINX', 'KAISA', 'KALISTA', 'KARMA', 'KARTHUS', 'KASSADIN', 'KATARINA', 'KAYLE', 'KAYN', 'KENNEN', 'KHAZIX', 'KINDRED', 'KLED', 'KOGMAW', 'LEBLANC', 
'LEESIN', 'LEONA', ' LISSANDRA', 'LUCIAN', 'LULU', 'LUX', 'MALPHITE', 'MALZAHAR', 'MAOKAI', 'MASTERYI'];
//Holds choosenWord
var choosenWord = "";
//Holds letters in word
var lettersInWord = [];
//Holds number of blanks in word
var numBlanks = 0;
//Holds Blanks and successful guesses
var blanksAndSuccesses =[];
//Holds Wrong guesses
var wrongLetters = [];
//Counters
var winCount = 0;
var loseCount = 0;
var killCount = 0;
var guessesLeft = 5;
var rightGuessCounter = 0;
var progressBar = 100;
var NewprogressBar = 0;
var totalGame = 0;
// sounds
// var winElement = document.createElement("audio");
// winElement.setAttribute("src", "assets/sound/Super Mario Bros - Level Complete.mp3");
// var loseElement = document.createElement("audio");
// loseElement.setAttribute("src", "assets/sound/210-game-over.mp3");


//FUNCTIONS
//----------------------------------------
function reset()
{
	//Chooses word randombly from the wordBank
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen word into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	//===========================================================
	letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 5;
	progressBar = 100;
	wrongLetters =[];
	blanksAndSuccesses =[];
	doubleWord = ['A','B','C',
					  'D','E','F',
					  'G','H','I',
					  'J','K','L',
					  'M','N','O',
					  'P','Q','R',
					  'S','T','U',
					  'V','W','X',
					  'Y','Z'];
	test=false;
	startGame();
}
//MAIN PROCCESS
//-------------------------------------------	
//Initiates the Code

startGame();

document.onkeyup = function(event)
{
	test = true;
	var letterGuessed = event.key.toUpperCase();
	for(var i = 0; i < doubleWord.length; i++)
	{	
		if(letterGuessed === doubleWord[i] && test === true)
		{
			var spliceDword = doubleWord.splice(i,1);
			//Test / Debug
			console.log('Double word is = ' + doubleWord[i])
			console.log('Spliced Word is = ' + spliceDword);

			compareLetters(letterGuessed);
			winLose();
		}
	}		
		
}

function startGame()
{
	//Chooses word randombly from the wordBank
	choosenWord = wordBank[Math.floor(Math.random() * wordBank.length)];
	//Splits the choosen word into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks
	numBlanks = lettersInWord.length;
	
	//RESET
	//===========================================================
	rightGuessCounter = 0;
	guessesLeft = 5;
	wrongLetters =[];
	blanksAndSuccesses =[];
	doubleWord = ['A','B','C',
					  'D','E','F',
					  'G','H','I',
					  'J','K','L',
					  'M','N','O',
					  'P','Q','R',
					  'S','T','U',
					  'V','W','X',
					  'Y','Z'];

	//Populate blanks
	for(var i = 0; i< numBlanks; i++)
	{
		blanksAndSuccesses.push('_');
		document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses;
	}

	//Changes HTML 
	document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
	document.getElementById('numGuesses').innerHTML = guessesLeft;
	document.getElementById('winCounter').innerHTML = winCount;
	document.getElementById('lossCounter').innerHTML = loseCount;
	document.getElementById('wrongGuesses').innerHTML = wrongLetters;
	document.getElementById('progressbar').style.width = '100%';
	if(winCount >= 1){
	document.getElementById('win').innerHTML = winCount+' WINS';
	}
	// Testing / Debugging
	console.log(choosenWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
	ranking();
}

function compareLetters(userKey)
{
				console.log('WORKING!');
				//If user key exist in choosen word then perform this function 
				if(choosenWord.indexOf(userKey) > -1)
				{
					//Loops depending on the amount of blanks 
					for(var i = 0; i < numBlanks; i++)
					{
						//Fills in right index with user key
						if(lettersInWord[i] === userKey)
						{
							rightGuessCounter++;
							blanksAndSuccesses[i] = userKey;
							document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
						}	
					}
					//Test / Debug
					console.log(blanksAndSuccesses);
				}
				//Wrong Keys
				else
				{
					wrongLetters.push(userKey);
					guessesLeft--;
					NewprogressBar = (progressBar-=20)
				
					//Changes HTML
					document.getElementById('numGuesses').innerHTML = guessesLeft;
					document.getElementById('wrongGuesses').innerHTML = wrongLetters;
					document.getElementById('progressbar').style.width = NewprogressBar+"%";
					//Test / Debug
					console.log('Wrong Letters = ' + wrongLetters);
					console.log('Guesses left are ' + guessesLeft);
					console.log(progressBar)
				}
			
			
		
}
function winLose()
{
	// When number blanks if filled with right words then you win
	if(rightGuessCounter === numBlanks)
	{	
		// winElement.play();
		//Counts Wins 
		winCount++;
		totalGame++;
		killCount++;
		if(killCount === 2){
			console.log('Doublekill');
		}else if(killCount === 3){
			console.log('Triplekill');
		}else if(killCount === 4){
			console.log('QuadraKill');
		}else if(killCount === 5){
			console.log('Pentakill');
		};
		//Changes HTML
		document.getElementById('winCounter').innerHTML = winCount;
		setTimeout(function(){ alert('VICTORY');  }, 10);
		setTimeout(function(){ 
			reset();  
		}, 1000);
	}
	// When number of Guesses reaches 0 then You lose
	else if(progressBar === 0)
	{	
		// loseElement.play();
		//Counts losses
		loseCount++;
		totalGame++;
		if(killCount > 2) {
			console.log('Shutdown')
		};
		killCount = 0;
		//Changes HTML
		document.getElementById('lossCounter').innerHTML = loseCount;
		setTimeout(function(){ alert('DEFEAT'); }, 10);
		setTimeout(function(){ 
			reset(); 
		}, 1000);
	}
}
function ranking()
{
	var winRate = ((winCount)/(totalGame));

	//rank
	if( totalGame >= 9) {
		if(winRate == 1) {
			document.getElementById('ranking').src = "./assets/images/challenger.png";
			console.log("winRate:"+ winRate + "totalGame:"+ totalGame);
			document.getElementById('current_ranking').innerHTML = 'CHALLENGER';
		}else if(winRate < 1 && winRate > .9){
			document.getElementById('ranking').src = "./assets/images/master.png";
			console.log("winRate:"+ winRate + "totalGame:"+ totalGame);
			document.getElementById('current_ranking').innerHTML = 'MASTER';
		}else if(winRate < .91 && winRate > .8){
			document.getElementById('ranking').src = "./assets/images/diamond.png";
			console.log("winRate:"+ winRate + "totalGame:"+ totalGame);
			document.getElementById('current_ranking').innerHTML = 'DIAMOND';
		}else if(winRate < .81 && winRate > .7){
			document.getElementById('ranking').src = "./assets/images/platinium.png";
			console.log("winRate:"+ winRate + "totalGame:"+ totalGame);
			document.getElementById('current_ranking').innerHTML = 'PLATINUM';
		}else if(winRate < .71 && winRate > .6){
			document.getElementById('ranking').src = "./assets/images/gold.png";
			console.log("winRate:"+ winRate + "totalGame:"+ totalGame);
			document.getElementById('current_ranking').innerHTML = 'GOLD';
		}else if(winRate < .61 && winRate > .5){
			document.getElementById('ranking').src = "./assets/images/silver.png";
			console.log("winRate:"+ winRate + "totalGame:"+ totalGame);
			document.getElementById('current_ranking').innerHTML = 'SILVER';
		}else{
			document.getElementById('ranking').src = "./assets/images/bronze.png";;
			console.log("winRate:"+ winRate + "totalGame:"+ totalGame);
			document.getElementById('current_ranking').innerHTML = 'BRONZE';
		}
	}else{
		console.log('unrank');
		console.log("winRate:"+ winRate + "totalGame:"+ totalGame);
	}
	//unRank
}


