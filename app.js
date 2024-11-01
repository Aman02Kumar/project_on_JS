const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText);
      return true;
    }
  }
  return false;
};

const gameDraw = () => {
  msg.innerText = `It's a Draw!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winner");
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations! ${winner} Wins!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.add("o-selected");
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add("x-selected");
      turnO = true;
    }
    box.disabled = true;
    count++;

    if (!checkWinner() && count === 9) {
      gameDraw();
    }
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
