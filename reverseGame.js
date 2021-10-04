//Creating a reverse of the Guess the Number game.
//Game asks user to select a maximum number (range) for it's random number.
//Game asks user to guess a random number.
//User guesses.
//Game returns yes/no and high/low.
//Upon correct guess congratulations message.

//Setting up sleep function to allow for pauses between displayed items in the terminal.
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

//Declaring global variables. Note that these will be updated depending on function results.
let min = 1;
let counter = 0;
let maxInt;
let guessReverse;
let compNumber;

//Calling startup for the reverse game.
startupReverse();

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
      //If yes is input then the console is cleared to maintain a cleaner terminal and the game is restarted.
    } else if (restartQuestion.toLowerCase() === "yes") {
      console.log("Restarting the game! Give me a second.");
      await sleep(3000);
      console.clear();
      startupReverse();
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