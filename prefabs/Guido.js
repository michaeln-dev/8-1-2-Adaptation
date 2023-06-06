class Guido extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        // ---------------------- Keyboard Input ---------------------- //
        //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    }

    update () {
        //console.log("( ", this.x, ", ", this.y, " )");
        if (keyLEFT.isDown) {
            this.x -= 2;
        }
        else if (keyRIGHT.isDown) {
            this.x += 2;
        }
        else if (keyUP.isDown) {
            this.y += 2;
        }
        else if (keyDOWN.isDown) {
            this.y -= 2;
        }
    }
}