// The gun rotates around the player upon pressing the rotate buttons
// Implementation from:
// https://labs.phaser.io/view.html?src=src/actions/rotate%20container%20facing%20point.js
class PlayerGun extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.rotateSpeed = 0.03;
        this.currentRotateSpeed = this.rotateSpeed;
        this.distance = 5;
    }

    update(playerX, playerY) {
        Phaser.Math.RotateAroundDistance(this, playerX, playerY, this.angle, this.distance);
        this.rotation += Phaser.Math.DegToRad(this.angle);

        //this.angle = Phaser.Math.Angle.Wrap(this.angle + 0.02);
        //this.x = playerX;
        //this.y = playerY;
        // Rotation code from:
        // https://labs.phaser.io/edit.html?src=src%5Cactions%5Crotate%20around%20distance.js


        // Rotate the gun around its pivot point
        //this.rotationAngle += this.rotationSpeed;
        //this.setRotation(this.rotationAngle);
    }

    spawn_bullet() {

    }
}
