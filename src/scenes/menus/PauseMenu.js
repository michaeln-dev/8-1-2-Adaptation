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
        this.oldPAUSE = keyPAUSE;
        keyPAUSE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyPAUSE) && this.canControl) {
            // Reassign the buttons to their initial definitions
            keyPAUSE = this.oldPAUSE;

            // Switch back to the main scene
            this.scene.get(this.gameSceneKey).events.emit("resume");
            this.scene.stop("pauseScene");
        }
    }
}