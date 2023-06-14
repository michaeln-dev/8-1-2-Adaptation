class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);

        this.moveSpeed = 20;
    }

    update() {
        // Move the enemy towards the player
        this.scene.physics.moveToObject(this, this.scene.guido, this.moveSpeed);
    }
}