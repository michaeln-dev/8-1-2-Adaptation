class TitleScreen extends Phaser.Scene {
    constructor () {
        super('titleScreen');
    }

    preload() {
        this.load.path = './assets/title_screen/';
        this.load.image('titleBG', 'title_background.png');
        this.load.image('controls', 'title_controls_popup.png');
        this.load.image('credits', 'title_credits_popup.png');

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

        this.load.path = './assets/ui/pause_menu/';

        this.load.audio('uiHighlightSound', 'ui_pause_highlight.wav');
        this.load.audio('uiFadeSound', 'ui_pause_fade.wav');
        this.load.audio('uiConfirmSound', 'ui_pause_confirm.wav');
        this.load.audio('uiCancelSound', 'ui_pause_cancel.wav');
        this.load.audio('uiEnterSound', 'ui_pause_enter.wav');
        this.load.audio('uiExitSound', 'ui_pause_exit.wav');

        this.load.path = '';

        this.load.image('blankScreen', './assets/blank_screen.png');
    }

    create () {
        this.canControl = true;
        this.currentSelection = 0;
        this.inSubMenu = false;

        this.bgm = this.sound.add('titleTheme', { loop: true });
        this.bgm.play();

        const bg = this.add.image(config.width/2, config.height/2, 'titleBG');

        this.controlsPopup = this.add.image(config.width-42, (config.height/2)+5, 'controls');
        this.controlsPopup.alpha = 0;

        this.startText = this.add.image(27, 115, 'startHighlight');
        this.controlsText = this.add.image(this.startText.x+10, this.startText.y+10, 'controlsUnhighlight');
        //this.optionsText = this.add.image(this.controlsText.x-3, this.controlsText.y+10, 'optionsUnhighlight');
        this.creditsText = this.add.image(this.controlsText.x-3, this.controlsText.y+10, 'creditsUnhighlight');

        // Credits menu assets
        this.creditsPopup = this.add.image(config.width/2, config.height/2, 'credits');
        this.creditsPopup.alpha = 0;

        let creditsTextConfig = { 
            fontFamily: 'Arial', 
            fontSize: '12px', 
            color: '#000000' 
        }

        this.credits_title = this.add.text(this.creditsPopup.x-27, this.creditsPopup.y-55, 'CREDITS', creditsTextConfig);

        creditsTextConfig.fontSize = '8px';
        this.credits_coding = this.add.text(this.credits_title.x-25, this.credits_title.y+20, 'Coding    - MICHAEL NIETO', creditsTextConfig);
        this.credits_art = this.add.text(this.credits_coding.x, this.credits_coding.y+15, 'Art           - MICHAEL NIETO', creditsTextConfig);
        this.credits_music = this.add.text(this.credits_art.x, this.credits_art.y+15, 'Music      - MICHAEL NIETO', creditsTextConfig);
        this.credits_sound = this.add.text(this.credits_music.x, this.credits_music.y+15, 'Sound     - MICHAEL NIETO', creditsTextConfig);

        creditsTextConfig.fontSize = '10px';
        this.credits_song = this.add.text(this.creditsPopup.x-30, this.credits_music.y+30, 'TITLE SONG', creditsTextConfig);

        creditsTextConfig.fontSize = '8px';
        this.credits_songName = this.add.text(this.creditsPopup.x-37, this.credits_song.y+12, 'Ride of the Valkyries', creditsTextConfig);
        this.credits_arranger = this.add.text(this.creditsPopup.x-55, this.credits_songName.y+7, 'Arranged by: MICHAEL NIETO', creditsTextConfig);

        this.credits_title.alpha = 0;
        this.credits_coding.alpha = 0;
        this.credits_art.alpha = 0;
        this.credits_music.alpha = 0;
        this.credits_sound.alpha = 0;
        this.credits_song.alpha = 0;
        this.credits_songName.alpha = 0;
        this.credits_arranger.alpha = 0;

        this.highlightSound = this.sound.add('uiHighlightSound');
        this.confirmSound = this.sound.add('uiConfirmSound');
        this.cancelSound = this.sound.add('uiCancelSound');
        this.enterSound = this.sound.add('uiEnterSound');
        this.exitSound = this.sound.add('uiExitSound');

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
            if (!this.inSubMenu) {
                this.update_main_ui();
            }
            else {
                this.update_credits_ui();
            }
        }
    }

    update_main_ui () {
        // If player presses confirm button
        if (Phaser.Input.Keyboard.JustDown(keyCONFIRM)) {
            if (this.currentSelection == 0) {
                this.fade_out();
            }

            else if (this.currentSelection == 1) {
                this.confirmSound.play();
            }

            else if (this.currentSelection == 2) {
                this.confirmSound.play();
                this.creditsPopup.alpha = 1;
                this.credits_title.alpha = 1;
                this.credits_coding.alpha = 1;
                this.credits_art.alpha = 1;
                this.credits_music.alpha = 1;
                this.credits_sound.alpha = 1;
                this.credits_song.alpha = 1;
                this.credits_songName.alpha = 1;
                this.credits_arranger.alpha = 1;
                this.inSubMenu = true;
            }
        }

        // If player moves up in the ui
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            if (this.currentSelection == 1) {
                this.highlightSound.play();
                this.currentSelection = 0;
                this.startText.setTexture('startHighlight');
                this.controlsText.setTexture('controlsUnhighlight');
                this.controlsPopup.alpha = 0;
            }
            else if (this.currentSelection == 2) {
                this.highlightSound.play();
                this.currentSelection = 1;
                this.controlsText.setTexture('controlsHighlight');
                this.creditsText.setTexture('creditsUnhighlight');
                this.controlsPopup.alpha = 1;
            }
        }

        // If player moves down in the ui
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            if (this.currentSelection == 0) {
                this.highlightSound.play();
                this.currentSelection = 1;
                this.startText.setTexture('startUnhighlight');
                this.controlsText.setTexture('controlsHighlight');
                this.controlsPopup.alpha = 1;
            }
            else if (this.currentSelection == 1) {
                this.highlightSound.play();
                this.currentSelection = 2;
                this.controlsText.setTexture('controlsUnhighlight');
                this.creditsText.setTexture('creditsHighlight');
                this.controlsPopup.alpha = 0;
            }
        }
    }

    update_credits_ui () {
        if (Phaser.Input.Keyboard.JustDown(keyCANCEL)) {
            this.cancelSound.play();
            this.creditsPopup.alpha = 0;
            this.inSubMenu = false;

            this.credits_title.alpha = 0;
            this.credits_coding.alpha = 0;
            this.credits_art.alpha = 0;
            this.credits_music.alpha = 0;
            this.credits_sound.alpha = 0;
            this.credits_song.alpha = 0;
            this.credits_songName.alpha = 0;
            this.credits_arranger.alpha = 0;
        }
    }

    fade_out () {
        const fadeSound = this.sound.add('uiFadeSound');
        fadeSound.play();

        this.canControl = false;

        const blankScreen = this.add.image(config.width/2, config.height/2, 'blankScreen');
        blankScreen.alpha = 0;

        // Fade out music
        let musicTween = this.tweens.add({
            targets: this.bgm,
            volume: 0,
            ease: 'Linear',
            duration: 1000,
        });

        // Play fade out animation
        let fadeTween = this.tweens.add({
            targets: blankScreen,
            alpha: { from: 0, to: 1 },
            ease: 'Linear',
            duration: 2000,
            hold: 1000,
            onComplete: () => {
                this.bgm.stop();
                this.bgm.destroy();
                this.scene.start('tutorialLevel');
            }
        });
    }
}