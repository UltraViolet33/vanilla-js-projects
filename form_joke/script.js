const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map(x => String.fromCharCode(x));

alphabet.push(" ");
alphabet.push("'");
alphabet.push("?");
alphabet.push("Backspace");
alphabet.push("!");

let text = "";
const input = document.getElementById("permission");
const question = "Can I ask you this question ?";
const arrayQuestion = question.split("");
const arrayInput = [];

let i = 0;
let textLength = text.length;
let inputLength = input.value.length;

const buttonAnswer = document.getElementById("answerBtn");
let run = false;

document.addEventListener("keydown", event => {
  const touche = event.key;
  if (touche === "!") {
    run = true;
  }

  if (run) {
    let newTextLength = 0;
    if (alphabet.includes(touche) || alphabet.includes(touche.toUpperCase())) {
      if (touche === "  ") {
        text = text + " ";
      } else if (touche === "Backspace") {
        text = text.substring(0, text.length - 1);
        newTextLength = textLength;
      } else {
        text = text + touche;
        newTextLength = text.length;
      }
    }

    if (newTextLength > inputLength) {
      arrayInput.push(arrayQuestion[i]);
      input.value = arrayInput.join("");
      i = i + 1;
    } else {
      arrayInput.splice(-1, 1);
      input.value = arrayInput.join("");
      i = i - 1;
    }
  }
});

buttonAnswer.addEventListener("click", function () {
  const answerElement = document.getElementById("answer");
  if (run) {
    text = text.substring(1);
    answerElement.textContent = text;
    input.value = "";
    run = false;
    input.disabled = true;
  } else {
    answerElement.textContent = "You have no permission !";
    input.value = "";
    run = false;
    input.disabled = true;
  }
});
