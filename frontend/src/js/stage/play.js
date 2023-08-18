import { Stage, game, ColorLayer, BitmapText,level  } from "melonjs";
// import HUD from '../renderables/hud/container.js'
// import data from '../data.js'

class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        level.load("finfit_map")
    }
};

export default PlayScreen;
