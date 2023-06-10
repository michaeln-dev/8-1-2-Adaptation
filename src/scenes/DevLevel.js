class DevLevel extends GameScene {
    constructor () {
        super('devLevel')
    }

    preload () {
        // Player assets
        this.load.image('guido', './assets/player/guido_placeholder.png');
        this.load.image('player_gun', './assets/player/player_gun.png');

        // Tilemap assets
        this.load.image('demo_tilemap_png', './assets/tilemaps/demo_tilesheet.png');
        this.load.tilemapTiledJSON('demo_tilemap_JSON', './assets/tilemaps/demo_tilemap.json');
    }

    create () {
        // --------------------- Parent Class Reference -------------------------------
        super.create();
        this.sceneKey = this.scene.key;
 
        // ---------------------- Level Tilemap -------------------------------- //
        const map = this.add.tilemap("demo_tilemap_JSON");
        const tileset = map.addTilesetImage("demo_tilesheet_tilemap", 'demo_tilemap_png');

        // Add layers
        const bgLayer = map.createLayer('Ground', tileset, 0, 0);

        // ----------------------- Level Objects ---------------------------
        let playerGun = new PlayerGun(this, 50, 50, 'player_gun');
        this.guido = new Guido(this, 50, 50, 'guido', playerGun);

        // ---------------------- Level Camera
        this.cameras.main.setBounds(0, 0, 240, 200);
        this.cameras.main.startFollow(this.guido, true);
    }

    update () {
        // Update functions
        super.update();
        this.guido.update();
    }

}