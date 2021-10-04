//Creating a sleep function that will take an input and then create a setTimeout using that value.
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

//Create a counter global variable that counts the number of guesses in the valueGuesser function.
let counter = 0;
let minValue = 1;
let maxIntValue;
let userIntValue;
//Create a global guess variable so each function can access without inherit issues. It gets updated in the valueGuesser on each subsequent function run.
let guess;

//Calling the initial startup.
startup();

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
      "Do you want to play again?\nPlease enter Yes or No!\n"
    );
    if (
      restartQuestion.toLowerCase() != "yes" &&
      restartQuestion.toLowerCase() != "no"
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
