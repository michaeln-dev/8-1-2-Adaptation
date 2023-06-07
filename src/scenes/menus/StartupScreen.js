class StartupScreen extends Phaser.Scene {
    constructor() {
        super('startupScreen');
    }

    preload() {
        this.load.image('bg', './assets/title_screen/Title_CMPM_BG.png');
        this.load.image('logo', './assets/title_screen/Title_CMPM_Logo.png');

        this.load.audio('sfx', './assets/title_screen/Title_SFX.wav');
    }

    create() {
        let logoPositionX = config.width/2;
        let logoPositionY = config.height/2 - config.height;

        let startupSound = this.sound.add('sfx');

        const bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
        const logo = this.add.image(logoPositionX, logoPositionY, 'logo');

        // Make the logo drop down into view
        let logoDropDownTween = this.tweens.add({
            targets: logo,
            y: { from: logoPositionY, to: (logoPositionY + config.height) },
            ease: 'Linear',
            duration: 3000,
            onComplete: () => {
                startupSound.play();

                // Make the logo fade out
                let logoFadeOutTween = this.tweens.add({
                    targets: logo,
                    alpha: { from: 1, to: 0 },
                    ease: 'Linear',
                    delay: 2000,
                    duration: 500,
                    hold: 500,
                    onComplete: () => {
                        // Start next scene
                        this.scene.start('devLevel');
                    }
                });
            }
        });
    }

}