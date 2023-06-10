class PauseMenu extends Phaser.Scene {
    constructor () {
        super("pauseScene");
    }

    init (args) {
        this.gameSceneKey = args.sceneKey;
    }

    preload () {
        // Pause menu
        this.load.path = './assets/ui/pause_menu/';
        // Images
        this.load.image('uiPauseBorder', 'ui_pause_border.png');
        this.load.image('uiPauseText', 'ui_pause_text.png');
        this.load.image('uiResumeText', 'ui_pause_resume_text.png');
        this.load.image('uiOptionsText', 'ui_pause_options_text.png');
        this.load.image('uiExitText', 'ui_pause_exit_text.png');
        this.load.image('uiButtonUnhighlighted', 'ui_button_unhighlighted.png');
        this.load.image('uiButtonHighlighted', 'ui_button_highlighted.png');
        this.load.image('fadeBorders', 'fade_borders.png');

        // Audio
        //this.load.audio('uiHighlightSound', 'ui_pause_highlight.wav');
        //this.load.audio('uiConfirmSound', 'ui_pause_confirm.wav');
        //this.load.audio('uiCancelSound', 'ui_pause_cancel.wav');
        //this.load.audio('uiEnterSound', 'ui_pause_enter.wav');
        //this.load.audio('uiExitSound', 'ui_pause_exit.wav');
        //this.load.audio('uiFadeSound', 'ui_pause_fade.wav');

        // Exit popup
        this.load.path = './assets/ui/pause_exit_popup/';
        // Images
        this.load.image('exitBorder', 'ui_pause_exit_border.png');
        this.load.image('exitText', 'ui_pause_exit_text.png');
        this.load.image('exitWarning', 'ui_pause_exit_warning.png');
        this.load.image('exitYes', 'ui_pause_exit_yes.png');
        this.load.image('exitNo', 'ui_pause_exit_no.png');
        this.load.image('uiSmallButtonUnhighlighted', 'ui_small_button_unhighlighted.png');
        this.load.image('uiSmallButtonHighlighted', 'ui_small_button_highlighted.png');

        // Reset root directory
        this.load.path = '';
    }

    create () {
        this.currentSelection = 0;

        this.subMenuCurrentSelection = 1;

        // ---------------------- Boolean Flags ------------------
        this.inSubMenu = false;
        this.canControl = true;

        // <-------------------- UI Elements ---------------------> //
        // Easy easily store the midpoint of the screen
        const w = config.width/2;
        const h = config.height/2;

        const pauseBorder = this.add.sprite(w, h, 'uiPauseBorder');
        const pauseText = this.add.sprite(w, (h - pauseBorder.height/2)+14, 'uiPauseText');
        this.exitButton = this.add.sprite(w, (h + pauseBorder.height/2)-13, 'uiButtonUnhighlighted');
        this.optionsButton = this.add.sprite(this.exitButton.x, 
            this.exitButton.y-16, 'uiButtonUnhighlighted');
        this.resumeButton = this.add.sprite(this.optionsButton.x, 
            this.optionsButton.y-16, 'uiButtonHighlighted');
        const resumeText = this.add.sprite(this.resumeButton.x, this.resumeButton.y, 'uiResumeText');
        const optionsText = this.add.sprite(this.optionsButton.x, this.optionsButton.y, 'uiOptionsText');
        const exitText = this.add.sprite(this.exitButton.x, this.exitButton.y, 'uiExitText');

        this.exitBorder = this.add.sprite(w, h, 'exitBorder');
        this.exitText = this.add.sprite(w, (h - this.exitBorder.height/2)+11, 'exitText');
        this.warningText = this.add.sprite(this.exitText.x, this.exitText.y+11, 'exitWarning');
        this.yesButton = this.add.sprite(this.warningText.x-20, 
            this.warningText.y+13, 'uiSmallButtonUnhighlighted');
        this.noButton = this.add.sprite(this.yesButton.x+40, 
            this.yesButton.y, 'uiSmallButtonHighlighted');
        this.yesText = this.add.sprite(this.yesButton.x, this.yesButton.y, 'exitYes');
        this.noText = this.add.sprite(this.noButton.x, this.noButton.y, 'exitNo');

        // <-------------------- Sound Effects --------------------> //
        this.highlightSound = this.sound.add('uiHighlightSound');
        this.confirmSound = this.sound.add('uiConfirmSound');
        this.cancelSound = this.sound.add('uiCancelSound');
        this.enterSound = this.sound.add('uiEnterSound');
        this.exitSound = this.sound.add('uiExitSound');
        this.fadeSound = this.sound.add('uiFadeSound');

        this.hide_exit_popup();
        this.enterSound.play();

        // <-------------------- Keyboard input --------------------> //
        // Store reference to input mappings from game scene
        this.oldLEFT = keyLEFT;
        this.oldRIGHT = keyRIGHT;
        this.oldUP = keyUP;
        this.oldDOWN = keyDOWN;
        this.oldCONFIRM = keyCONFIRM;
        this.oldCANCEL = keyCANCEL;
        this.oldPAUSE = keyPAUSE;

        // Make new input maps for the menu scene
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
                this.update_sub_ui();
            }
        }
    }

    update_main_ui() {
        // If player presses the pause button
        if (Phaser.Input.Keyboard.JustDown(keyPAUSE)) {
            this.resume_game();
        }

        // If player presses confirm button
        if (Phaser.Input.Keyboard.JustDown(keyCONFIRM)) {
            if (this.currentSelection == 0) {
                this.resume_game();
            }
            else if (this.currentSelection == 1) {
                this.confirmSound.play();
                console.log("Open options menu");
            }
            else if (this.currentSelection == 2) {
                this.confirmSound.play();
                this.show_exit_popup();
            }
        }

        // If player moves up in the ui
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            if (this.currentSelection == 1) {
                this.highlightSound.play();
                this.currentSelection = 0;
                this.resumeButton.setTexture('uiButtonHighlighted');
                this.optionsButton.setTexture('uiButtonUnhighlighted');
            }
            else if (this.currentSelection == 2) {
                this.highlightSound.play();
                this.currentSelection = 1;
                this.optionsButton.setTexture('uiButtonHighlighted');
                this.exitButton.setTexture('uiButtonUnhighlighted');
            }
        }
        // If player moves down in the ui
        else if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            if (this.currentSelection == 0) {
                this.highlightSound.play();
                this.currentSelection = 1;
                this.optionsButton.setTexture('uiButtonHighlighted');
                this.resumeButton.setTexture('uiButtonUnhighlighted');
            }
            else if (this.currentSelection == 1) {
                this.highlightSound.play();
                this.currentSelection = 2;
                this.exitButton.setTexture('uiButtonHighlighted');
                this.optionsButton.setTexture('uiButtonUnhighlighted');
            }
        }
    }

    update_sub_ui () {
        // If player presses confirm button
        if (Phaser.Input.Keyboard.JustDown(keyCONFIRM)) {
            if (this.subMenuCurrentSelection == 0) {
                // Disable control
                this.canControl = false;

                this.fade_out();
                // Switch back to the main scene
                //this.scene.get(this.gameSceneKey).events.emit("quit");
                //this.scene.stop("pauseScene");
            }
            else if (this.subMenuCurrentSelection == 1) {
                this.cancelSound.play();
                this.hide_exit_popup();
            }
        }

        // If player moves left in the ui
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) && this.subMenuCurrentSelection == 1) {
            this.highlightSound.play();
            this.subMenuCurrentSelection = 0;
            this.noButton.setTexture('uiSmallButtonUnhighlighted');
            this.yesButton.setTexture('uiSmallButtonHighlighted');
        }

        // If player moves right in the ui
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.subMenuCurrentSelection == 0) {
            this.highlightSound.play();
            this.subMenuCurrentSelection = 1;
            this.yesButton.setTexture('uiSmallButtonUnhighlighted');
            this.noButton.setTexture('uiSmallButtonHighlighted');
        }
    }

    show_exit_popup () {
        // Initialize the pop up menu to start on the no button
        this.inSubMenu = true;
        this.subMenuCurrentSelection = 1;
        this.noButton.setTexture('uiSmallButtonHighlighted');
        this.yesButton.setTexture('uiSmallButtonUnhighlighted');

        this.exitBorder.alpha = 1;
        this.exitText.alpha = 1;
        this.warningText.alpha = 1;
        this.yesButton.alpha = 1;
        this.noButton.alpha = 1;
        this.yesText.alpha = 1;
        this.noText.alpha = 1;
    }

    hide_exit_popup () {
        this.inSubMenu = false;

        this.exitBorder.alpha = 0;
        this.exitText.alpha = 0;
        this.warningText.alpha = 0;
        this.yesButton.alpha = 0;
        this.noButton.alpha = 0;
        this.yesText.alpha = 0;
        this.noText.alpha = 0;
    }

    fade_out () {
        this.fadeSound.play();
        const topBorder = this.add.sprite(config.width/2, -36, 'fadeBorders');
        const bottomBorder = this.add.sprite(config.width/2, config.height+36, 'fadeBorders');

        // Play fade out animation
        let topBorderTween = this.tweens.add({
            targets: topBorder,
            y: { from: -36, to: (config.height/2)-36 },
            ease: 'Linear',
            duration: 2000,
            hold: 500,
            onComplete: () => {
                this.scene.get(this.gameSceneKey).events.emit("quit");
                this.scene.stop("pauseScene");
            }
        });
        let bottomBorderTween = this.tweens.add({
            targets: bottomBorder,
            y: { from: config.height+36, to: (config.height/2)+36 },
            ease: 'Linear',
            duration: 2000,
        });
    }

    resume_game () {
        // Reassign the buttons to their initial definitions
        keyLEFT = this.oldLEFT;
        keyRIGHT = this.oldRIGHT;
        keyUP = this.oldUP;
        keyDOWN = this.oldDOWN;
        keyCONFIRM = this.oldCONFIRM;
        keyCANCEL = this.oldCANCEL;
        keyPAUSE = this.oldPAUSE;

        // Switch back to the main scene
        this.exitSound.play();
        this.scene.get(this.gameSceneKey).events.emit("resume");
        this.scene.stop("pauseScene");
    }
}