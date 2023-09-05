import { Stage, game, ColorLayer, BitmapText,level, audio  } from "melonjs";
import UIContainer from '../renderables/panels.js'
// import HUD from '../renderables/hud/container.js'
// import data from '../data.js'

class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        audio.playTrack("#bgmusic");
        level.load("finfit_map")
        const dialogbox = document.getElementById("userdialog")

                if (dialogbox.open){return false}
                dialogbox.returnValue = {}
                let formcontents = dialogbox.querySelector("#formcontents")
                formcontents.innerHTML = "<div><h1>Welcome to FinFit!</h1></div><div>To Log In or register, visit the apartment to the left of the hospital, and press the action button - space!</div><br>"
                let formbuttons = dialogbox.querySelector("#formbuttons")
                let submitbutton = dialogbox.querySelector("#submit");
                let cancelbutton = dialogbox.querySelector("#cancel");
                dialogbox.addEventListener("close",(event)=>{cancelbutton.removeAttribute("hidden")})
                cancelbutton.setAttribute("hidden",true)
                submitbutton.parentNode.replaceChild(submitbutton.cloneNode(true), submitbutton) // To clear any previous event handlers.
                submitbutton = dialogbox.querySelector("#submit");
                
                cancelbutton.parentNode.replaceChild(cancelbutton.cloneNode(true), cancelbutton) // To clear any previous event handlers.
                cancelbutton = dialogbox.querySelector("#cancel");
                cancelbutton.addEventListener("click", (event) => {
                    event.preventDefault(); // We don't want to submit this fake form
                    formcontents.innerHTML = ""
                    console.log("Hello World")
                    dialogbox.close("exited")
                }
        );
        submitbutton.addEventListener("click", (event) => {
            event.preventDefault(); // We don't want to submit this fake form
            formcontents.innerHTML = ""
            console.log("Hello World")
            dialogbox.close("exited")
        }
);
                dialogbox.showModal();
    }
};

export default PlayScreen;
