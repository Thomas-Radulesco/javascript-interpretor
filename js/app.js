var app = {
  init: function() {
    console.log('init');

    // TODO
    app.drawBoard();

    // Event listeners - TODO
  },

  drawBoard: function() {
    let currentPosition = [1,1]
    console.log(currentPosition)
    for(let i=1;i<=4;i++){
      let newRow = document.createElement('div')
      newRow.classList.add('cellRow')
      newRow.setAttribute('id', 'row'+i)
      for(let j=1;j<=6;j++){
        let newCell = document.createElement('div')
        newCell.classList.add('cell')
          if((i==1)&&(j==1)){
            newCell.classList.add('cellStart')
          }
          if((i==4)&&(j==6)){
            newCell.classList.add('cellEnd')
          }
          if((i==currentPosition[1])&&(j==currentPosition[0])){
            newCell.classList.add('cellCurrent')
          }

        newRow.appendChild(newCell)
      }
     
      document.getElementById('board').appendChild(newRow)
    }



  },
  handleLaunchScriptButton: function() {
    // TODO
    
    // TODO : get all lines as an array

    window.setTimeout(function() {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },
  codeLineLoop: function(codeLines, index) {
    // Getting currentLine
    var currentLine = codeLines[index];
    console.log(currentLine);


    // Increment
    index++;

    // if still a line to interpret
    if (index < codeLines.length) {
      // Recall same method (=> make a loop)
      window.setTimeout(function() {
        app.codeLineLoop(codeLines, index);
      }, 1000);
    } else {
      window.setTimeout(function() {
        app.checkSuccess();
      }, 1000);
    }
  },
  checkSuccess: function() {
    // TODO display if the game is won or not
  }
};

document.addEventListener('DOMContentLoaded', app.init);
