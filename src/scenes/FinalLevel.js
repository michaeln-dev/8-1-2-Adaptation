class FinalLevel extends GameScene {
    constructor () {
        super('finalLevel')
    }

    preload () {
        // Player assets
        this.load.image('guido', './assets/player/guido_placeholder.png');
        this.load.image('player_gun', './assets/player/player_gun.png');

        this.load.image('bullet', './assets/projectiles/Bullet.png');

        this.load.image('enemy', './assets/enemies/Enemy.png');

        // Tilemap assets
        this.load.image('demo_tilemap_png', './assets/tilemaps/demo_tilesheet.png');
        this.load.tilemapTiledJSON('final_tilemap_JSON', './assets/tilemaps/final_level_tilemap.json');

        this.load.audio('bulletShootSound', './assets/projectiles/bullet_shoot.wav');
        this.load.audio('enemyHitSound', './assets/enemies/enemy_hit.wav');
        this.load.audio('playerHitSound', './assets/player/player_hit.wav');
        this.load.audio('levelTheme', './assets/level_2/level_2_theme.mp3');
    }

    create () {
        // Parent Class Reference
        super.create();
        this.sceneKey = this.scene.key;

        // Physics Groups
        this.bulletGroup = new BulletGroup(this);
        this.enemyGroup = this.physics.add.group();
 
        // Level Tilemap 
        const map = this.add.tilemap("final_tilemap_JSON");
        const tileset = map.addTilesetImage("final_level", 'demo_tilemap_png');

        // Add tilemap layers
        const bgLayer = map.createLayer('Ground', tileset, 0, 0);

        // Level Objects
        let playerGun = new PlayerGun(this, 50, 50, 'player_gun');
        this.guido = new Guido(this, 50, 50, 'guido', playerGun);
        this.guido.setCollideWorldBounds(true);

        this.physics.world.enable([this.guido, this.bulletGroup, this.enemyGroup]);

        this.enemySpawnCoords = [
            { x: 10, y: 10 },
            { x: 235, y: 5 },
            { x: 10, y: 195 },
            { x: 235, y: 195 },
            { x: 5, y: 100 },
            { x: 235, y: 100 },
        ];

        let playerHealthTextConfig = { 
            fontFamily: 'Arial', 
            fontSize: '10px', 
            color: '#000000' 
        }
        this.playerHealthText = this.add.text((config.width/3)+10, config.height*3/4+23, '', playerHealthTextConfig);
        this.playerHealthText.setScrollFactor(0);

        let timerTextConfig = { 
            fontFamily: 'Arial', 
            fontSize: '10px', 
            color: '#000000' 
        }
        this.timerText = this.add.text(config.width/4, 2, '', timerTextConfig);
        this.timerText.setScrollFactor(0);

        const gameTimerLength = 60000;
        this.gameTimer = this.time.addEvent({
            delay: gameTimerLength,
            callback: this.timer_expired,
            callbackScope: this,
            loop: false
        });

        const enemySpawnTimerLength = 8500;
        // wait a few seconds before being vulnerable
        this.time.delayedCall(3000, () => {
            this.spawn_wave();
            this.enemySpawnTimer = this.time.addEvent({
                delay: enemySpawnTimerLength,
                callback: this.spawn_wave,
                callbackScope: this,
                loop: true
            });
        }, null, this);

        // Sound effects
        this.bulletShootSound = this.sound.add('bulletShootSound');
        this.enemyHitSound = this.sound.add('enemyHitSound');
        this.playerHitSound = this.sound.add('playerHitSound');

        // Music
        this.bgm = this.sound.add('levelTheme', { loop: true, volume: 2.0 });
        this.bgm.play();

        // Level Camera
        this.cameraWidth = 256;
        this.cameraHeight = 200;
        this.cameras.main.setBounds(0, 0, this.cameraWidth, this.cameraHeight);
        this.cameras.main.startFollow(this.guido, true);

        // Game physics
        this.physics.world.setBounds(0,0, this.cameraWidth, this.cameraHeight);

        this.physics.add.overlap(this.bulletGroup, this.enemyGroup, this.enemy_bullet_collision, null, this);
        this.physics.add.overlap(this.guido, this.enemyGroup, this.enemy_player_collision, null, this);
    }

    update () {
        // Update functions
        super.update();
        this.guido.update();
        this.enemyGroup.getChildren().forEach(item => {
            item.update();
        });

        // Update timer text
        const remainingTime = Math.max(0, this.gameTimer.getRemainingSeconds()).toFixed(2);
        this.timerText.setText(`Survive until: ${remainingTime}`);

        // Player health text
        this.playerHealthText.setText(`Health: ${this.guido.currentHealth}`);
    }

    spawn_wave() {
        for (let i = 0; i < this.enemySpawnCoords.length; i++) {
            const item = this.enemySpawnCoords[i];
            this.spawn_enemy(item.x, item.y);
          }
    }

    spawn_enemy (x, y) {
        let enemy = new Enemy(this, x, y, 'enemy');
        this.physics.world.enable(enemy);
        this.enemyGroup.add(enemy);
    }

    enemy_player_collision(player, enemy) {
        enemy.destroy();
        player.damage();
        this.playerHitSound.play();
        this.cameras.main.shake(200, 0.01);
    }

    enemy_bullet_collision(bullet, enemy) {
        bullet.disable_bullet();
        bullet.destroy();
        enemy.destroy();
        this.enemyHitSound.play();
        this.cameras.main.shake(200, 0.01);
    }

    timer_expired() {
        this.sound.stopAll();
        this.scene.start("endingCutscene");
    }
}