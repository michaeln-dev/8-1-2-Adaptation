class BulletGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Bullet,
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'bullet'
        });
    }

    spawn_bullet(x, y, angle) {
        //console.log("This has been called?");
        const bullet = this.getFirstDead(false);
        if (bullet) {
            bullet.setDepth(5);
            bullet.shoot(x, y, angle);
        }
    }
}