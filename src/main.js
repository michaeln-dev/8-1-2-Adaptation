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
    scene: [ Menu, DevLevel ]
}

let game = new Phaser.Game(config);

// Reserve keyboard keys
let keyW, keyA, keyS, keyD, keyENTER, keyESC;