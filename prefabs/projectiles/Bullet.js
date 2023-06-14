class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
    }

    shoot(x, y, angle) {
        this.body.reset(x, y);

        const speed = 50;

        const velocityX = Math.cos(Phaser.Math.DegToRad(angle)) * speed;
        const velocityY = Math.sin(Phaser.Math.DegToRad(angle)) * speed;

        this.setActive(true);
        this.setVisible(true);

        this.setVelocity(velocityX, velocityY);
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

        const gameBounds = this.scene.physics.world.bounds;

        if (!Phaser.Geom.Rectangle.Contains(gameBounds, this.x, this.y)) {
            console.log("Ive just been deactivated");
            this.setActive(false);
            this.setVisible(false);
        }
    }
}