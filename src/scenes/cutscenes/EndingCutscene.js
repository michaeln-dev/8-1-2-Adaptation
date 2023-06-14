class EndingCutscene extends Phaser.Scene {
    constructor() {
        super('endingCutscene');
    }

    preload () {
        this.load.image('guido', './assets/player/guido_placeholder.png');
        this.load.image('angryMob', './assets/cutscene_1/Mob.png');
        this.load.image('happyMob', './assets/cutscene_2/Happy_Mob.png');
    }

    create () {
        this.guidoSprite = this.add.sprite(-10, config.height/2, 'guido');
        this.angryMobSprite = this.add.sprite(-110, (config.height/2 - 3), 'angryMob');

        let winTextConfig = { 
            fontFamily: 'Arial', 
            fontSize: '24px', 
            color: '#000000' 
        }

        this.winText = this.add.text((config.width/4)-8, config.height/2+20, 'You Win!', winTextConfig);
        this.winText.alpha = 0;

        let guidoTween = this.tweens.add({
            targets: this.guidoSprite,
            x: { from: -10, to: 130 },
            ease: 'Linear',
            duration: 4000
        });

        let mobTween = this.tweens.add({
            targets: this.angryMobSprite,
            x: { from: -110, to: 60 },
            ease: 'Linear',
            duration: 5000,
            hold: 1000,
            onComplete: () => {
                this.guidoSprite.setFlipX(true);

                this.time.delayedCall(1000, () => {
                    this.angryMobSprite.setTexture('happyMob');

                    this.time.delayedCall(1000, () => {
                        this.winText.alpha = 1;

                        this.time.delayedCall(2000, () => {
                            this.cameras.main.fade(2000, 171, 171, 171);
                            this.cameras.main.once('camerafadeoutcomplete', () => {
                                this.change_scenes();
                            });
                        }, null, this);

                    }, null, this);

                }, null, this);
            }
        });
    }

    change_scenes () {
        this.time.delayedCall(500, () => {
            this.scene.start("titleScreen");
        }, null, this);
    }
}