class Guido extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, playerTexture, gunTexture) {
        super(scene, x, y, playerTexture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // ---------------------- Player variables ---------------------- //
        this.moveSpeed = 50;

        // Create gun instance
        const GunTexture = scene.textures.get(gunTexture);

        //this.gun = new PlayerGun(this, 0, 0, GunTexture);
    }

    update () {
        this.body.setVelocity(0);

        this.player_move();
    }

    // Handles player input for movement
    player_move() {
        // Horizontal input
        if (keyLEFT.isDown) {
            this.body.setVelocityX(-this.moveSpeed);
            this.setFlipX(true);
        }
        else if (keyRIGHT.isDown) {
            this.body.setVelocityX(this.moveSpeed);
            this.setFlipX(false);
        }

        // Vertical input
        if (keyUP.isDown) {
            this.body.setVelocityY(-this.moveSpeed);
        }
        else if (keyDOWN.isDown) {
            this.body.setVelocityY(this.moveSpeed);
        }

        // Normalize movement
        this.body.velocity.normalize().scale(this.moveSpeed);
    }
}