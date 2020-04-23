var app = {
  x:1,
  y:1,
  direction:'right',
  init: function() {
    console.log('init');

    // TODO
    // app.moveForward()
    // app.turnRight()
    // app.moveForward()
    // app.turnLeft()
    // app.moveForward()
    app.drawBoard()

    // Event listeners - TODO
    document.addEventListener('keydown', app.handleKeys)

  },
  handleKeys: function(evt) {
    if(evt.key==='ArrowUp'){
      app.moveForward()
      // app.eraseBoard()
      app.drawBoard()
    }
    if(evt.key==='ArrowRight'){
      app.turnRight()
      // app.eraseBoard()
      app.drawBoard()
    }
    if(evt.key==='ArrowLeft'){
      app.turnLeft()
      // app.eraseBoard()
      app.drawBoard()
    }
  },
  moveForward: function() {
    // si app.direction == right alors app.x++
    if(app.direction=='right'){
      app.x++
    }
    // si app.direction == top alors app.y--
    if(app.direction=='top'){
      app.y--
    }
    // si app.direction == left alors app.x--
    if(app.direction=='left'){
      app.x--
    }
    // si app.direction == bottom alors app.y++
    if(app.direction=='bottom'){
      app.y++
    }
    if((app.x<1)||
        (app.x>6)||
        (app.y<1)||
        (app.y>4)){
          alert('Vous êtes sorti du cadre - GAME OVER')
          app.x = 1
          app.y = 1
          app.direction = 'right'
          app.init()
        }
  },

  turnRight: function() {
    // si app.direction == right alors app.direction = bottom
    if(app.direction=='right'){
      app.direction = 'bottom'
      return
    }
    // si app.direction == top alors app.direction = right
    if(app.direction=='top'){
      app.direction = 'right'
      return
    }
    // si app.direction == left alors app.direction = top
    if(app.direction=='left'){
      app.direction = 'top'
      return
    }
    // si app.direction == bottom alors app.direction = left
    if(app.direction=='bottom'){
      app.direction = 'left'
      return
    }
  },

  turnLeft: function() {
    // si app.direction == right alors app.direction = top
    if(app.direction=='right'){
      app.direction = 'top'
      return
    }
    // si app.direction == top alors app.direction = left
    if(app.direction=='top'){
      app.direction = 'left'
      return
    }
    // si app.direction == left alors app.direction = bottom
    if(app.direction=='left'){
      app.direction = 'bottom'
      return
    }
    // si app.direction == bottom alors app.direction = right
    if(app.direction=='bottom'){
      app.direction = 'right'
      return
    }
  },

  drawBoard: function() {
    document.getElementById('board').innerHTML=""
    let currentPosition = [app.x, app.y]
    let currentDirection = app.direction
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
            if(currentDirection=='right'){
            newCell.classList.add('cellCurrent-right')
          }
          if(currentDirection=='top'){
            newCell.classList.add('cellCurrent-top')
          }
          if(currentDirection=='left'){
            newCell.classList.add('cellCurrent-left')
          }
          if(currentDirection=='bottom'){
            newCell.classList.add('cellCurrent-bottom')
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
