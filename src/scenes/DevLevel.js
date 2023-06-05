class DevLevel extends GameScene {
    constructor () {
        super('devLevel')
    }

    preload () {
        // ------------------------ Load Images ---------------------------
        
        this.load.image('guido', './assets/guido_placeholder.png');
    }

    create () {
        // --------------------- Parent Class Reference -------------------------------
        super.create();

        this.sceneKey = this.scene.key;
        //console.log(this.sceneKey);
        

        // ----------------------- Level Objects ---------------------------
        this.guido = new Guido(this, 100, 100, 'guido');

        // ---------------------- Level Camera
        this.cameras.main.startFollow(this.guido);
        this.cameras.main.setZoom(2.5);
    }
    update () {
        // Run parent class' update function
        super.update();

        //console.log(this.canPause);
    }

}