class PauseMenu extends Phaser.Scene {
    constructor () {
        super("pauseScene");
    }

    init (args) {
        this.gameSceneKey = args.sceneKey;
    }

    preload () {
        // <---------------------- Load images -------------------------------> //
        this.load.image('uiPauseBorder', './assets/ui/ui_pause_border.png');
    }

    create () {
        // ---------------------- Boolean Flags ------------------
        this.canControl = true;

        // <-------------------- UI Elements ---------------------> //
        const borderUI = this.add.sprite(config.width/2, config.height/2, 'uiPauseBorder');

        // <-------------------- Keyboard input --------------------> //
        // Store reference to input mappings from game scene
        this.oldPAUSE = keyPAUSE;
        this.oldLEFT = keyLEFT;
        this.oldRIGHT = keyRIGHT;
        this.oldUP = keyUP;
        this.oldDOWN = keyDOWN;

        // Make new input maps for the menu scene
        keyPAUSE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyPAUSE) && this.canControl) {
            // Reassign the buttons to their initial definitions
            keyPAUSE = this.oldPAUSE;
            keyLEFT = this.oldLEFT;
            keyRIGHT = this.oldRIGHT;
            keyUP = this.oldUP;
            keyDOWN = this.oldDOWN;

            // Switch back to the main scene
            this.scene.get(this.gameSceneKey).events.emit("resume");
            this.scene.stop("pauseScene");
        }
    }
}