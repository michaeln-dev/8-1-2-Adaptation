// 51 hours 
// Phaser Major Components:
// Tweens
// Cameras
// Tilemaps
// Physics Systems
// Timers

let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 160,
    height: 144,
    backgroundColor: '#ababab',
    physics : {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    zoom: 3,

    // Be sure to add the Startup screen when not debugging
    scene: [ StartupScreen, TitleScreen, TutorialLevel, DevLevel, FinalLevel, Cutscene1, EndingCutscene, StageRetry, LevelTransition, PauseMenu ]
    //scene: [ FinalLevel, EndingCutscene, DevLevel, Cutscene1, TutorialLevel, TitleScreen, PauseMenu, StartupScreen, LevelTransition, StageRetry ]
    //scene: [  TitleScreen, TutorialLevel, DevLevel, PauseMenu, StartupScreen ]
}

let game = new Phaser.Game(config);

// Reserve keyboard keys
let keyUP, keyLEFT, keyDOWN, keyRIGHT, keyCONFIRM, keyCANCEL, keyPAUSE, keySELECT;