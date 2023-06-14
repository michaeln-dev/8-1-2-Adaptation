class LevelTransition extends Phaser.Scene {
    constructor() {
        super('levelTransition');
    }

    init (data) {
        this.nextStageKey = data.key;
    }

    create () {
        this.time.addEvent({
            delay: 500,
            callback: this.change_scenes,
            callbackScope: this,
            loop: false
        });
    }

    change_scenes () {
        this.scene.start(this.nextStageKey);
    }
}