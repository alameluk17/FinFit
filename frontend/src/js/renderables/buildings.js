import { Entity,input,collision,game} from "melonjs";
import { APIClient } from "../apirequests";
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
                }
        );
                switch (response.b.type) {
                    case "apartment1":
                        //dialogbox.className="login"
                        formcontents.innerHTML = "<h2>Login</h2>"
                        formcontents.innerHTML += '<label for="Username">Username :</label>'
                        formcontents.innerHTML += '<input id="Username" type="text" required=true name="username">'
                        formcontents.innerHTML += '<br>'
                        formcontents.innerHTML += '<br>'
                        formcontents.innerHTML += '<label for="Password">Password :</label>'
                        formcontents.innerHTML += '<input id="Password" type="text" required=true name="password">'
                        formcontents.innerHTML += '<br><br>'
                        formcontents.innerHTML += '<button id = "RegisterButton" type="button">I need to Register!</button>'
                        formcontents.innerHTML += '<br><br>'
                        headersList.Authorization = `Basic ${btoa(username+":"+password)}`
                        let registerbutton = dialogbox.querySelector("#RegisterButton");
                        registerbutton.checked = false // registerbutton used to be a checkbox.
                        // This and the first line of the event callback for registerbutton.click roughly emulate that.
                        registerbutton.addEventListener('click', (event) => {
                                registerbutton.checked = true
                                formcontents = dialogbox.querySelector("#formcontents")
                                formcontents.innerHTML += '<label for="FirstName">First Name :</label>'
                                formcontents.innerHTML += '<input id="FirstName" type="text" required=true name="firstname">'
                                formcontents.innerHTML += '<br><br>'
                                formcontents.innerHTML += '<label for="LastName">Last Name :</label>'
                                formcontents.innerHTML += '<input id="LastName" type="text" required=true name="lastname">'
                                formcontents.innerHTML += '<br><br>'
                                formcontents.innerHTML += '<label for="Email">Email :</label>'
                                formcontents.innerHTML += '<input id="Email" type="text" required=true name="email">'
                                formcontents.innerHTML += '<br><br>'
                                registerbutton.checked = true
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
                        //dialogbox.className="hospital"
                        formcontents.innerHTML = "<p> Salud! Welcome to the hospital! </p>"
                        formcontents.innerHTML += '<br><br>'
                        formcontents.innerHTML += '<label for="payDues">You owe DolphDime Multispecialty Hospital: </label>'
                        formcontents.innerHTML += '<br><br>'
                        formcontents.innerHTML += '<input id="payAmount" type="number" name="payAmount" value = "0" readonly>'
                        formcontents.innerHTML += '<br><br>'
                        formcontents.innerHTML += '<p> Take care! </p>'
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
                    
                    case "policestation":
                    case "policedepartment":
                        //dialogbox.className="police"
                        formcontents.innerHTML = "<p> DolphDime PD Welcomes You! </p>"
                        formcontents.innerHTML += '<br><br>'
                        formcontents.innerHTML += '<label for="payDues">You owe your city PD: </label>'
                        formcontents.innerHTML += '<br><br>'
                        formcontents.innerHTML += '<input id="payAmount" type="number" name="payAmount" value = "0" readonly>'
                        formcontents.innerHTML += '<br><br>'
                        formcontents.innerHTML += '<p> Always at your service! </p>'

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
                    
                    case "postoffice":
                    case "privatebank":
                    case "publicbank":
                        // if (response.b.type=="postoffice") dialogbox.className="PO"
                        // else dialogbox.className="bank"
                        formcontents.innerHTML = '<button id = "createAccount" type = "submit">Create Account</button>'
                        formcontents.innerHTML += '<br><br>'
                        formcontents.innerHTML += '<button id = "checkBalance" type = "submit">Check Bank Balance</button>'
                        formcontents.innerHTML += '<br><br>'
                        formcontents.innerHTML += '<button id = "createDeposits" type = "submit">Create Deposits</button>'
                        formcontents.innerHTML += '<br><br>'
                        formcontents.innerHTML += '<button id = "viewDeposits" type = "submit">View Deposits</button>'
                        formcontents.innerHTML += '<br><br>'
                        let createAccButton = dialogbox.querySelector("#createAccount");
                        let checkBalButton = dialogbox.querySelector("#checkBalance");
                        let createDepButtons = dialogbox.querySelector("#createDeposits");
                        let viewDepButton = dialogbox.querySelector("#viewDeposits");
                        createAccButton.addEventListener("click", (event) =>{
                            event.preventDefault(); // We don't want to submit this fake form
                            formcontents.innerHTML = "<p> No specific information to convey :)</p>"

                        });     
                        checkBalButton.addEventListener("click", (event)=>{
                            event.preventDefault(); // We don't want to submit this fake form
                            formcontents.innerHTML = "<p> No specific information to convey :)</p>"
                        });
                        createDepButtons.addEventListener("click", (event)=>{
                            event.preventDefault(); // We don't want to submit this fake form
                            formcontents.innerHTML = "<p> No specific information to convey :)</p>"
                        });
                        viewDepButton.addEventListener("click", (event)=>{
                            event.preventDefault(); // We don't want to submit this fake form
                            formcontents.innerHTML = "<p> No specific information to convey :)</p>"
                        });

                    break;

                    case "governmentoffice":
                        formcontents.innerHTML = '<button id = "createAndVerifyID" type = "submit">Create/ Verify Government ID</button>'
                        formcontents.innerHTML += '<br><br>'
                        let createAndVerifyIDButton = dialogbox.querySelector("#createAndVerifyID");
                        createAndVerifyIDButton.addEventListener("click", (event) =>{
                            event.preventDefault(); // We don't want to submit this fake form
                            formcontents.innerHTML = "<p> No specific information to convey :)</p>"
                        }); 
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