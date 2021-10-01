//Creating a sleep function that will take an input (line 12) and then create a setTimeout using that value.
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

startup();

async function startup() {
  //Resetting the counter global variable
  counter = 0;
  console.log(
    "Welcome to Guess the Number!\nThink of a random number greater than 1 but less than any maximum value.\nTo start we need some information..."
  );
  //NOTE: may want to set min as global variable
  //let minValue = 1;
  //Asking the user for a max value.
  let maxValue = await ask(
    "What do you want the max number to be in our game?\nNote your selected number cannot exceed this value!!!\n"
  );
  //Calling sleep to delay after previous user input and asking for the random number.
  await sleep(1000);
  let userValue = await ask("Please enter the random number you thought of!\n");
  //Creating new variables that parseInt the user input values to change the strings to numbers.
  //let minIntValue = minValue;
  //NOTE: THESE ARE ALREADY DECLARED
  maxIntValue = parseInt(maxValue);
  userIntValue = parseInt(userValue);
  //Calling sleep to delay next question.
  await sleep(1000);
  //If statement needed to catch users inputting values that are not numerical.
  if (
    Number.isNaN(maxIntValue) === true ||
    Number.isNaN(userIntValue) === true
  ) {
    console.log("You entered responses that are not numerical values.");
    process.exit();
    //Error message to ensure that the user input a value that is greater or equal to 1.
  } else if (userIntValue < minValue) {
    console.log(
      "You tried to cheat!!!\nNext time select a value greater or equal to 1."
    );
    process.exit();
    //Error message to ensure that the user picked a number that was less than their selected max value.
  } else if (userIntValue > maxIntValue) {
    console.log(
      "You should learn to follow instructions!\nNext time please make sure your random number is less than or equal to the maximum value."
    );
    process.exit();
    //Message for passing all the checks and continuing in the script.
  } else {
    console.log(
      `Congrats! You followed instructions and selected...\nA max value of ${maxIntValue}\nYou entered ${userIntValue}\nNow the computer will attempt to guess your selected number!`
    );
    //Calling sleep to delay next question.
    await sleep(1000);
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
  await sleep(1000);
  //Ensuring that the input was yes or no.
  if (guessYesNo.toLowerCase() != "no" && guessYesNo.toLowerCase() != "yes") {
    console.log("Why didn't you type yes or no?");
    process.exit();
    //Win statement if input is yes.
  } else if (guessYesNo.toLowerCase() === "yes") {
    console.log(
      `I guessed it correctly!\nYour number was ${guess}!\nIt only took me ${counter} guess(es)!`
    );

    await sleep(1000);
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
      process.exit();
    } else if (restartQuestion.toLowerCase() === "yes") {
      console.log("Restarting the game! Give me a second.");
      await sleep(2000);
      startup();
    } else {
      console.log("Thank you for playing!");
      process.exit();
    }

    //Incorrect guess statement sends user to the higher or lower function. NOTE CHECK IF THEY LIED!
  } else {
    console.log(`My guess was wrong! Oh well, moving on!`);
    await sleep(1000);
    highLow();
  }
}

//Creating a helper function to check if the user value is higher or lower than the guess.
async function highLow() {
  let highLowQuestion = await ask(
    `Is your number higher or lower than my guess of ${guess}?\nPlease type either higher or lower!\n`
  );
  if (
    highLowQuestion.toLowerCase() != "higher" &&
    highLowQuestion.toLowerCase() != "lower"
  ) {
    console.log("Why didn't you type higher or lower?");
    process.exit();
  } else if (highLowQuestion.toLowerCase() === "higher") {
    console.log("So your chosen number is higher than my guess.\nhmm...");
    await sleep(1000);
    ifHigher();
  } else {
    console.log("So your chosen number is lower than my guess.\nhmm...");
    await sleep(1000);
    ifLower();
    //return lower to valueGuesser
    // return 'lower'
  }
}

//Use two new helper functions (higher and lower), then pass new created values back to valueGuesser! These need to create the new ranges to pass back into the guesser. I guess they can also

//NOTE: should have one main function and send to helpers -> take return of either a or b -> send back to main function -> new logic based on if a or b -> send out again. This is necessary because a variable that is not used cannot be passed down.
function ifHigher() {
  //Updating the minValue global variable
  minValue = guess + 1;
  valueGuesser();
}

function ifLower() {
  //Updating the maxIntValue global variable
  maxIntValue = guess - 1;
  valueGuesser();
}
