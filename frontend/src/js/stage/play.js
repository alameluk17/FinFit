import { Stage, game, ColorLayer, BitmapText,level  } from "melonjs";
import UIContainer from '../renderables/panels.js'
// import HUD from '../renderables/hud/container.js'
// import data from '../data.js'

class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        level.load("finfit_map")
        game.world.addChild(new UIContainer(0,0,500,500,"Hello"))
    }
};

export default PlayScreen;
