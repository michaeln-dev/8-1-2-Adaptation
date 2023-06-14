class DevLevel extends GameScene {
    constructor () {
        super('devLevel')
    }

    preload () {
        // Player assets
        this.load.image('guido', './assets/player/guido_placeholder.png');
        this.load.image('player_gun', './assets/player/player_gun.png');

        this.load.image('bullet', './assets/projectiles/Bullet.png');

        // Tilemap assets
        this.load.image('demo_tilemap_png', './assets/tilemaps/demo_tilesheet.png');
        this.load.tilemapTiledJSON('demo_tilemap_JSON', './assets/tilemaps/demo_tilemap.json');

        this.load.audio('bulletShootSound', './assets/projectiles/bullet_shoot.wav');
    }

    create () {
        // Parent Class Reference
        super.create();
        this.sceneKey = this.scene.key;

        // Physics Groups
        this.bulletGroup = new BulletGroup(this);
        //this.enemies = this.physics.add.staticGroup()
 
        // Level Tilemap 
        const map = this.add.tilemap("demo_tilemap_JSON");
        const tileset = map.addTilesetImage("demo_tilesheet_tilemap", 'demo_tilemap_png');

        // Add tilemap layers
        const bgLayer = map.createLayer('Ground', tileset, 0, 0);

        // Level Objects
        let playerGun = new PlayerGun(this, 50, 50, 'player_gun');
        this.guido = new Guido(this, 50, 50, 'guido', playerGun);
        this.guido.setCollideWorldBounds(true);

        // Sound effects
        this.bulletShootSound = this.sound.add('bulletShootSound');

        // Level Camera
        this.cameraWidth = 240;
        this.cameraHeight = 200;
        this.cameras.main.setBounds(0, 0, this.cameraWidth, this.cameraHeight);
        this.cameras.main.startFollow(this.guido, true);

        // Game physics
        this.physics.world.setBounds(0,0, this.cameraWidth, this.cameraHeight);
    }

    update () {
        //console.log("From scene = X: ", this.playerGun.x.getBounds(), " and Y: ", this.playerGun.y);
        // Update functions
        super.update();
        this.guido.update();
    }

}