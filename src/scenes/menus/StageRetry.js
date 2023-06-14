class StageRetry extends Phaser.Scene {
    constructor() {
        super('stageRetry');
    }

    init (data) {
        this.previousStageKey = data.key;
    }

    create () {
        this.canControl = false;

        this.time.delayedCall(500, () => {
            this.canControl = true
        }, null, this);

        let retryTextConfig = { 
            fontFamily: 'Arial',
            fontSize: '12px',
            //fontSize: '10px', 
            color: '#000000',
            align: "center"
        }

        const dieText = this.add.text(8, 30, "YOU COULDN'T HANDLE\nTHE PRESSURE", retryTextConfig);

        retryTextConfig.fontSize = '10px';
        const controlsText = this.add.text(45, 80, "Z - Retry stage\nX - Back to title", retryTextConfig);

        // Keyboard Input
        keyCONFIRM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyCANCEL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }

    update () {
        if (this.canControl) {
            if (Phaser.Input.Keyboard.JustDown(keyCONFIRM)) {
                this.scene.start(this.previousStageKey);
            }
            else if (Phaser.Input.Keyboard.JustDown(keyCANCEL)) {
                this.scene.start("titleScreen");
            }
        }
    }
}