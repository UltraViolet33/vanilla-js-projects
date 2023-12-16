//global variable
let codeSecret = [
  ["a", "b", "c"],
  ["d", "e", "f"],
  ["g", "h", "i"],
  ["j", "k", "l"],
  ["m", "n", "o"],
  ["p", "q", "r", "s"],
  ["t", "u", "v"],
  ["w", "x", "y", "z"],
  [" ", "A"],
];

/*-------------------------------------------- FUNCTIONS TO CODE A MESSAGE --------------------------------------------*/

/*
    function splitCode
    param->code(string)
    ex : if code = "bonjour"
     = ["b", "o", "n", "j", "o", "u", "r"]
*/
function splitCode(code) {
  return code.split("");
}

/*
    function crypte
    to crypte a message into a coded message
    parametre1->text(array)
    parametre2->model --> global variable codeSecret
    return finalCode (string)
*/
function crypte(text, model) {
  let finaleCode = [];
  for (let k = 0; k < text.length; k++) {
    for (let i = 0; i < model.length; i++) {
      for (let j = 0; j < model[i].length; j++) {
        if (text[k] === model[i][j]) {
          let l1 = i + 2;
          let l2 = j + 1;
          finaleCode.push([`${l1}.${l2}`]);
        }
      }
    }
  }

  finaleCode = finaleCode.join();

  return finaleCode;
}

/*-------------------------------------------- FUNCTIONS TO DECODE A MESSAGE --------------------------------------------*/

/*
    function split letters
    parametre code (string)
    return lettersArray (array)
    ex if code  = "1.2,5.2 9.5,8.8"
    lettersArray = [[1,2],[2,9],[9,5],[8,8]]
*/
function splitLetters(code) {
  let letter = [];
  const words = code.split(" ");
  let lettersArray = [];

  for (let i = 0; i < words.length; i++) {
    let letters = words[i].split(",");
    for (let j = 0; j < letters.length; j++) {
      let number = letters[j].split(".");
      letter = [number[0], number[1]];
      lettersArray.push(letter);
    }
  }
  return lettersArray;
}

/*
    function decrypt 
    paramatre1->lettresArray (array)
    parametre2->model global variable codeSecret (array)
    return newText (string)
*/
function decrypt(lettersArray, model) {
  let newText = [];

  for (let i = 0; i < lettersArray.length; i++) {
    let letter1 = parseInt(lettersArray[i][0] - 2);
    let letter2 = parseInt(lettersArray[i][1] - 1);
    newText.push(model[letter1][letter2]);
  }
  newText = newText.join("");
  return newText;
}

/*--------------------------------------------  DECODE A MESSAGE --------------------------------------------*/
//we get the html button from the form
let buttonText = document.getElementById("validerText");

buttonText.addEventListener("click", function (event) {
  event.preventDefault();
  let text = document.getElementById("text");
  let resultText = document.getElementById("resultText");
  text = text.value;
  let final = splitCode(text);
  let finalCode = crypte(final, codeSecret);
  resultText.textContent = finalCode;
});

/*--------------------------------------------  CODE A MESSAGE --------------------------------------------*/
//we get the html button from the form
let buttonCode = document.getElementById("validerCode");

buttonCode.addEventListener("click", function (event) {
  event.preventDefault();
  let code = document.getElementById("code");
  let resultCode = document.getElementById("resultCode");
  code = code.value;
  let final = splitLetters(code);
  let finalText = decrypt(final, codeSecret);
  resultCode.textContent = finalText;
});
