var app = {

  direction: 'right',
  moves: ['moveForward', 'turnRight', 'turnLeft', ''],
  gameOver: false,
  init: function () {
    console.log('init')
    // TODO
    // app.moveForward()
    // app.turnRight()
    // app.moveForward()
    // app.turnLeft()
    // app.moveForward()
    app.getRandomPositions()
    app.drawBoard()
    // Event listeners - TODO
    document.addEventListener('keydown', app.handleKeys)
    document.getElementById('launchScript').addEventListener('click', app.handleLaunchScriptButton)

  },
  getRandomPositions: function () {
    app.direction = 'right'
    app.xStart = Math.floor(Math.random() * 6) + 1
    app.yStart = Math.floor(Math.random() * 4) + 1
    app.x = app.xStart
    app.y = app.yStart
    app.xFinish = Math.floor(Math.random() * 6) + 1
    app.yFinish = Math.floor(Math.random() * 4) + 1
    console.log('Start : [' + app.xStart + ',' + app.yStart + ']')
    console.log('Finish : [' + app.xFinish + ',' + app.yFinish + ']')
    if (
      ((app.xStart >= app.xFinish - 1) && (app.xStart <= app.xFinish + 1)) &&
      ((app.yStart >= app.yFinish - 1) && (app.yStart <= app.yFinish + 1))
    ) {
      app.getRandomPositions()
    }
    return
  },
  handleKeys: function (evt) {
    if (evt.key === 'ArrowUp') {
      app.moveForward()
      app.drawBoard()
    }
    if (evt.key === 'ArrowRight') {
      app.turnRight()
      app.drawBoard()
    }
    if (evt.key === 'ArrowLeft') {
      app.turnLeft()
      app.drawBoard()
    }
  },
  moveForward: function () {
    // si app.direction == right alors app.x++
    if (app.direction == 'right') {
      app.x++
    }
    // si app.direction == top alors app.y--
    if (app.direction == 'top') {
      app.y--
    }
    // si app.direction == left alors app.x--
    if (app.direction == 'left') {
      app.x--
    }
    // si app.direction == bottom alors app.y++
    if (app.direction == 'bottom') {
      app.y++
    }
    if ((app.x < 1) ||
      (app.x > 6) ||
      (app.y < 1) ||
      (app.y > 4)) {
      // TODO bug fix = si on sort du cadre, app.codeLineLoop continue à boucler malgré le 'game over'
      alert('OUT OF BOUNDS ! - GAME OVER')
      app.gameOver = true
      document.getElementById('userCode').value = ''
      app.init()
    }
  },

  turnRight: function () {
    // si app.direction == right alors app.direction = bottom
    if (app.direction == 'right') {
      app.direction = 'bottom'
      return
    }
    // si app.direction == top alors app.direction = right
    if (app.direction == 'top') {
      app.direction = 'right'
      return
    }
    // si app.direction == left alors app.direction = top
    if (app.direction == 'left') {
      app.direction = 'top'
      return
    }
    // si app.direction == bottom alors app.direction = left
    if (app.direction == 'bottom') {
      app.direction = 'left'
      return
    }
  },

  turnLeft: function () {
    // si app.direction == right alors app.direction = top
    if (app.direction == 'right') {
      app.direction = 'top'
      return
    }
    // si app.direction == top alors app.direction = left
    if (app.direction == 'top') {
      app.direction = 'left'
      return
    }
    // si app.direction == left alors app.direction = bottom
    if (app.direction == 'left') {
      app.direction = 'bottom'
      return
    }
    // si app.direction == bottom alors app.direction = right
    if (app.direction == 'bottom') {
      app.direction = 'right'
      return
    }
  },

  drawBoard: function () {
    document.getElementById('board').innerHTML = ""
    let currentPosition = [app.x, app.y]
    let currentDirection = app.direction
    console.log(currentPosition)
    for (let i = 1; i <= 4; i++) {
      // i correspond à app.y & j correspond à app.x
      let newRow = document.createElement('div')
      newRow.classList.add('cellRow')
      newRow.setAttribute('id', 'row' + i)
      for (let j = 1; j <= 6; j++) {
        let newCell = document.createElement('div')
        newCell.classList.add('cell')
        if ((i == app.yStart) && (j == app.xStart)) {
          newCell.classList.add('cellStart')
        }
        if ((i == app.yFinish) && (j == app.xFinish)) {
          newCell.classList.add('cellEnd')
        }
        if ((i == currentPosition[1]) && (j == currentPosition[0])) {
          newCell.classList.add('cellCurrent')
        }
        if (currentDirection == 'right') {
          newCell.classList.add('cellCurrent-right')
        }
        if (currentDirection == 'top') {
          newCell.classList.add('cellCurrent-top')
        }
        if (currentDirection == 'left') {
          newCell.classList.add('cellCurrent-left')
        }
        if (currentDirection == 'bottom') {
          newCell.classList.add('cellCurrent-bottom')
        }
        newRow.appendChild(newCell)
      }
      document.getElementById('board').appendChild(newRow)
    }



  },

  handleLaunchScriptButton: function () {
    // TODO
    // TODO : get all lines as an array
    let codeLines = document.getElementById('userCode').value.split('\n')
    // console.log(codeLines)
    // Appel, après 2sec, la méthode codeLineLoop() avec la variable et l'index de départ (0) 2000 au lieu de 100
    window.setTimeout(function () {
      app.codeLineLoop(codeLines, 0)
    }, 100)
  },

  codeLineLoop: function (codeLines, index) {
    // Getting currentLine
    var currentLine = codeLines[index]
    console.log(currentLine)
    // console.log(typeof currentLine)
    // eval() fonctionne mais pas safe ! ne pas utiliser
    // eval(currentLine)

    if (app.moves.indexOf(currentLine) < 0) {
      alert('Merci d\'entrer des fonctions valides parmi : moveForward, turnRight ou turnLeft')
      return
    } else {
      // Function fonctionne, mais erreur en console si input vide ... sécurité ???
      Function('"use strict";return (app.' + currentLine + '())')()
      app.drawBoard()
    }
    // Test de sécurité, à c/c dans l'input; si ça s'exécute, c'est pas bon !
    // window.location = 'http://www.google.com'

    // Increment
    index++;


    // if still a line to interpret
    if (index < codeLines.length) {
      // si il n'y a pas de 'game over' on continue de vérifier et d'exécuter le code
      if (!app.gameOver) {
        // Recall same method (=> make a loop) 1000 au lieu de 100
        // TODO bug fix = si on sort du cadre, codeLineLoop continue à boucler malgré le 'game over'
        window.setTimeout(function () {
          app.codeLineLoop(codeLines, index)
        }, 100)
      } else {
        // sinon, s'il y a un 'game over', on réinitialise la valeur de app.gameOver à false pour pouvoir rejouer normalement
        app.gameOver = false
      }
    } else {
      // si il n'y a pas de 'game over' et qu'on est arrivés en fin de code
      if (!app.gameOver) {
        window.setTimeout(function () {
          // on vérifie si on a gagné 
          app.checkSuccess()
        }, 100)
      } else {
        // sinon, s'il y a un 'game over', on réinitialise la valeur de app.gameOver à false pour pouvoir rejouer normalement
        app.gameOver = false
      }
    }

  },

  checkSuccess: function () {
    // TODO display if the game is won or not
    if (app.x == app.xFinish && app.y == app.yFinish) {
      alert('CONGRATULATIONS, YOU WIN !')
      document.getElementById('userCode').value = ''
      app.init()
      return
    }
    alert('SORRY, YOU LOOSE ! TRY AGAIN !')
    app.gameOver = true
    document.getElementById('userCode').value = ''
    app.init()
    return
  }
};

document.addEventListener('DOMContentLoaded', app.init);

/*
moveForward
moveForward
moveForward
moveForward
moveForward
turnRight
moveForward
moveForward
moveForward
*/