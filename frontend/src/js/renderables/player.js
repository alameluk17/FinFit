import { Entity,pool, game,level,loader,collision,TextureAtlas,input,Vector2d} from "melonjs";

class PlayerEntity extends Entity {

    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the parent constructor
        super(x, y , settings);
        this.isKinematic = false;
        this.walkingforce = 0.5;
        this.body.collisionType = collision.types.PLAYER_OBJECT;
        this.body.setFriction(0.4, 0.4);
        this.body.setMaxVelocity(6,6)
        game.viewport.follow(this.pos, game.viewport.AXIS.BOTH, 0.4);
        
        this.alwaysUpdate = true;
        
        let texturemap =  new TextureAtlas(
            { framewidth: 48, frameheight: 48},
            loader.getImage("Parabellum_Retro_RPG_Characters_V3_Colour")
        );
        this.renderable = texturemap.createAnimationFromName([20,21,22,23,24,25,26,27,28,29]);
        this.renderable.anchorPoint.set(0,0);
        this.renderable.addAnimation("idle_down",  [0]);
        this.renderable.addAnimation("idle_up",  [1]);
        this.renderable.addAnimation("idle_right",  [2]);
        this.renderable.addAnimation("walk_down",  [4,5]);
        this.renderable.addAnimation("walk_up",  [6,7]);
        this.renderable.addAnimation("walk_right",  [8,9]);
        this.facingdirection = "down"
        this.renderable.setCurrentAnimation("idle_down");
    }

    /**
     * update the entity
     */
    update(dt) {
        const dialogbox = document.getElementById("userdialog")
        if(this.body.vel.x===0 && this.body.vel.y===0){
            switch (this.facingdirection) {
                case "left":
                    this.renderable.setCurrentAnimation("idle_right");
                    break;
                case "right":
                    this.renderable.setCurrentAnimation("idle_right");
                    break;
                case "up":
                    this.renderable.setCurrentAnimation("idle_up");
                    break;
                case "down":
                default:
                    this.renderable.setCurrentAnimation("idle_down");
                    break;
            }
        }

        if(input.isKeyPressed("fraud")){
            const dialogbox = document.getElementById("userdialog")
            if (!dialogbox.open){
                formcontents.innerHTML ='<h3>A friend reaches out to you!</h3>'
                formcontents.innerHTML +='<p>Apparently he\'s been investing in real estate and has a killer offer for you!</p>'
                formcontents.innerHTML +='<p>He says that if you give him a periodic investment of 20,000 Dolcoins per month for 7 months, he\'ll buy you a piece of prime real estate near New Bark.</p>'
                formcontents.innerHTML +='<p>You spoke to your father and he says the plot would have been worth around 900,000 dolcoins.</p>'
                formcontents.innerHTML +='<p>Do you take your dear friend up on his offer?</p>'

                dialogbox.showModal();
            }
        }

        if(input.isKeyPressed("emergency")){
            const dialogbox = document.getElementById("userdialog")
            if (!dialogbox.open){
                formcontents.innerHTML = '<h3>EMERGENCY!</h3>'
                formcontents.innerHTML += '<br><br'
                formcontents.innerHTML += 'Pay Hospital Dues : 5000 dolcoins'
                dialogbox.showModal();
            }
        }

        if(input.isKeyPressed("info")){
            const dialogbox = document.getElementById("userdialog")
            if (!dialogbox.open){
                game.data.apiclient.recvPlayerDetails().then(
                    async (player) => {
                        let formcontents = dialogbox.querySelector("#formcontents")
                        let submitbutton = dialogbox.querySelector("#submit");
                    let cancelbutton = dialogbox.querySelector("#cancel");
    
                    submitbutton.parentNode.replaceChild(submitbutton.cloneNode(true), submitbutton) // To clear any previous event handlers.
                    submitbutton = dialogbox.querySelector("#submit");
                    
                    cancelbutton.parentNode.replaceChild(cancelbutton.cloneNode(true), cancelbutton) // To clear any previous event handlers.
                    cancelbutton = dialogbox.querySelector("#cancel");
                    cancelbutton.addEventListener("click", (event) => {
                        event.preventDefault(); // We don't want to submit this fake form
                        formcontents.innerHTML = ""
                        console.log("Hello World")
                        dialogbox.close("exited")
                    })
                    submitbutton.addEventListener("click", (event) => {
                        event.preventDefault(); // We don't want to submit this fake form
                        formcontents.innerHTML = ""
                        console.log("Hello World")
                        dialogbox.close("exited")
                    })
                        let loc = "";
                        if (player.account_location=="PRB"){
                            loc = "Private Bank"
                        }
                        else if (player.account_location=="PBB"){
                            loc = "Public Bank"
                        }
                        else if (player.account_location=="PO"){
                            loc = "Post Office"
                        }
    
                        formcontents.innerHTML = "<h1>Player Details:</h1>"
                        formcontents.innerHTML += 
                        `<div>
                            Wallet Balance: ${player.wallet_balance} dolcoins
                        </div>
                        <br>
                        <div>
                            Account Balance: ${player.account_balance}
                        </div>
                        <br>
                        <div>
                            Account Location: ${loc}
                        </div>
                        <br>
                        <div>
                           Government ID: ${player.government_id}
                        </div>
                        <br>
                        <div>
                           Expenses(monthly): ${player.monthly_expenses} dolcoins
                        </div>
                        <br>
                        <div>
                            Salary(monthly): ${player.monthly_salary} dolcoins
                        </div>
                        `
                        
                    }
                )
                dialogbox.showModal();
            }
        }

        if (!document.getElementById("userdialog").open){
            if (input.isKeyPressed("left")) {
                this.facingdirection = "left"
                this.body.force.x = -this.walkingforce;
                if (!this.renderable.isCurrentAnimation("walk_left")) {
                    this.renderable.flipX(true)
                    this.renderable.setCurrentAnimation("walk_right");
                }
            } else if (input.isKeyPressed("right")) {
                this.facingdirection = "left"
                this.body.force.x = this.walkingforce
                this.renderable.flipX(false)
                if (!this.renderable.isCurrentAnimation("walk_right")) {
                    this.renderable.setCurrentAnimation("walk_right");
                }
            } else {
                this.body.force.x = 0;
            }
    
            if (input.isKeyPressed("up")) {
                this.facingdirection = "up"
                // update the entity velocity
                this.body.force.y = -this.walkingforce
                if (!this.renderable.isCurrentAnimation("walk_up") && this.body.vel.x === 0) {
                    this.renderable.setCurrentAnimation("walk_up");
                }
            } else if (input.isKeyPressed("down")) {
                this.facingdirection = "down"
                // update the entity velocity
                this.body.force.y = this.walkingforce
                if (!this.renderable.isCurrentAnimation("walk_down") && this.body.vel.x === 0) {
                    this.renderable.setCurrentAnimation("walk_down");
                }
            } else {
                this.body.force.y = 0;
            }
        }

        // if(this.body.x > level.getCurrentLevel().getBounds())
        return (super.update(dt) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    }

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision(response, other) {
        // Make all other objects solid
        return true;
    }
};

export default PlayerEntity;
