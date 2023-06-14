// Reference:
// https://www.codecaptain.io/blog/game-development/shooting-bullets-phaser-3-using-arcade-physics-groups/696
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

        this.scene.cameras.main.shake(50, 0.005);
        this.scene.bulletShootSound.play();
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

        const gameBounds = this.scene.physics.world.bounds;

        // Check if bullet is outside of scene world bounds
        if (!Phaser.Geom.Rectangle.Contains(gameBounds, this.x, this.y)) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}