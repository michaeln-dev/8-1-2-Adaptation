// 6 hours 

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
    zoom: 4,

    scene: [ Menu, DevLevel, PauseMenu ]
}

let game = new Phaser.Game(config);

// Reserve keyboard keys
let keyUP, keyLEFT, keyDOWN, keyRIGHT, keyCONFIRM, keyCANCEL, keyPAUSE, keySELECT;