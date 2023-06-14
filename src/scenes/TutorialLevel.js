class TutorialLevel extends GameScene {
    constructor () {
        super('tutorialLevel')
    }

    preload () {
        // Player assets
        this.load.image('guido', './assets/player/guido_placeholder.png');
        this.load.image('player_gun', './assets/player/player_gun.png');

        this.load.image('bullet', './assets/projectiles/Bullet.png');

        this.load.image('car1', './assets/tutorial_level/car1.png')
        this.load.image('car2', './assets/tutorial_level/car2.png')

        this.load.image('transition', './assets/tutorial_level/Test_Transition.png');

        // Tilemap assets
        this.load.image('demo_tilemap_png', './assets/tilemaps/demo_tilesheet.png');
        this.load.tilemapTiledJSON('tutorial_tilemap_JSON', './assets/tilemaps/tutorial_tilemap.json');

        this.load.audio('bulletShootSound', './assets/projectiles/bullet_shoot.wav');
        this.load.audio('windHowl', './assets/tutorial_level/tutorial_wind_howl.wav');
    }

    create () {
        // Audio
        this.windSound = this.sound.add('windHowl', { loop: true });
        this.windSound.play();

        // Parent Class Reference
        super.create();
        this.sceneKey = this.scene.key;

        // Physics Groups
        this.bulletGroup = new BulletGroup(this);
        //this.enemies = this.physics.add.staticGroup()
 
        // Level Tilemap 
        const map = this.add.tilemap("tutorial_tilemap_JSON");
        const tileset = map.addTilesetImage("demo_tilesheet", 'demo_tilemap_png');

        // Add tilemap layers
        const bgLayer = map.createLayer('Background', tileset, 0, 0);
        const cloudsLayer = map.createLayer('Clouds', tileset, 0, 0);

        // Level Objects
        let playerGun = new PlayerGun(this, 50, 50, 'player_gun');
        this.guido = new Guido(this, 30, 102, 'guido', playerGun);
        this.guido.setCollideWorldBounds(true);
        this.guido.stop_shoot_timer();

        const car1 = this.add.sprite(40, 127, 'car1');
        const car2 = this.add.sprite(250, 127, 'car2');

        let tutorialTextConfig = { 
            fontFamily: 'Arial', 
            fontSize: '10px', 
            color: '#000000' 
        }

        const moveText = this.add.text(10, 30, 'Use Arrow Keys to move\nin all directions', tutorialTextConfig);
        const aimCCWText = this.add.text(150, 10, 'Use Z button to aim your\nweapon counterclockwise', tutorialTextConfig);
        const aimCWText = this.add.text(150, 40, 'Use X button to aim your\nweapon clockwise', tutorialTextConfig);
        const shootText = this.add.text(275, 15, 'In a real fight, your\nweapon fires\nautomatically', tutorialTextConfig);



        // Sound effects
        this.bulletShootSound = this.sound.add('bulletShootSound');

        // Level Camera
        this.cameraWidth = 504;
        this.cameraHeight = 144;
        this.cameras.main.setBounds(0, 0, this.cameraWidth, this.cameraHeight);
        this.cameras.main.startFollow(this.guido, true);

        // Game physics
        this.physics.world.setBounds(0,0, this.cameraWidth, this.cameraHeight);

        this.nextScene = this.physics.add.sprite(470, config.height/2, 'transition');
        this.physics.add.collider(this.guido, this.nextScene, () => {
                this.windSound.stop();
                this.windSound.destroy();
                this.scene.start("devLevel")
        });
    }

    update () {
        //console.log("From scene = X: ", this.playerGun.x.getBounds(), " and Y: ", this.playerGun.y);
        // Update functions
        super.update();
        this.guido.update();
    }

}