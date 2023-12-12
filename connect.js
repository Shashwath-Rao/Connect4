// We need to use jQuery for the following:
var greycolor = 'rgb(128,128,128)';
var player1 = prompt("Player One: Enter Your Name , you will be Blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter Your Name, you will be Red");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

// http://stackoverflow.com/questions/6139407/getting-td-by-index-with-jquery
function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}
// Change the color of a button
function changeColor(rowIndex,colIndex,color)
{
  var pos = 0;
  var i = 0;
  id =  setInterval(animate,100)
  id2 = setInterval(animate2,125)
  function animate2()
  {
    if (i < rowIndex)
    {
    table.eq(i++).find('td').eq(colIndex).find('button').css('background-color',greycolor);
    }
  else
    {
    clearInterval(id2)
    done = true
    }
  }

  function animate()
    {
    if (pos <= rowIndex)
    {
      table.eq(pos++).find('td').eq(colIndex).find('button').css('background-color',color);
    }
    else if (done)
    {
      clearInterval(id);

    // Check for a win or a tie.
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
      gameEnd(currentPlayer)
      done = false
      return
    }
    }

  }
  // If no win or tie, continue to next players
  currentPlayer = currentPlayer * -1 ;

  // Re-Check who the current Player is.
  if (currentPlayer === 1) {
    currentName = player1;
    $('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
    currentColor = player1Color;
  }
  else {
    currentName = player2
    $('h3').text(currentName+": it is your turn, please pick a column to drop your red chip.");
    currentColor = player2Color;
  }
}


// Take in column index, returns the bottom row that is still gray
function checkBottom(colIndex) {
  var colorReport = returnColor(5,colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = returnColor(row,colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row
    }
  }
}

// Check to see if 4 inputs are the same color
function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}

// Report Back to current color of a button
function returnColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function win(r,c,t){
  if (t === "h"){
    var cd = c + 4;
    while (c<cd)
    table.eq(r).find('td').eq(c++).find('button').css('border','12px solid black');
  }
  else if (t === "v"){
    var rd = r + 4;
    while(r<rd)
    table.eq(r++).find('td').eq(c).find('button').css('border','12px solid black');
  }
  else if (t === "d1"){
    var rd = r + 4;
    while(r<rd)
    table.eq(r++).find('td').eq(c++).find('button').css('border','12px solid black');
  }
  else if (t === "d2"){
    var cd = c + 4;
    while(c<cd)
    table.eq(r--).find('td').eq(c++).find('button').css('border','12px solid black');
  }
}

// Check for Horizontal Wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        console.log('horiz');
        reportWin(row,col);
        win(row,col,"h")
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
        win(row,col,"v")
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        win(row,col,"d1")
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        win(row,col,"d2")
        return true;
      }else {
        continue;
      }
    }
  }
}

// Game End
function gameEnd(winningPlayer) {
  if (winningPlayer === -1)
  {
    winningPlayer = player1
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    $('h1').text(winningPlayer+" has won!!! Refresh your browser to play again!!!").css("fontSize", "50px").css("color","blue");
  }
  else
  {
      winningPlayer = player2
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(winningPlayer+" has won!!! Refresh your browser to play again!!!").css("fontSize", "50px").css("color","red");
  }
}

// Start with Player One
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

// Start with Player One
$('h3').text(player1+": it is your turn, please pick a column to drop your blue chip.");
var done = true;
$('.board button').on('click',function voodoo(e) {
  $(e.target).off(e.type);
  if (done)
  {
    done = false
  // Recognize what column was chosen
  var col = $(this).closest("td").index();

  // Get back bottom available row to change
  var bottomAvail = checkBottom(col);

  // Drop the chip in that column at the bottomAvail Row
  changeColor(bottomAvail,col,currentColor);
  }
  setTimeout(()=>$(e.target).on(e.type,voodoo),100);
})





// Helper function to help you understand Rows and Columns From A Table
// http://stackoverflow.com/questions/788225/table-row-and-column-number-in-jquery
//
// $('.board button').on('click',function(){
//   // This is the Column Number (starts at zero):
//   console.log('This is the Column:');
//   console.log($(this).closest("td").index());
//   // This is the Row Number:
//   console.log("This is the Row:");
//   console.log($(this).closest("tr").index());
//   console.log('\n');
//   // This is a way to grab a particular cell (replace):
//   // $('table').eq(rowIndex).find('td').eq(colIndex)
// });

// // Change color on click
// $('.board button').on('click',function() {
//   if($(this).css('background-color') === 'rgb(51, 51, 51)'){
//     $(this).css('background-color','rgb(86, 151, 255)');
//   }else if ($(this).css('background-color') === 'rgb(86, 151, 255)'){
//     $(this).css('background-color','rgb(237, 45, 73)');
//   }else{
//     $(this).css('background-color','rgb(51, 51, 51)');
//   }
// });
