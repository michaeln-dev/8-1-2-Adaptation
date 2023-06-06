class DevLevel extends GameScene {
    constructor () {
        super('devLevel')
    }

    preload () {
        // ------------------------ Load Images ---------------------------
        
        this.load.image('guido', './assets/guido_placeholder.png');
    }

    create () {
        // --------------------- Parent Class Reference -------------------------------
        super.create();
        this.sceneKey = this.scene.key;
        

        // ----------------------- Level Objects ---------------------------
        this.guido = new Guido(this, 0, 0, 'guido');

        // ---------------------- Level Camera
        //this.cameras.main.startFollow(this.guido);
        //this.cameras.main.setZoom(2.5);
        this.camera = this.cameras.main;
        console.log("( ", this.camera.x, ", ", this.camera.y, " )");

        // <------------------------------ Keyboard Input ---------------------------> //
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        //keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        //keyPAUSE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update () {
        // Update functions
        super.update();
        this.guido.update();

        //console.log(this.canPause);
    }

}