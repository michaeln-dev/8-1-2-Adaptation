// Reference:
// https://www.codecaptain.io/blog/game-development/shooting-bullets-phaser-3-using-arcade-physics-groups/696
class BulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Bullet,
            frameQuantity: 20,
            active: false,
            visible: false,
            key: 'bullet'
        });
    }

    spawn_bullet(x, y, angle) {
        const bullet = this.getFirstDead(false);
        if (bullet) {
            bullet.setDepth(5);
            bullet.shoot(x, y, angle);
        }
    }
}