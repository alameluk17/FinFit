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
    Vector2d
} from "melonjs";

import "index.css";
import { APIClient } from "./js/apirequests";
import TitleScreen from "js/stage/title.js";
import PlayScreen from "js/stage/play.js";
import PlayerEntity from "js/renderables/player.js";
import BuildingEntity from "js/renderables/buildings.js";
import UIContainer from "js/renderables/panels.js";

import DataManifest from "manifest.js";


device.onReady(() => {

    // initialize the display canvas once the device/browser is ready
    if (!video.init(1280, 720, {parent : "screen", scale : "auto"})) {
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

        // event.on(event.KEYDOWN, (e,k)=>{keyPressed(e,k);});
        // add our player entity in the entity pool
        pool.register("mainPlayer", PlayerEntity);
        pool.register("building",BuildingEntity)
        pool.register("plot",BuildingEntity)
        pool.register("UIContainer",UIContainer)
       
        input.bindKey(input.KEY.LEFT,  "left");
        input.bindKey(input.KEY.RIGHT, "right");
        // map X, Up Arrow and Space for jump
        input.bindKey(input.KEY.UP,     "up");
        input.bindKey(input.KEY.DOWN,     "down");
        input.bindKey(input.KEY.SPACE,  "action", true);
        input.bindKey(input.KEY.F,  "fraud");
        input.bindKey(input.KEY.E,  "emergency");
        input.bindKey(input.KEY.I,  "info");
        // Start the game.
        game.world.gravity = new Vector2d(0,0)
        game.data = {}
        game.data.apiclient = new APIClient("admin","finfit")
        // game.data.apiclient = new APIClient("test","finfit@123")
        // game.data.apiclient.recvAssets().then(
        //     async (value) => {
        //         console.log(value)
        //         game.data.apiclient.sendPurchaseAssetRequest(1).then(
        //             async (value) => {console.log(value)
        //                 game.data.apiclient.sendSaleAssetRequest(1,true).then(
        //                     async (value) => {console.log(value)}
        //                 )
        //             }
        //         )
        //     }
        // )
        console.log(game.data.apiclient.gender)
        state.change(state.PLAY);
    });
});
