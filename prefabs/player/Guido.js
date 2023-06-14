class Guido extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, playerTexture, gunObject) {
        super(scene, x, y, playerTexture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Player variables
        this.moveSpeed = 50;

        this.totalHealth = 3;
        this.currentHealth = this.totalHealth;
        this.isInvulnerable = false;

        // Gun reference variables
        this.gun = gunObject;
        this.gunRotatingCurrently = false;

        this.bulletSpawnTimer;
        this.start_shoot_timer()


        // Initialize the necessary components for gun rotation
        this.clockwisePositions = [
            { x: 20, y: 0, angle: 0 },
            { x: 14, y: 14, angle: 45 },
            { x: 0, y: 20, angle: 90 },
            { x: -14, y: 14, angle: 135 },
            { x: -20, y: 0, angle: 180 },
            { x: -14, y: -14, angle: -135 },
            { x: 0, y: -20, angle: -90 },
            { x: 14, y: -14, angle: -45 }
        ];
        this.counterClockwisePositions = [
            { x: 20, y: 0, angle: 0 },
            { x: 14, y: -14, angle: -45 },
            { x: 0, y: -20, angle: -90 },
            { x: -14, y: -14, angle: -135 },
            { x: -20, y: 0, angle: 180 },
            { x: -14, y: 14, angle: 135 },
            { x: 0, y: 20, angle: 90 },
            { x: 14, y: 14, angle: 45 }
        ];
        this.container = scene.add.container(this.x, this.y, [this.gun]);

        this.gun.setPosition(this.clockwisePositions[0].x, this.clockwisePositions[0].y);
    }

    update () {
        //console.log("PLayer X: ", this.x, " and Y: ", this.y);
        //console.log("Gun X: ", gunGlobalX, " and Y: ", gunGlobalY);

        this.body.setVelocity(0);
        this.container.setPosition(this.x, this.y);

        this.player_move_input();
        this.gun_rotate_input();
    }

    // Handles player input for movement
    player_move_input () {
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

    gun_rotate_input() {
        if (Phaser.Input.Keyboard.JustDown(keyCONFIRM) && !this.gunRotatingCurrently) {
            this.rotate_gun(this.counterClockwisePositions);
        }
        else if (Phaser.Input.Keyboard.JustDown(keyCANCEL) && !this.gunRotatingCurrently) {
            this.rotate_gun(this.clockwisePositions);
        }
    }

    /*
    * rotate_gun() {}
    *   Takes an array of positions and rotates the gun sprite accordingly.
    *   Used to dynamically move and rotate the gun sprite either clockwise
    *   or counter clockwise.
    */
    rotate_gun(positions) {
        this.gunRotatingCurrently = true;

        // Get the current index in the positions dictionary where the value equals the gun's current position
        const currentIndex = positions.findIndex(
            position => position.x === this.gun.x && position.y === this.gun.y
        );
    
        const nextIndex = (currentIndex + 1) % positions.length;
        const nextPosition = positions[nextIndex];

        // Move and rotate the gun to the next position
        this.scene.tweens.add({
            targets: this.gun,
            x: nextPosition.x,
            y: nextPosition.y,
            angle: nextPosition.angle,
            duration: 150,
            onComplete: () => {
                this.gunRotatingCurrently = false;
            }
        });
    }

    spawn_bullet() {
        let gunX = this.container.x + this.gun.x;
        let gunY = this.container.y + this.gun.y;

        this.scene.bulletGroup.spawn_bullet(gunX, gunY, this.gun.angle);
    }

    start_shoot_timer() {
        this.bulletSpawnTimer = this.scene.time.addEvent({
            delay: 1000, // The time interval in milliseconds (3 seconds)
            loop: true, // Set to true to repeat the timer indefinitely
            callback: this.spawn_bullet, // The function to call when the timer expires
            callbackScope: this // The scope in which the function should be called
        });
    }

    stop_shoot_timer() {
        this.bulletSpawnTimer.remove();
    }

    damage () {
        if(!this.isInvulnerable) {
            this.isInvulnerable = true;
            this.currentHealth -= 1;

            if (this.currentHealth <= 0) {
                this.die();
            }

            // wait a few seconds before being vulnerable
            this.scene.time.delayedCall(2000, () => {
                this.isInvulnerable = false;
            }, null, this);
        }
    }

    die () {
        console.log("player is dead");
    }
}