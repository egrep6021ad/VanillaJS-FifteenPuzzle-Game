// Initialize the original table:
window.onload = () => {
  let count = 0;
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      const elem = document.createElement('div');
      elem.style.backgroundImage = 'url("./images/' + i + '' + j + '.jpg")';
      elem.setAttribute('class', 'non_click_image');
      elem.setAttribute('onClick', 'handleClick(' + i + ',' + j + ')');
      elem.setAttribute('id', i + '' + j);
      elem.innerHTML = '<h1>' + count++ + '</h1>';
      document.getElementById('row' + i).appendChild(elem);
    }
  }
  // Set borders on clickable buttons to "red":
  check();
};

let hasMoved = false;
// Function to switch tiles:
const handleClick = (row, col) => {
  // Put the grid coord back together:
  const id = row + '' + col;
  const k = document.getElementById(id);
  // Move the pieces if it is a valid move:
  if (k.getAttribute('class') == 'clickable_image') {
    // Disable clicking:
    let disableClicks = document.getElementsByTagName('body')[0];
    disableClicks.setAttribute('class', 'disable_clicks');

    // Swap the photos:
    swapPhotos(id);

    // Enable clicking:
    setTimeout(() => {
      // If the person shuffled then hasMoved = true, thus check for win:
      if (hasMoved) checkWin();
      // Set borders on new clickable buttons to "red":
      check();
      disableClicks = document.getElementsByTagName('body')[0];
      disableClicks.setAttribute('class', '');
    }, 200);
  }
};

let clickCount = 0;
// Helper function to swap the tiles:
const swapPhotos = (id) => {
  clickCount++;
  document.getElementById('game_clicks').innerHTML =
    '<h4>Total Moves: ' + clickCount + '</h4>';
  // Save elem's attibutes
  const elem = document.getElementById(id);
  const tempID = elem.id;
  const tempSrc = elem.style.backgroundImage;
  const tempClicker = elem.getAttribute('onClick');
  const tempInnerText = elem.innerHTML;

  const other = document.getElementById('33');
  // Set elem's attributes to others'
  elem.style.backgroundImage = other.style.backgroundImage;
  elem.id = other.id;
  elem.setAttribute('onClick', other.getAttribute('onClick'));
  elem.innerHTML = other.innerHTML;
  // Set other's attributes to to elem's originals
  other.style.backgroundImage = tempSrc;
  other.id = tempID;
  other.setAttribute('onClick', tempClicker);
  other.innerHTML = tempInnerText;
  return;
};

// Function to shuffle the tiles:
let gameTime = 0;
let actualGameClock = null;
const shuffle = () => {
  let arr = [];
  for (i = 0; i < 4; i++) {
    const temp = document.getElementById('row' + [i]);
    for (j = 0; j < 4; j++) {
      arr = [...arr, temp.getElementsByTagName('div')[j]];
    }
    // Indicate the a shuffle has taken place so we can begin checking for wins:
    hasMoved = true;
  }

  for (i = 0; i < arr.length; i++) {
    // For each element in arr
    j = Math.floor(Math.random() * arr.length); // New random index
    currSrc = arr[i].style.backgroundImage;
    currID = arr[i].getAttribute('id');
    currClicker = arr[i].getAttribute('onClick');
    currInnerText = arr[i].innerHTML;

    arr[i].style.backgroundImage = arr[j].style.backgroundImage;
    arr[i].setAttribute('id', arr[j].getAttribute('id'));
    arr[i].setAttribute('onClick', arr[j].getAttribute('onClick'));
    arr[i].innerHTML = arr[j].innerHTML;

    arr[j].style.backgroundImage = currSrc;
    arr[j].setAttribute('id', currID);
    arr[j].setAttribute('onClick', currClicker);
    arr[j].innerHTML = currInnerText;
  }

  const audio = document.getElementById('song');
  audio.loop = true;
  audio.play();

  actualGameClock = setInterval(() => {
    gameTime++;
    document.getElementById('game_clock').innerHTML =
      '<h4>Total Gametime: ' + gameTime + ' seconds</h4>';
  }, 1000);
  // Set borders on clickable buttons to "red":
  check();
};

