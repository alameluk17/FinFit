import { Stage, game, ColorLayer, BitmapText,level, audio  } from "melonjs";
import UIContainer from '../renderables/panels.js'
// import HUD from '../renderables/hud/container.js'
// import data from '../data.js'

class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        audio.playTrack("#");
        level.load("finfit_map")
    }
};

export default PlayScreen;
