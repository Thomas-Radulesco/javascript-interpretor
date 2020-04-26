var app = {
  errorMessages: '',
  // au départ, il y a du son ^_^
  SFX: true,
  // je pose une regex pour intérpreter le code.
  // ça peut paraître plus compliqué au départ, mais c'est d'une telle puissance :D !
  // ma regex vérifie que la chaîne de caractères à laquelle elle est comparée est soit un commentaire, 
  // soit une instruction, soit une instruction précédée d'espaces, soit une instruction suivie de commentaires ou d'espaces, soit du vide
  // de telle façon que toute instruction valide sera interprétée dans la méthode 'codeLineLoop'
  // N.B. j'ai choisi de pouvoir initialiser les commentaires soit par "//", soit par "/*", soit par "#"
  regCommand: /(^ *move forward *(\/\/.*)*(\#.*)*(\/\*.*)*$)|(^ *turn left *(\/\/.*)*(\#.*)*(\/\*.*)*$)|(^ *turn right *(\/\/.*)*(\#.*)*(\/\*.*)*$)|(^ *(\/\/.*)*(\#.*)*(\/\*.*)*$)/i,
  // lien : https://regex101.com/r/ibVDJg/5
  // merci regex101.com !
  gameOver: false,
  init: function () {
    // console.log('init')
    app.getRandomPositions()
    app.drawBoard()

    // Event listeners

    // au cas où on voudrait pouvoir utiliser les flèches du clavier
    // N.B. dans ce cas, il n'y a pas de vérification si on a gagné ou pas (trop facile :p )
    // document.addEventListener('keydown', app.handleKeys)

    document.getElementById('launchScript').addEventListener('click', app.handleLaunchScriptButton)
    document.getElementById('reset').addEventListener('click', app.reset)
    document.querySelector('i.fas').addEventListener('click', app.toggleSFX)
    document.getElementById('board').parentNode.style.display = 'flex'


  },

  reset: function () {
    app.gameOver = false
    if (app.errorMessages) {
      app.errorMessages.remove()
    }
    document.getElementById('userCode').value = ''
    app.init()
  },

  getRandomPositions: function () {
    app.direction = 'right'
    app.xStart = Math.floor(Math.random() * 6) + 1
    app.yStart = Math.floor(Math.random() * 4) + 1
    app.x = app.xStart
    app.y = app.yStart
    app.xFinish = Math.floor(Math.random() * 6) + 1
    app.yFinish = Math.floor(Math.random() * 4) + 1
    // console.log('Start : [' + app.xStart + ',' + app.yStart + ']')
    // console.log('Finish : [' + app.xFinish + ',' + app.yFinish + ']')
    if (
      // si les points de départ et d'arrivée sont en contact
      ((app.xStart >= app.xFinish - 1) && (app.xStart <= app.xFinish + 1)) &&
      ((app.yStart >= app.yFinish - 1) && (app.yStart <= app.yFinish + 1))
    ) {
      // je considère qu'il n'y a pas de challenge
      // donc je relance la méthode (récursive) pour placer les points un peu mieux
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
    // console.log(currentPosition)
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
    if (app.errorMessages) {
      app.errorMessages.remove()
    }
    let codeLines = document.getElementById('userCode').value.split('\n')
    // console.log(codeLines)
    // Appel, après 2sec, la méthode codeLineLoop() avec la variable et l'index de départ (0)
    window.setTimeout(function () {
      app.codeLineLoop(codeLines, 0)
      // TODO timeout
    }, 2000)
  },

  codeLineLoop: function (codeLines, index) {
    // Getting currentLine
    let currentLine = codeLines[index]
    console.log(codeLines)
    // eval() fonctionne mais pas safe ! ne pas utiliser
    // eval(currentLine)

    // Function fonctionne, mais erreur en console si input vide ... sécurité ??? turnLeft / turnRight / moveForward
    // Function('"use strict";return (app.' + currentLine + '())')()

    // Test de sécurité, à c/c dans l'input; si ça s'exécute, c'est pas bon !
    // window.location = 'http://www.google.com'

    if ((app.regCommand.exec(currentLine))) {
      // la variable 'match' est un tableau d'occurences de correspondance entre la ligne courante du code entré par l'utilisateur
      // et l'app.regCommand posée en début de code
      // les index de ce tableau correspondent aux groupes et sous-groupes de la regex : 1, 2, 3, ...
      let match = app.regCommand.exec(currentLine)

      // console.log('c\'est pas faux')
      if (match[1]) {
        // console.log('ok - move forward')
        // l'index 1 du tableau 'match' correspond à l'instruction 'move forward'
        app.moveForward()
        app.drawBoard()
      }
      if (match[9]) {
        // console.log('ok - turn right')
        // l'index 9 du tableau 'match' correspond à l'instruction 'turn right'
        app.turnRight()
        app.drawBoard()
      }
      if (match[5]) {
        // console.log('ok - turn left')
        // l'index 5 du tableau 'match' correspond à l'instruction 'turn left'
        app.turnLeft()
        app.drawBoard()
      }


      // je veux pouvoir effacer le tableau d'input utilisateur au fur et à mesure de l'exécution des commandes valables ou des commentaires
      // 1/ effacer l'input
      document.getElementById('userCode').value = ''
      // 2/ copier le tableau codeLines à partir de index+1 jusqu'à la fin, ligne par ligne dans newCodeLine
      for (let i = index + 1; i < codeLines.length; i++) {
        let newCodeLine = codeLines[i]
        // 3/ coller la nouvelle ligne dans l'input, avec le passage à la ligne
        document.getElementById('userCode').value += newCodeLine+'\n'
      }




    } else {
      // si on a tapé n'importe quoi
      // on définit les messages d'erreur
      errorLine1 = 'Merci d\'entrer des commandes valides parmi : "turn right", "turn left" et "move forward"'
      errorLine2 = 'les commentaires précédés de "//", "#" ou "/*" sont exceptionnellement autorisés'
      // on crée une div pour les mettre dedans
      app.errorMessages = document.createElement('div')
      // avec une classe sur laquelle on va pouvoir appliquer du CSS
      app.errorMessages.classList.add('errorMessages')
      // on crée un paragraphe
      errorParagraph1 = document.createElement('p')
      // avec une classe
      errorParagraph1.classList.add('error')
      // dans lequel on met le premier message d'erreur
      errorParagraph1.textContent = errorLine1
      // un 2ème paragraphe
      errorParagraph2 = document.createElement('p')
      // une classe sous-titre d'erreur
      errorParagraph2.classList.add('errorSubtitle')
      // dans lequel on met le deuxième message d'erreur
      errorParagraph2.textContent = errorLine2
      // on vient ajouter les paragraphes dans la div
      app.errorMessages.appendChild(errorParagraph1)
      app.errorMessages.appendChild(errorParagraph2)
      // et on ajoute la div en question tout en haut de la page
      errorDiv = document.querySelector('div.toggleSFX').parentNode
      errorDiv.prepend(app.errorMessages)
      // on check si on veut du son
      if(app.SFX==true){
      // on joue un petit bip d'erreur
      app.beep(0.1, 440, 'sawtooth', 100)
      }
      return
    }
     // on check si on veut du son
     if(app.SFX==true){
      // on joue un petit bip "ok"
      app.beep(0.1, 2850, 'sawtooth', 150)
     }


    // Increment
    index++;

    // if still a line to interpret
    if (index < codeLines.length) {
      // si il n'y a pas de 'game over' on continue de vérifier et d'exécuter le code
      if (!app.gameOver) {
        // Recall same method (=> make a loop)
        window.setTimeout(function () {
          app.codeLineLoop(codeLines, index)
          // TODO timeout
        }, 1000)
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
          // TODO timeout
        }, 1000)
      } else {
        // sinon, s'il y a un 'game over', on réinitialise la valeur de app.gameOver à false pour pouvoir rejouer normalement
        app.gameOver = false
      }
    }

  },
  toggleSFX: function () {
    if (app.SFX == true){
      app.SFX = false
      document.querySelector('i.fas').classList.remove('fa-volume-up')
      document.querySelector('i.fas').classList.add('fa-volume-mute')

    } else {
      app.SFX = true
      document.querySelector('i.fas').classList.remove('fa-volume-mute')
      document.querySelector('i.fas').classList.add('fa-volume-up')
    }

    
  },
  checkSuccess: function () {
    if (app.x == app.xFinish && app.y == app.yFinish) {
      // on check si on veut du son
      if(app.SFX==true){
      // petite musique de la victoire La4 Mi4 Fa#4 Sol4 La4 Mi4 La4
      let tempo = 180
      let noire = (60/tempo)*1000
      app.beep(0.1, 880, 'sine', noire)
      window.setTimeout(function() {app.beep(0.1, 659.255, 'sine', noire*0.5)}, noire*1+10)
      window.setTimeout(function() {app.beep(0.1, 739.989, 'sine', noire*0.5)}, noire*1.5+20)
      window.setTimeout(function() {app.beep(0.1, 783.991, 'sine', noire*0.5)}, noire*2+30)
      window.setTimeout(function() {app.beep(0.1, 880, 'sine', noire)}, noire*2.5+40)
      window.setTimeout(function() {app.beep(0.1, 659.255, 'sine', noire*0.5)}, noire*3.5+50)
      window.setTimeout(function() {app.beep(0.1, 880, 'sine', noire*1.5)}, noire*4+60)
      // la petite alerte après la fin de la musique, sinon, bug
      window.setTimeout(function() {alert('CONGRATULATIONS, YOU WIN !')}, noire*5.5+25+70)      
      }else{
        alert('CONGRATULATIONS, YOU WIN !')
      }
      document.getElementById('userCode').value = ''
      app.init()
      return
      }
      // on check si on veut du son
      if(app.SFX==true){
      // petite musique de la défaite Si2 Fa#2 Mi2 Si1
      let tempo = 120
      let noire = (60/tempo)*1000
      app.beep(0.1, 246.942, 'triangle', noire*0.5)
      window.setTimeout(function() {app.beep(0.1, 184.997, 'triangle', noire*0.5)}, noire*0.5+10)
      window.setTimeout(function() {app.beep(0.1, 164.814, 'triangle', noire*0.5)}, noire*1+20)
      window.setTimeout(function() {app.beep(0.1, 123.471, 'triangle', noire*1)}, noire*1.5+30)
      // la petite alerte après la fin de la musique, sinon, bug
      window.setTimeout(function() {alert('SORRY, YOU LOOSE ! TRY AGAIN !')}, noire*2.5+25+40)
      }else{
        alert('SORRY, YOU LOOSE ! TRY AGAIN !')
      }
      app.gameOver = true
      document.getElementById('userCode').value = ''
      app.reset()
      return
  },

  beep: function (gain, frequency, type, duration) {
    audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioCtx.createOscillator();
    let gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.value = gain;
    oscillator.frequency.value = frequency;
    oscillator.type = type;

    oscillator.start();

    setTimeout(
      function () {
        oscillator.stop();
      },
      duration
    );
    return
  }
};

document.addEventListener('DOMContentLoaded', app.init);

/*
move forward
turn right
turn left
*/