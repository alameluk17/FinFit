import {
    audio,
    loader,
    state,
    device,
    video,
    utils,
    plugin,
    pool,
    event,
    game,
    input,
    level
} from "melonjs";

import "index.css";

import TitleScreen from "js/stage/title.js";
import PlayScreen from "js/stage/play.js";
import PlayerEntity from "js/renderables/player.js";

import DataManifest from "manifest.js";


function keyPressed(action, keyCode) {
    console.log(keyCode)
    // navigate the map :)
    if (keyCode === input.KEY.LEFT) {
        game.viewport.move(-(level.getCurrentLevel().tilewidth / 2), 0);
    }
    if (keyCode === input.KEY.RIGHT) {
        game.viewport.move(level.getCurrentLevel().tilewidth / 2, 0);
    }
    if (keyCode === input.KEY.UP) {
        game.viewport.move(0, -(level.getCurrentLevel().tileheight / 2));
    }
    if (keyCode === input.KEY.DOWN) {
        game.viewport.move(0, level.getCurrentLevel().tileheight / 2);
    }

    // shake it
    if (keyCode === input.KEY.ENTER) {
        game.viewport.shake(16, 500);
    }

    //zoom in/out
    if (keyCode === input.KEY.MINUS) {
        console.log("zoom out");
    }
    if (keyCode === input.KEY.PLUS) {
        console.log("zoom in");
    }

    // force redraw
    game.repaint();
}

device.onReady(() => {

    // initialize the display canvas once the device/browser is ready
    if (!video.init(640, 480, {parent : "screen", scale : "auto",scaleMethod : "flex"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // initialize the debug plugin in development mode.
    if (process.env.NODE_ENV === 'development') {
        import("@melonjs/debug-plugin").then((debugPlugin) => {
            // automatically register the debug panel
            utils.function.defer(plugin.register, this, debugPlugin.DebugPanelPlugin, "debugPanel");
        });
    }

    // Initialize the audio.
    audio.init("mp3,ogg");

    // allow cross-origin for image/texture loading
    loader.crossOrigin = "anonymous";

    // set and load all resources.
    loader.preload(DataManifest, function() {
        // set the user defined game stages
        state.set(state.MENU, new TitleScreen());
        state.set(state.PLAY, new PlayScreen());

        event.on(event.KEYDOWN, (e,k)=>{keyPressed(e,k);});
        // add our player entity in the entity pool
        pool.register("mainPlayer", PlayerEntity);

        // Start the game.
        state.change(state.PLAY);
    });
});
