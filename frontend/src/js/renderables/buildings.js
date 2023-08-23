import { Entity,input,collision,game} from "melonjs";

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
                    case "apartment1":
                        dialogbox.className="login"
                        formcontents.innerHTML = "<h2>Login</h2>"
                        formcontents.innerHTML += '<label for="Username">Username :</label>'
                        formcontents.innerHTML += '<input id="Username" type="text" required=true name="username">'
                        formcontents.innerHTML += '<br>'
                        formcontents.innerHTML += '<br>'
                        formcontents.innerHTML += '<label for="Password">Password :</label>'
                        formcontents.innerHTML += '<input id="Password" type="text" required=true name="password">'
                        formcontents.innerHTML += '<br>'
                        formcontents.innerHTML += '<input id = "RegisterButton" type="checkbox">Register</input>'
                        formcontents.innerHTML += '<br>'
                        headersList.Authorization = `Basic ${btoa(username+":"+password)}`
                        let registerbutton = dialogbox.querySelector("#RegisterButton");
                        registerbutton.addEventListener('change', (event) => {
                            formcontents.innerHTML += '<label for="FirstName">First Name :</label>'
                            formcontents.innerHTML += '<input id="FirstName" type="text" required=true name="firstname">'
                            formcontents.innerHTML += '<br>'
                            formcontents.innerHTML += '<label for="LastName">Last Name :</label>'
                            formcontents.innerHTML += '<input id="LastName" type="text" required=true name="lastname">'
                            formcontents.innerHTML += '<br>'
                            formcontents.innerHTML += '<label for="Email">Email :</label>'
                            formcontents.innerHTML += '<input id="Email" type="text" required=true name="email">'
                            formcontents.innerHTML += '<br>'


                        })
                        submitbutton.addEventListener("click", (event) => {
                            event.preventDefault(); // We don't want to submit this fake form
                            game.data.username = document.getElementById("Username").value
                            game.data.password = document.getElementById("Password").value

                            if (registerbutton.checked == true){
                                let email = document.getElementById("Email").value
                                let fname = document.getElementById("FirstName").value
                                let lname = document.getElementById("LastName").value
                                let bodyContent = JSON.stringify({username : game.data.username , password:game.data.password, email:email,last_name:lname,first_name:fname})
                                console.log(bodyContent)
                                
                                let response = fetch("http://127.0.0.1:8000/register", { 
                                 method: "POST",
                                 body: bodyContent,
                                 headers: headersList
                               }) .then((data) => {console.log(data); });
                               //console.log(response)

                            }
                }
                );
                        break;

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
                               }); // Untested!
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