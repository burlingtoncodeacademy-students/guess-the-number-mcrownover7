//Create options at end of each game to return to the main startup menu. Lines 320 and 160.

//Setting up the sleep function to allow for pauses in the execution of items. This delays them appearing in the terminal for a settable increment of time.
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  //Setting up the readline.
  const readline = require("readline");
  const rli = readline.createInterface(process.stdin, process.stdout);
  
  function ask(questionText) {
    return new Promise((res, rej) => {
      rli.question(questionText, res);
    });
  }
  //Setting global variables for the reverse version of the game. This will allow them to be updated and not have them be passed down functions.
  let min = 1;
  //The counter variable allows for counting of the number of guesses in both games. Both games have functions to reset them at the start of the games.
  let counter = 0;
  let maxInt;
  let guessReverse;
  let compNumber;
  //Setting up the global variables for the normal version of the game.
  let minValue = 1;
  let maxIntValue;
  let userIntValue;
  let guess;
  
  //Calling startup main menu.
  combinedStartup();
  //Creating a main menu to allow for selection of which game wants to be played.
  async function combinedStartup() {
    console.log(
      "Hello! Welcome to BCA's week 1 project.\nThere are two available games.\nOne has a computer attempt to guess your selected number.\nThe other reverses the game and makes you guess the computer's number!"
    );
    //Using the sleep function to cause a delay in the execution of the script.
    await sleep(3000);
    let gameSelect = await ask(
      "Please select either the normal or reverse version. Make sure to type either 'normal' or 'reverse'!\n"
    );
    //If statement to rule out unexpected inputs.
    if (
      gameSelect.toLowerCase() != "normal" &&
      gameSelect.toLowerCase() != "reverse"
    ) {
      console.log(
        "You did not select either normal or reverse mode.\nRestarting menu."
      );
      await sleep(3000);
      //Clearing the console and restarting the main menu function.
      console.clear();
      combinedStartup();
      //Else statement to send it to the normal version of the game.
    } else if (gameSelect.toLowerCase() === "normal") {
      console.log(
        "You selected the normal Guess the Number game. Have Fun!\nLoading Game..."
      );
      await sleep(5000);
      console.clear();
      startup();
      //Else statement to send it to the reverse version of the game.
    } else {
      console.log(
        "You selected the reverse Guess the Number game. Have Fun!\nLoading Game..."
      );
      await sleep(5000);
      console.clear();
      startupReverse();
    }
  }
  
  //Creating the startup for the standard version of the game.
  async function startup() {
    //Resetting the counter global variable
    counter = 0;
    console.log(
      "Welcome to Guess the Number!\nThink of a random number greater than 1 but less than any maximum value.\nTo start we need some information..."
    );
    await sleep(3000);
    //Asking the user for a max value.
    let maxValue = await ask(
      "What do you want the max number to be in our game?\nNote your selected number cannot exceed this value!!!\n"
    );
    //Calling sleep to delay after previous user input and asking for the random number.
    await sleep(1500);
    let userValue = await ask("Please enter the random number you thought of!\n");
    //Updating global variables with new parseInt of the strings from the user input values to change the strings to numbers.
    maxIntValue = parseInt(maxValue);
    userIntValue = parseInt(userValue);
    await sleep(1500);
    //If statement needed to catch users inputting values that are not numerical. If they entered incorrect data they are returned to the startup.
    if (
      Number.isNaN(maxIntValue) === true ||
      Number.isNaN(userIntValue) === true
    ) {
      console.log("You entered responses that are not numerical values.");
      await sleep(3000);
      console.clear();
      startup();
      //Error message to ensure that the user input a value that is greater or equal to 1.
    } else if (userIntValue < minValue) {
      console.log(
        "You tried to cheat!!!\nNext time select a value greater or equal to 1."
      );
      await sleep(3000);
      console.clear();
      startup();
      //Error message to ensure that the user picked a number that was less than their selected max value.
    } else if (userIntValue > maxIntValue) {
      console.log(
        "You should learn to follow instructions!\nNext time please make sure your random number is less than or equal to the maximum value."
      );
      await sleep(3000);
      console.clear();
      startup();
      //Message for passing all the checks and continuing in the script.
    } else {
      console.log(
        `Congrats! You followed instructions and selected...\nA max value of ${maxIntValue}\nYou entered ${userIntValue}\nNow the computer will attempt to guess your selected number!`
      );
      //Calling sleep to delay next question.
      await sleep(3000);
      valueGuesser();
    }
  }
  
  //Creating another function to handle the initial guess. Using an equation to determine the guess to make in the center of the range.
  async function valueGuesser() {
    //This is used to increment the counter global variable each time the valueGuesser is ran.
    counter++;
    guess = minValue + Math.floor((maxIntValue - minValue) / 2);
    //Asking if the guess was right or wrong.
    let guessYesNo = await ask(
      `My guess is ${guess}!\nIs this correct? Yes or No?\n`
    );
    //Calling sleep to delay next question.
    await sleep(1500);
    //Ensuring that the input was yes or no.
    if (guessYesNo.toLowerCase() != "no" && guessYesNo.toLowerCase() != "yes") {
      console.log("Why didn't you type yes or no?");
      await sleep(3000);
      console.clear();
      startup();
      //Anti-cheat check to make sure the guess was actually incorrect like the user responded.
    } else if (guess === userIntValue && guessYesNo.toLowerCase() != "yes") {
      console.log(
        "You were trying to cheat! My guess was the same as your selected number.\nBEGONE!!!"
      );
      await sleep(3000);
      console.clear();
      startup();
      //Win statement if input is yes.
    } else if (guessYesNo.toLowerCase() === "yes") {
      console.log(
        `I guessed it correctly!\nYour number was ${guess}!\nIt only took me ${counter} guess(es)!`
      );
      await sleep(1500);
      //Asking if the user wants to replay the game.
      let restartQuestion = await ask(
        "Do you want to play again?\nPlease enter Yes or No!\nIf you wish to return to the main startup menu, type Menu!\n"
      );
      if (
        restartQuestion.toLowerCase() != "yes" &&
        restartQuestion.toLowerCase() != "no" &&
        restartQuestion.toLowerCase() != "menu"
      ) {
        console.log(
          "I guess... that you cannot follow instructions!\nExiting the game..."
        );
        await sleep(3000);
        console.clear();
        startup();
        //Restarting the game after clearing the console.
      } else if (restartQuestion.toLowerCase() === "yes") {
        console.log("Restarting the game! Give me a second.");
        await sleep(3000);
        console.clear();
        startup();
      } else if (restartQuestion.toLowerCase() === "menu") {
        console.log("Returning to the main menu! Give me a second.");
        await sleep(5000);
        console.clear();
        combinedStartup();
      } else {
        console.log("Thank you for playing!");
        process.exit();
      }
      //Catch all else to proceed to the highLow function to determine if the guess was higher or lower.
    } else {
      console.log(`My guess was wrong! Oh well, moving on!`);
      await sleep(3000);
      highLow();
    }
  }
  
  //Creating a helper function to check if the user value is higher or lower than the guess.
  async function highLow() {
    let highLowQuestion = await ask(
      `Is your number higher or lower than my guess of ${guess}?\nPlease type either higher or lower!\n`
    );
    await sleep(1500);
    //If to catch if a response is not higher or lower.
    if (
      highLowQuestion.toLowerCase() != "higher" &&
      highLowQuestion.toLowerCase() != "lower"
    ) {
      console.log("Why didn't you type higher or lower?");
      await sleep(3000);
      console.clear();
      startup();
      //Anti-cheat to make sure that the users higher or lower response is truthful.
    } else if (guess > userIntValue && highLowQuestion.toLowerCase() != "lower") {
      console.log(
        "You are trying to cheat again...\nNext time try being honest with your answer!"
      );
      await sleep(3000);
      console.clear();
      startup();
      //Anti-cheat to make sure that the users higher or lower response is truthful.
    } else if (
      guess < userIntValue &&
      highLowQuestion.toLowerCase() != "higher"
    ) {
      console.log(
        "You are trying to cheat again...\nNext time try being honest with your answer!"
      );
      await sleep(3000);
      console.clear();
      startup();
      //Else statements to send to the correct higher or lower functions.
    } else if (highLowQuestion.toLowerCase() === "higher") {
      console.log("So your chosen number is higher than my guess.\nhmm...");
      await sleep(3000);
      ifHigher();
    } else {
      console.log("So your chosen number is lower than my guess.\nhmm...");
      await sleep(3000);
      ifLower();
    }
  }
  
  //Creating a function to alter the minValue based off the guess.
  function ifHigher() {
    //Updating the minValue global variable
    minValue = guess + 1;
    valueGuesser();
  }
  
  //Creating a function to alter the maxValue based off the guess.
  function ifLower() {
    //Updating the maxIntValue global variable
    maxIntValue = guess - 1;
    valueGuesser();
  }
  
  //Creating a function to startup the reverse version of the game.
  async function startupReverse() {
    //resetting the counter global variable to handle game restarts.
    counter = 0;
    console.log(
      "Welcome to Reverse Guess the Number!\nIn this version of the game you will give the computer a maximum number it can select.\nThen it will generate a random number!\nIt is your job to guess that number!"
    );
    //Sleep function to delay the next item appearing for the user.
    await sleep(3000);
    let max = await ask(
      "For this game, what would you like the computer's highest possible number to be?\nPlease note that it has to be greater than 1.\n"
    );
    //Parsing the string returned from the user input.
    maxInt = parseInt(max);
    await sleep(1500);
    //If statement to ensure that the user input a number
    if (Number.isNaN(maxInt) === true) {
      console.log(
        "You entered responses that are not numbers!\nTry starting again!"
      );
      await sleep(3000);
      //Clearing the console and restarting the game.
      console.clear();
      startupReverse();
    } else if (maxInt <= min) {
      console.log(
        "You should read the directions next time and pick a number > 1!"
      );
      await sleep(3000);
      //Clearing the console and restarting the game.
      console.clear();
      startupReverse();
    } else {
      console.log(
        "Your maximum value was stored.\nNow generating a random number!"
      );
      await sleep(1500);
      console.log(
        "Now it is your turn to guess the number!\nIf you answer wrong the computer will let you know if their number was higher or lower than your guess!"
      );
      await sleep(3000);
      //Calling the randomNum function to generate the computers number.
      randomNum();
      //Calling the reverseGame function that handles the users guesses and higher/lower.
      reverseGame();
    }
  }
  
  //Creating a reverse game function that allows for user guesses to be input and handling of returning info on lower or higher than the computers.
  async function reverseGame() {
    //Incrementing the counter variable for the number of guesses made.
    counter++;
    guessReverse = await ask("What is your guess?\n");
    //Parsing the string into a number.
    guessReverse = parseInt(guessReverse);
    await sleep(1500);
    //Check to ensure that a numerical value was entered in the above ask prompt. If not the game is restarted.
    if (Number.isNaN(guessReverse) === true) {
      console.log(
        "You entered responses that are not numbers!\nTry starting again!"
      );
      await sleep(3000);
      //Clearing the console and restarting the game.
      console.clear();
      startupReverse();
      //If statement for a correct guess. Allows the user to then either restart or exit the game.
    } else if (guessReverse === compNumber) {
      console.log(`You got it!!! It only took you ${counter} guess(es)!`);
      await sleep(1500);
      let restartQuestion = await ask(
        "Do you want to play again?\nPlease enter Yes or No!\nIf you wish to return to the main startup menu, type Menu!\n"
      );
      if (
        restartQuestion.toLowerCase() != "yes" &&
        restartQuestion.toLowerCase() != "no" &&
        restartQuestion.toLowerCase() != "menu"
      ) {
        console.log(
          "I guess... that you cannot follow instructions!\nExiting the game..."
        );
        process.exit();
        //If yes is input then the console is cleared to maintain a cleaner terminal and the game is restarted.
      } else if (restartQuestion.toLowerCase() === "yes") {
        console.log("Restarting the game! Give me a second.");
        await sleep(3000);
        console.clear();
        startupReverse();
      } else if (restartQuestion.toLowerCase() === "menu") {
        console.log("Returning to the main menu! Give me a second.");
        await sleep(5000);
        console.clear();
        combinedStartup();
      } else {
        console.log("Thank you for playing!");
        process.exit();
      }
      //An incorrect guess will trigger the internal if else statement that allows the program to let the user know if the computers number is higher or lower than the user's guess. The function is then restarted fresh for another guess from the user.
    } else {
      console.log("Your guess was incorrect.\nDetermining if higher or lower...");
      await sleep(3000);
      if (guessReverse > compNumber) {
        console.log(
          `The computer's number was lower than your guess of ${guessReverse}.`
        );
        await sleep(3000);
        reverseGame();
      } else {
        console.log(
          `The computer's number was higher than your guess of ${guessReverse}.`
        );
        await sleep(3000);
        reverseGame();
      }
    }
  }
  
  //Standard random number function to generate a user
  function randomNum() {
    let range = maxInt - min + 1;
  
    compNumber = Math.floor(Math.random() * range) + min;
  }
  