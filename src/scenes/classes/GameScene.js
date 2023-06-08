class GameScene extends Phaser.Scene {
    // Using a master GameScene class to handle shared code like pausing and universal logic
    constructor (key) {
        super(key);
        this.sceneKey = null;
    }

    create () {
        this.canPause = true;

        // <------------------------------ Signals --------------------------------> //
        this.events.on('resume', this.resume_game, this); // Run resume function upon unpausing the game

        // <------------------------------ Keyboard Input ---------------------------> //
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyCONFIRM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyCANCEL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keyPAUSE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyPAUSE) && this.canPause) {
            this.pause_game();
        }
    }

    pause_game () {
        this.disable_pausing();
        this.scene.pause();
        this.scene.launch('pauseScene', { sceneKey : this.sceneKey });
    }

    resume_game () {
        this.scene.resume();
        this.enable_pausing();
    }

    enable_pausing() {
        this.canPause = true;
    }

    disable_pausing() {
        this.canPause = false;
    }
}