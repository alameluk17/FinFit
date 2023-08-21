import { Entity,input,collision} from "melonjs";

class BuildingEntity extends Entity{

    
        constructor(x, y, settings) {
            // call the parent constructor
            super(x, y , settings);
            this.body.setFriction(0, 0);
            this.body.collisionType = collision.types.ACTION_OBJECT;
        }
        onCollision(response, other) {
            let username="admin"
            let password="finfit"
            let headersList = {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Accept": "application/json; indent=4",
                "Authorization": `Basic ${btoa(username+":"+password)}`, // Untested!
                "Content-Type": "application/json"
               }
            if (response.a.body.collisionType == collision.types.PLAYER_OBJECT && input.isKeyPressed("action")){
                const dialogbox = document.getElementById("userdialog")
                if (dialogbox.open){return false}
                dialogbox.returnValue = {}
                let formcontents = dialogbox.querySelector("#formcontents")
                let submitbutton = dialogbox.querySelector("#submit");
                submitbutton.parentNode.replaceChild(submitbutton.cloneNode(true), submitbutton) // To clear any previous event handlers.
                submitbutton = dialogbox.querySelector("#submit");
                switch (response.b.type) {
                    case "hospital":
                        formcontents.innerHTML = "<p> Welcome to the hospital! </p>"
                        formcontents.innerHTML += '<label for="payDues">Pay Hospital Dues?</label>'
                        formcontents.innerHTML += '<select id="payDues" required=true name="payDuesopt"> <option>Yes</option> <option>No</option> </select></br>'
                        formcontents.innerHTML += '<label for="payAmount">Amount: </label>'
                        formcontents.innerHTML += '<input id="payAmount" type="number" required=true name="payAmount">'
                        submitbutton.addEventListener("click", (event) => {
                            event.preventDefault(); // We don't want to submit this fake form
                               let bodyContent = JSON.stringify(
                                {payDues:document.getElementById("payDues").value,payAmount:document.getElementById("payAmount").value}
                               );
                               let response = fetch("http://127.0.0.1:8000/", { 
                                 method: "POST",
                                 body: bodyContent,
                                 headers: headersList
                               }); // Untested! Definitely has CORS issues.
                            dialogbox.close(
                                {payDues:document.getElementById("payDues").value,payAmount:document.getElementById("payAmount").value})
                            }
                        );
                        break;
                
                    default:
                        formcontents.innerHTML = "<p> No specific information to convey :)</p>"
                        // dialogbox.querySelector()
                        break;
                }
                if (!dialogbox.open){
                    dialogbox.showModal();
                }
            }
            return false
        }
    }

export default BuildingEntity;