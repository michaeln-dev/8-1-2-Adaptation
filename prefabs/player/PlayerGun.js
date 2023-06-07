// The gun rotates around the player upon pressing the rotate buttons
class PlayerGun extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
    }

    update() {
        // Rotation code from:
        // https://labs.phaser.io/edit.html?src=src%5Cactions%5Crotate%20around%20distance.js


        // Rotate the gun around its pivot point
        //this.rotationAngle += this.rotationSpeed;
        //this.setRotation(this.rotationAngle);
    }

    spawn_bullet() {

    }
}
