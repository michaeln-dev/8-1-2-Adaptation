// The gun rotates around the player upon pressing the rotate buttons
class PlayerGun extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
    }
}
