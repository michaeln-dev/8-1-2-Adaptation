class TitleScreen extends Phaser.Scene {
    constructor () {
        super('titleScreen');
    }

    preload() {
        this.load.path = './assets/title_screen/';
        this.load.image('titleBG', 'title_background.png');
        this.load.image('controls', 'title_controls_popup.png');

        // Button Textures
        this.load.image('startUnhighlight', 'title_start_unhighlighted.png');
        this.load.image('startHighlight', 'title_start_highlighted.png');
        this.load.image('controlsUnhighlight', 'title_controls_unhighlighted.png');
        this.load.image('controlsHighlight', 'title_controls_highlighted.png');
        this.load.image('optionsUnhighlight', 'title_options_unhighlighted.png');
        this.load.image('optionsHighlight', 'title_options_highlighted.png');
        this.load.image('creditsUnhighlight', 'title_credits_unhighlighted.png');
        this.load.image('creditsHighlight', 'title_credits_highlighted.png');

        this.load.audio('titleTheme', 'title_theme.mp3');

        this.load.path = '';
    }

    create () {
        this.canControl = true;
        this.currentSelection = 0;

        this.bgm = this.sound.add('titleTheme', { loop: true });
        this.bgm.play();

        const bg = this.add.image(config.width/2, config.height/2, 'titleBG');

        this.controlsPopup = this.add.image(config.width-42, (config.height/2)+5, 'controls');
        this.controlsPopup.alpha = 0;

        this.startText = this.add.image(27, 105, 'startHighlight');
        this.controlsText = this.add.image(this.startText.x+10, this.startText.y+10, 'controlsUnhighlight');
        this.optionsText = this.add.image(this.controlsText.x-3, this.controlsText.y+10, 'optionsUnhighlight');
        this.creditsText = this.add.image(this.optionsText.x, this.optionsText.y+10, 'creditsUnhighlight');

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
        if (this.canControl) {
            this.update_main_ui();
        }
    }

    update_main_ui () {
        // If player presses confirm button
        if (Phaser.Input.Keyboard.JustDown(keyCONFIRM)) {
            if (this.currentSelection == 0) {
                this.bgm.stop();
                this.bgm.destroy();
                this.scene.start('devLevel');
            }
            else if (this.currentSelection == 1) {
                console.log("Open controls menu");
            }
            else if (this.currentSelection == 2) {
                console.log("Open options menu");
            }
            else if (this.currentSelection == 3) {
                console.log("Open credits menu");
            }
        }

        // If player moves up in the ui
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            if (this.currentSelection == 1) {
                this.currentSelection = 0;
                this.startText.setTexture('startHighlight');
                this.controlsText.setTexture('controlsUnhighlight');
                this.controlsPopup.alpha = 0;
            }
            else if (this.currentSelection == 2) {
                this.currentSelection = 1;
                this.controlsText.setTexture('controlsHighlight');
                this.optionsText.setTexture('optionsUnhighlight');
                this.controlsPopup.alpha = 1;
            }
            else if (this.currentSelection == 3) {
                this.currentSelection = 2;
                this.optionsText.setTexture('optionsHighlight');
                this.creditsText.setTexture('creditsUnhighlight');
            }
        }

        // If player moves down in the ui
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            if (this.currentSelection == 0) {
                this.currentSelection = 1;
                this.startText.setTexture('startUnhighlight');
                this.controlsText.setTexture('controlsHighlight');
                this.controlsPopup.alpha = 1;
            }
            else if (this.currentSelection == 1) {
                this.currentSelection = 2;
                this.controlsText.setTexture('controlsUnhighlight');
                this.optionsText.setTexture('optionsHighlight');
                this.controlsPopup.alpha = 0;
            }
            else if (this.currentSelection == 2) {
                this.currentSelection = 3;
                this.optionsText.setTexture('optionsUnhighlight');
                this.creditsText.setTexture('creditsHighlight');
            }
        }
    }
}