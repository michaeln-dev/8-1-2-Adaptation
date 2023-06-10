class Guido extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, playerTexture, gunObject) {
        super(scene, x, y, playerTexture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // ---------------------- Player variables ---------------------- //
        this.moveSpeed = 50;

        // Store gun reference

        this.gun = gunObject;

        this.gunContainer = scene.add.container(this.x, this.y);
        this.gunContainer.add([this.gun]);
    }

    update () {
        this.body.setVelocity(0);

        // Make the gun follow the player
        // From:
        // https://phaser.discourse.group/t/how-do-i-match-one-object-to-the-location-of-another-moving-object/10334/3

        
        //Phaser.Display.Bounds.SetCenterX(this.gun, this.body.center.x);
        //Phaser.Display.Bounds.SetCenterY(this.gun, this.body.center.y);
        //Phaser.Display.Bounds.SetBottom(this.gun, this.body.top);

        //this.gun.update(this.x, this.y);
        this.player_move_input();
        this.update_gun_rotation();
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

    /*
    *  update_gun_rotation() {}
    *  Implementation from:
    *  https://labs.phaser.io/view.html?src=src/actions/rotate%20container%20facing%20point.js
    */
    update_gun_rotation () {

        Phaser.Actions.RotateAroundDistance([this.gunContainer], this, this.gun.currentRotateSpeed, this.gun.distance);
        const angleDeg = Math.atan2(this.gunContainer.y - this.y, this.gunContainer.x - this.x) * 180 / Math.PI;
        this.gunContainer.angle = angleDeg
    }

    // Handles player gun rotation input
    gun_rotate_input () {
        // If A button is pressed
        if (keyCONFIRM.isDown) {
            this.gun.currentRotateSpeed = this.gun.rotateSpeed;
        }
        // If B button is pressed
        else if (keyCANCEL.isDown) {
            this.gun.currentRotateSpeed = -this.gun.rotateSpeed;
        }
        else {
            this.gun.currentRotateSpeed = 0;
            //console.log('Nothing');
        }
    }
}