// Function sets red border on tiles that can be clicked:
const check = () => {
  let arr = [];
  try {
    for (i = 0; i < 4; i++) {
      const temp = document.getElementById('row' + [i]);

      let tempList = [];
      for (j = 0; j < 4; j++) {
        tempList = [...tempList, temp.getElementsByTagName('div')[j]];
      }
      arr = [...arr, tempList];
    }
    // Reset all the old images back to default
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 4; j++) {
        arr[i][j].setAttribute('class', 'non_click_image');
      }
    }
    // Set the border on clickable images:
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 4; j++) {
        if (i == 0) {
          if (j == 0) {
            if (arr[i][j].id == '33') {
              arr[i][j + 1].setAttribute('class', 'clickable_image');
              arr[i + 1][j].setAttribute('class', 'clickable_image');
            }
          } else if (j == 3) {
            if (arr[i][j].id == '33') {
              arr[i][j - 1].setAttribute('class', 'clickable_image');
              arr[i + 1][j].setAttribute('class', 'clickable_image');
            }
          } else if (arr[i][j].id == '33') {
            arr[i + 1][j].setAttribute('class', 'clickable_image');
            arr[i][j + 1].setAttribute('class', 'clickable_image');
            arr[i][j - 1].setAttribute('class', 'clickable_image');
          }
        } else if (i == 3) {
          if (j == 0) {
            if (arr[i][j].id == '33') {
              arr[i][j + 1].setAttribute('class', 'clickable_image');
              arr[i - 1][j].setAttribute('class', 'clickable_image');
            }
          } else if (j == 3) {
            if (arr[i][j].id == '33') {
              arr[i][j - 1].setAttribute('class', 'clickable_image');
              arr[i - 1][j].setAttribute('class', 'clickable_image');
            }
          } else if (arr[i][j].id == '33') {
            arr[i - 1][j].setAttribute('class', 'clickable_image');
            arr[i][j + 1].setAttribute('class', 'clickable_image');
            arr[i][j - 1].setAttribute('class', 'clickable_image');
          }
        } else if (j == 3 && arr[i][j].id == '33') {
          arr[i + 1][j].setAttribute('class', 'clickable_image');
          arr[i - 1][j].setAttribute('class', 'clickable_image');
          arr[i][j - 1].setAttribute('class', 'clickable_image');
        } else if (j == 0 && arr[i][j].id == '33') {
          arr[i + 1][j].setAttribute('class', 'clickable_image');
          arr[i - 1][j].setAttribute('class', 'clickable_image');
          arr[i][j + 1].setAttribute('class', 'clickable_image');
        } else if (arr[i][j].id == '33') {
          arr[i + 1][j].setAttribute('class', 'clickable_image');
          arr[i - 1][j].setAttribute('class', 'clickable_image');
          arr[i][j + 1].setAttribute('class', 'clickable_image');
          arr[i][j - 1].setAttribute('class', 'clickable_image');
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const checkWin = () => {
  for (i = 0; i < 4; i++) {
    const temp = document.getElementById('row' + [i]);
    for (j = 0; j < 4; j++) {
      const curr = temp.getElementsByTagName('div')[j];
      if (curr.id != i + '' + j) return;
    }
  }
  // Replace gameboard with congrats message & best time/move ratio:
  // localStorage.removeItem("high_score")
  if (localStorage.getItem('high_score') == null) {
    localStorage.setItem('high_score', gameTime / clickCount);
  } else {
    const previousHighScore = localStorage.getItem('high_score');
    if (gameTime / clickCount < previousHighScore) {
      localStorage.setItem('high_score', gameTime / clickCount);
    }
  }
  clearInterval(actualGameClock);
  document.getElementById('body').innerHTML =
    '<div class=\'winner\'><h1>You Win!!</h1><br><h4>You made ' +
    clickCount +
    ' moves in ' +
    gameTime +
    ' seconds! (Average: ' +
    gameTime / clickCount +
    ' seconds per move)</h4><br><img src=\'./images/game_board.jpg\'>'+
    '<br><h4>Best Average: ' +
    localStorage.getItem('high_score') +
    ' second(s) per move<div>';
  console.log(localStorage.getItem('high_score'));
};


const cheat = () => {
  count = 0;
  for (i = 0; i < 4; i++) {
    const temp = document.getElementById('row' + [i]);
    for (j = 0; j < 4; j++) {
      const curr = temp.getElementsByTagName('div')[j];
      curr.style.backgroundImage = 'url("./images/' + i + '' + j + '.jpg")';
      curr.setAttribute('id', i + '' + j);
      curr.innerHTML = '<h1>' + count++ + '</h1>';
      curr.setAttribute('onClick', 'handleClick(' + i + ',' + j + ')');
      curr.setAttribute('class', 'non_click_image');
    }
  }

  check();
};

// Gets rid of esLint non-used variable error
const errorHandler = (arg) => {
  if (arg == 0) {
    handleClick();
    shuffle();
    cheat();
  }
};
errorHandler(1);
