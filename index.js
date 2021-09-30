// const readline = require('readline');
// const rl = readline.createInterface(process.stdin, process.stdout);

// function ask(questionText) {
//   return new Promise((resolve, reject) => {
//     rl.question(questionText, resolve);
//   });
// }

// start();

// async function start() {
//   console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
//   let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
//   console.log('You entered: ' + secretNumber);
//   // Now try and complete the program.
//   process.exit();
// }


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

startup();

async function startup() {
  console.log(
    "Welcome to Guess the Number!\nThink of a random number greater than 1 but less than any maximum value.\nTo start we need some information..."
  );
  //NOTE: Entering non-numerical values in response breaks the code
  let minValue = 1;
  //Asking the user for a max value.
  let maxValue = await ask(
    "What do you want the max number to be in our game?\nNote your selected number cannot exceed this value!!!\n"
  );
  //Calling sleep to delay after previous user input and asking for the random number.
  await sleep(1000);
  let userValue = await ask("Please enter the random number you thought of!\n");
  //Creating new variables that parseInt the user input values to change the strings to numbers.
  let minIntValue = minValue;
  let maxIntValue = parseInt(maxValue);
  let userIntValue = parseInt(userValue);
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
  } else if (userIntValue < minIntValue) {
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
  //Creating another function to handle the initial guess. Using an equation to determine the guess to make in the center of the range.
  async function valueGuesser() {
    let initialGuess =
      minIntValue + Math.floor((maxIntValue - minIntValue) / 2);
    //Asking if the guess was right or wrong.
    let guess = await ask(
      `My guess is ${initialGuess}!\nIs this correct? Yes or No?\n`
    );
    //Calling sleep to delay next question.
    await sleep(1000);
    //Ensuring that the input was yes or no.
    if (guess.toLowerCase() != "no" && guess.toLowerCase() != "yes") {
      console.log("Why didn't you type yes or no?");
      process.exit();
      //Win statement if input is yes.
    } else if (guess.toLowerCase() === "yes") {
      console.log(`I guessed it correctly!\nYour number was ${initialGuess}`);
      //Incorrect guess statement sends user to the higher or lower function. NOTE CHECK IF THEY LIED!
    } else {
      console.log(`My guess was wrong! Oh well, moving on!`);
      await sleep(1000);
      highLow()
    }
  }
}

async function highLow() {
  while (true) {
    let highLowQuestion = await ask(
      "Is your number higher or lower than my guess?\nPlease type either higher or lower!\n"
    );
    if (
      highLowQuestion.toLowerCase() != "higher" &&
      highLowQuestion.toLowerCase() != "lower"
    ) {
      console.log("Why didn't you type higher or lower?");
      process.exit();
    } else if (highLowQuestion.toLowerCase() === "higher") {
        console.log("So your chosen number is higher than my guess.\nhmm...")
        await sleep(1000)
        //NOTE: Should try to loop back to valueGuesser. If I keep looping to it then I can keep track of my number of guesses.
    } else {
        console.log("So your chosen number is lower than my guess.\nhmm...")
    }

    }
  }
