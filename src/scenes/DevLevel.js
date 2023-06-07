class DevLevel extends GameScene {
    constructor () {
        super('devLevel')
    }

    preload () {
        // ------------------------ Load Images ---------------------------
        this.load.image('guido', './assets/guido_placeholder.png');

        this.load.image('demo_tilemap_png', './assets/tilemaps/demo_tilesheet.png');
        this.load.tilemapTiledJSON('demo_tilemap_JSON', './assets/tilemaps/demo_tilemap.json');
    }

    create () {
        // --------------------- Parent Class Reference -------------------------------
        super.create();
        this.sceneKey = this.scene.key;
 
        // ---------------------- Level Tilemap -------------------------------- //
        const map = this.add.tilemap("demo_tilemap_JSON");
        console.log(map);
        const tileset = map.addTilesetImage("level_tileset", "demo_tilemap_png");

        // Add layers
        const bgLayer = map.createLayer('Ground', tileset, 0, 0);

        // ----------------------- Level Objects ---------------------------
        this.guido = new Guido(this, 0, 0, 'guido');

        // ---------------------- Level Camera
        //this.cameras.main.startFollow(this.guido);
        this.camera = this.cameras.main;
        console.log("( ", this.camera.x, ", ", this.camera.y, " )");
    }

    update () {
        // Update functions
        super.update();
        this.guido.update();
    }

}