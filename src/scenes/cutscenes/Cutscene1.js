class Cutscene1 extends Phaser.Scene {
    constructor() {
        super('cutscene1');
    }

    preload () {
        this.load.image('guido', './assets/player/guido_placeholder.png');
        this.load.image('angryMob', './assets/cutscene_1/Mob.png');

        this.load.image('guidoNameLeft', './assets/cutscene_1/Guido_Name_Left.png');
        this.load.image('guidoNameRight', './assets/cutscene_1/Guido_Name_Right.png');
        this.load.image('guidoNameCenter', './assets/cutscene_1/Guido_Name_Center.png');
    }

    create () {
        // Distance between guido and mob = 100px
        let guidoSprite = this.add.sprite(-10, config.height/2, 'guido');
        let angryMobSprite = this.add.sprite(-110, (config.height/2 - 3), 'angryMob');

        this.guidoNameLeft = this.add.sprite(-150, ( config.height/2 - 20), 'guidoNameLeft');
        this.guidoNameRight = this.add.sprite(-60, ( config.height/2 - 22), 'guidoNameRight');
        this.guidoNameCenter = this.add.sprite(-105, ( config.height/2 - 28), 'guidoNameCenter');

        this.guidoNameLeft.alpha =  0;
        this.guidoNameRight.alpha =  0;
        this.guidoNameCenter.alpha =  0;
        

        let guidoTween = this.tweens.add({
            targets: guidoSprite,
            x: { from: -10, to: 170 },
            ease: 'Linear',
            duration: 5000
        });

        let guidoNameLTween = this.tweens.add({
            targets: this.guidoNameLeft,
            x: { from: -150, to: 180 },
            ease: 'Linear',
            duration: 9000
        });

        let guidoNameRTween = this.tweens.add({
            targets: this.guidoNameRight,
            x: { from: -60, to: 270 },
            ease: 'Linear',
            duration: 9000
        });

        let guidoNameCTween = this.tweens.add({
            targets: this.guidoNameCenter,
            x: { from: -105, to: 225 },
            ease: 'Linear',
            duration: 9000
        });

        let mobTween = this.tweens.add({
            targets: angryMobSprite,
            x: { from: -110, to: 220 },
            ease: 'Linear',
            duration: 9000,
            hold: 1000,
            onComplete: () => {
                console.log("done");
            }
        });

        this.show_left_text();
    }

    show_left_text() {
        this.guidoNameLeft.alpha =  1;
        // wait a few seconds before showing next text
        this.time.delayedCall(500, () => {
            this.guidoNameLeft.alpha = 0;

            this.time.delayedCall(500, () => {
                this.show_center_text();
            }, null, this);

        }, null, this);
    }

    show_center_text() {
        this.guidoNameCenter.alpha =  1;
        // wait a few seconds before showing next text
        this.time.delayedCall(500, () => {
            this.guidoNameCenter.alpha = 0;

            this.time.delayedCall(500, () => {
                this.show_right_text();
            }, null, this);
            
        }, null, this);
    }

    show_right_text() {
        this.guidoNameRight.alpha =  1;
        // wait a few seconds before showing next text
        this.time.delayedCall(500, () => {
            this.guidoNameRight.alpha = 0;

            this.time.delayedCall(500, () => {
                this.show_left_text();
            }, null, this);
            
        }, null, this);
    }

    change_scenes () {
        console.log("Done");
        //this.scene.start("finalLevel");
    }
}