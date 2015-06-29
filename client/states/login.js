'use strict'

var _ = require('underscore');
var GameEngine = require('../../shared/game_engine.js');
var PlayerFactory = require('../core/player_factory.js');
var GameComponent = require('../../shared/core/component.js');
var SnapshotManager = require('../../shared/core/snapshot_manager.js');
var RespawnJSON = require('../../gui/game-gui.js');

//Private variables
var thisGame;
var nextState;

function LoginState(game, state) {
    thisGame = game;
    nextState = state;
};

///
LoginState.prototype = Object.create(Phaser.State.prototype);
LoginState.prototype.constructor = LoginState;

///
//Phaser Methods

//Init is the first function called when starting the State
//Parameters comes from game.state.start()
LoginState.prototype.init = function() {};

LoginState.prototype.preload = function() {
    //this.setPhaserPreferences();
    this.loadAssets();
};

LoginState.prototype.create = function() {
    this.loadTheme();
    this.setupGUI();
    this.addNextStateEvents();
};

//Add next state functions to Enter Key or Login button
LoginState.prototype.addNextStateEvents = function() {
    document.getElementById("loginbtn").addEventListener("click", function() {
        document.getElementById("initialScreen").style.display = "none";
        var nickname = document.getElementById("nickname").value;
        thisGame.state.start(nextState, true, false, nickname);
    });

    document.getElementById('nickname').addEventListener('keydown', function(event) {
        if (event.keyCode == 13) {
            console.log('Pressed enter');
            document.getElementById("initialScreen").style.display = "none";
            var nickname = document.getElementById("nickname").value;
            thisGame.state.start(nextState, true, false, nickname);
        }
    });
};

//Switch to next state
LoginState.prototype.switchState = function(param) {
    console.log('Going to ' + nextState);
    thisGame.state.start(nextState, true, false, param);
}

LoginState.prototype.loadAssets = function() {
    /* ------------- health bar assets -----------------*/
    thisGame.load.image('blackbox', 'assets/blackbox.png');
    thisGame.load.image('redbar', 'assets/redbar.png');
    /* ------------------------------------------------ */

    //Spritesheet (name, directory, width of each sprite, height of each, how many sprites)
    thisGame.load.spritesheet('dead_boat', 'assets/dead_boat.png', 306, 107, 2);

    thisGame.load.tilemap('backgroundmap', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
    thisGame.load.image('gameTiles', 'assets/watertile.png');
    thisGame.load.image('boat_0', 'assets/boat_0.png');
    thisGame.load.image('bullet', 'assets/bullet.png');
    thisGame.load.image('red_arrow', 'assets/red_arrow.png');
    thisGame.load.image('/gui/assets/img/lvlcomplete.png', '/gui/assets/img/lvlcomplete.png');
    thisGame.load.image('respawnDialogBox', '/gui/assets/img/respawnDialogBox.png');
    thisGame.load.image("/gui/assets/img/star2.png", "/gui/assets/img/star2.png");
    thisGame.load.image("/gui/assets/img/orange-btn.png", "/gui/assets/img/orange-btn.png");
};

LoginState.prototype.loadTheme = function() {
    EZGUI.Theme.load(['/gui/assets/metalworks-theme/metalworks-theme.json'], function () {
        var dlg1  = EZGUI.create(RespawnJSON, 'metalworks');
        dlg1.visible=false;
    
        //EZGUI.components.respawnTime.text = '9';
    });
};

LoginState.prototype.setupGUI = function() {
//    EZGUI.components.
}

module.exports = LoginState;