let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: true
    },
    width: 320,
    height: 240,
    physics : {
        default: 'arcade',
        debug: true
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// Reserve keyboard keys
let keyW, keyA, keyS, keyD, keyENTER, keyESC;