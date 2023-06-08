class TitleScreen extends Phaser.Scene {
    constructor () {
        super('titleScreen');
    }

    preload() {
        this.load.path = './assets/title_screen/';
        this.load.audio('titleTheme', 'title_theme.mp3');

        this.load.path = '';
    }

    create () {
        this.bgm = this.sound.add('titleTheme', { loop: true });
        this.bgm.play();

        const tempText = this.add.text(10, 50, 'Press ESC to start', { fontFamily: 'Arial', fontSize: '10px', color: '#ffffff' });
        // <------------------------------ Keyboard Input ---------------------------> //
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyCONFIRM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyCANCEL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keyPAUSE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(keyPAUSE)) {
            this.bgm.stop();
            this.bgm.destroy();
            this.scene.start('devLevel');
        }
    }
}