class GameScene extends Phaser.Scene {
    // Using a master GameScene class to handle shared code like pausing and universal logic
    constructor (key) {
        super(key);
    }

    create () {
        this.canPause = true;

        // <------------------------------ Keyboard Input ---------------------------> //
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyESC) && this.canPause) {
            this.disable_pausing();
        }
    }

    enable_pausing() {
        this.canPause = true;
    }

    disable_pausing() {
        this.canPause = false;
    }
}