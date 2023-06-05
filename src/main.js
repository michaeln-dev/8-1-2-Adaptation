// 4 hours 

let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 480,
    height: 432,
    physics : {
        default: 'arcade',
        debug: true
    },
    scene: [ Menu, DevLevel, PauseMenu ]
}

let game = new Phaser.Game(config);

// Reserve keyboard keys
let keyUP, keyLEFT, keyDOWN, keyRIGHT, keyCONFIRM, keyCANCEL, keyPAUSE, keySELECT;