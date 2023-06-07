// 14 hours 

let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 160,
    height: 144,
    physics : {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    zoom: 3,

    // Be sure to add the Startup screen when not debugging
    //scene: [ StartupScreen, Menu, DevLevel, PauseMenu ]
    scene: [ Menu, DevLevel, PauseMenu ]
}

let game = new Phaser.Game(config);

// Reserve keyboard keys
let keyUP, keyLEFT, keyDOWN, keyRIGHT, keyCONFIRM, keyCANCEL, keyPAUSE, keySELECT;