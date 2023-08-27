import { Entity,input,collision,game} from "melonjs";
import { APIClient } from "../apirequests";


class BuildingEntity extends Entity{

    
        constructor(x, y, settings) {
            // call the parent constructor
            super(x, y , settings);
            this.body.setFriction(0, 0);
            this.body.collisionType = collision.types.ACTION_OBJECT;
        }

        calculateEstimates(){
            let principal = parseFloat(document.getElementById("principal").value);
            let table = document.getElementById("table");
            let rows = table.rows;
        
            for (let i = 1; i < rows.length; i++) {
                let interest_rate = parseFloat(rows[i].cells[3].innerText) / 100;
                let term = parseFloat(rows[i].cells[2].innerText) / 12;
                
                // Calculate compound interest
                let A = principal * Math.pow((1 + interest_rate), term);
        
                rows[i].cells[4].innerText = A.toFixed(2); // Updating the estimate column
            }
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
                        game.data.CURRENT_COLLISION = response.b.type
                        formcontents.innerHTML = '<button id = "createAccount" type = "submit">Create Account</button>'
                        formcontents.innerHTML += '<br><br>'
                        formcontents.innerHTML += '<button id = "checkBalance" type = "submit">Check Bank Balance</button>'
                        formcontents.innerHTML += '<br><br>'
                        formcontents.innerHTML += '<button id = "createDeposits" type = "submit">Create Deposits</button>'
                        formcontents.innerHTML += '<br><br>'
                        formcontents.innerHTML += '<button id = "viewDeposits" type = "submit">View Deposits</button>'
                        formcontents.innerHTML += '<br><br>'
                        // formcontents.innerHTML += '<button id = "withdrawDolCoins" type = "submit">Withdraw DolCoins</button>'
                        // formcontents.innerHTML += '<br><br>'
                        let createAccButton = dialogbox.querySelector("#createAccount");
                        let checkBalButton = dialogbox.querySelector("#checkBalance");
                        let createDepButtons = dialogbox.querySelector("#createDeposits");
                        let viewDepButton = dialogbox.querySelector("#viewDeposits");
                        // let withdrawButton = dialogbox.querySelector("#withdrawDolCoins");

                        createAccButton.addEventListener("click", (event) =>{
                            event.preventDefault(); // We don't want to submit this fake form
                            let createAccDetails = {}
                            let current_location = ""
                            if (game.data.CURRENT_COLLISION == "privatebank") current_location="PRB"
                            else if (game.data.CURRENT_COLLISION == "publicbank") current_location="PBB"
                            else current_location="PO"
                            game.data.apiclient.createBankAccount(current_location).then(
                                async(createAccDets) => {
                                createAccDetails = createAccDets;
                                console.log(createAccDetails)

                                if(Object.hasOwn(createAccDetails, 'error')){
                                    formcontents.innerHTML = `<p>${createAccDetails["error"]}</p>`
                                }
                                else{
                                    formcontents.innerHTML = '<p>Account Creation Successful!</p>'
                                }
                                formcontents.innerHTML += '<br><br>'
                        }); 
                    }); 
                        checkBalButton.addEventListener("click", (event)=>{
                            event.preventDefault(); // We don't want to submit this fake form
                            let playerDetails = {}
                                game.data.apiclient.recvPlayerDetails().then(
                                    async(playerDets) => {
                                playerDetails = playerDets;
                                console.log(playerDetails)
                                let current_location=""
                                if (game.data.CURRENT_COLLISION == "privatebank") current_location="PRB"
                                else if (game.data.CURRENT_COLLISION == "publicbank") current_location="PBB"
                                else current_location="PO"
                                if (playerDetails.account_location==current_location){
                                    formcontents.innerHTML = '<p>Your Account Balance: </p>'
                                    formcontents.innerHTML += '<br><br>'
                                    formcontents.innerHTML += `<input id="accBal" type="number" name="accBal" value=${playerDetails.account_balance} readonly>`
                                    formcontents.innerHTML += '<br><br>'
                                }
                                else {
                                    formcontents.innerHTML = '<p>You do not have an account here! Go back to create one!</p>'
                                    formcontents.innerHTML += '<br><br>'
                                }
                                    });
                            
                        });
                        createDepButtons.addEventListener("click", (event)=>{
                            event.preventDefault(); // We don't want to submit this fake form
                            formcontents.innerHTML = ""

                            let table = document.createElement("table");
                            table.setAttribute("id", "table")
                          
                            let deposits =[]
                            game.data.apiclient.recvDepositTypeRequest().then(
                                async(dep) => {
                                    deposits=dep;
                                    let resultDep = []
                                for(let element of deposits){
                                    element.estimate=0
                                    if (element.location == "PBB" && game.data.CURRENT_COLLISION == "publicbank" && element.scheme_name != "Public Provident Fund") resultDep.push(element)
                                    if (element.location == "PRB" && game.data.CURRENT_COLLISION == "privatebank" && element.scheme_name != "Public Provident Fund") resultDep.push(element)
                                    if (element.location == "PO" && game.data.CURRENT_COLLISION == "postoffice") resultDep.push(element)
                                }

                                let thead = table.createTHead();
                                let row = thead.insertRow();
                                for (let key of Object.keys(resultDep[0])) {
                                if (key=="id" || key=="scheme_name" || key=="interest_rate" || key=="term" || key=="estimate"){
                                    let th = document.createElement("th");
                                    if (key=="interest_rate") key+=" (%)"
                                    if (key=="term") key+=" (in months)"
                                    let text = document.createTextNode(key);
                                    th.appendChild(text);
                                    row.appendChild(th);
                                    
                                }
                                }

                                for (let element of resultDep) {
                                    let row = table.insertRow();
                                    let retParams = ["id", "scheme_name","term", "interest_rate", "estimate"]
                                    for (let key of retParams) {
                                        let cell = row.insertCell();
                                        let text = document.createTextNode(element[key]);
                                        cell.appendChild(text);
                                    }
                                    }
                                
                                formcontents.appendChild(table)
                                formcontents.innerHTML += '<br><br>'
                                let playerDetails = {}
                                game.data.apiclient.recvPlayerDetails().then(
                                    async(playerDets) => {
                                playerDetails = playerDets;
                                console.log(playerDetails)
                                formcontents.innerHTML += '<label for="pricipalAmount">Principal</label>'
                                formcontents.innerHTML += '<br><br>'
                                if(game.data.CURRENT_COLLISION=="postoffice"){
                                    if(playerDetails.gender=="F"){
                                        formcontents.innerHTML += '<input id="principal" type="number" name="principal">'
                                        formcontents.innerHTML += '<br><br>'
                                        formcontents.innerHTML += '<label for ="DepType">Deposit Type</label>'
                                        formcontents.innerHTML += '<br><br>'
                                        formcontents.innerHTML += '<input id="depID" type="number" name="depID">'
                                        formcontents.innerHTML += '<br><br>'

                                        const inputElement = document.getElementById("principal");
                                        inputElement.addEventListener('input', this.calculateEstimates)
                                    }
                                    else{
                                        formcontents.innerHTML += '<input id="principal" type="number" name="principal" readonly>'
                                        formcontents.innerHTML += '<br><br>'
                                        formcontents.innerHTML += '<label for ="DepType">Deposit Type</label>'
                                        formcontents.innerHTML += '<br><br>'
                                        formcontents.innerHTML += '<input id="depID" type="number" name="depID" readonly>'
                                        formcontents.innerHTML += '<br><br>'
                                        formcontents.innerHTML += '<p> Mahila Samman Savings Scheme cannot be availed by you!! </p>'
                                    }
                                }
                                else{
                                    formcontents.innerHTML += '<input id="principal" type="number" name="principal">'
                                    formcontents.innerHTML += '<br><br>'
                                    formcontents.innerHTML += '<label for ="DepType">Deposit Type</label>'
                                    formcontents.innerHTML += '<br><br>'
                                    formcontents.innerHTML += '<input id="depID" type="number" name="depID">'
                                    formcontents.innerHTML += '<br><br>'

                                    const inputElement = document.getElementById("principal");
                                    inputElement.addEventListener('input', this.calculateEstimates)
                                }
                                });
                            }
                            )
                            
                        });
                        viewDepButton.addEventListener("click", (event)=>{
                            event.preventDefault(); // We don't want to submit this fake form
                            let current_location = ""

                            let table = document.createElement("table");
                            table.setAttribute("id", "table")

                            if (game.data.CURRENT_COLLISION == "privatebank") current_location="PRB"
                            else if (game.data.CURRENT_COLLISION == "publicbank") current_location="PBB"
                            else current_location="PO"
                            let deposits = []
                                game.data.apiclient.recvUserDeposits().then(
                                    async(dep) => {
                                deposits = dep;
                                console.log(deposits)
                                formcontents.innerHTML = ""
                                if(deposits.length == 0) formcontents.innerHTML = '<p>You do not have any deposits yet! Create one! </p>'
                                else{
                                    let depositTypes =[]
                                    game.data.apiclient.recvDepositTypeRequest().then(
                                        async(depTypes) => {
                                            depositTypes = depTypes;
                                            console.log(depositTypes)
                                            let UserDeposits = []
                                            for(let userElement of deposits){
                                                for(let element of depositTypes){
                                                    if (userElement.fixed_deposit_type==element.id){
                                                        if(element.location==current_location){
                                                            let resElement ={}
                                                            resElement.id = element.id
                                                            resElement.scheme_name = element.scheme_name
                                                            resElement.interest_rate = element.interest_rate
                                                            resElement.term = element.term
                                                            resElement.principal = userElement.principal
                                                            UserDeposits.push(resElement)
                                                        }
                                                    }
                                                }
                                            }
                                            if (UserDeposits.length!=0){
                                                let thead = table.createTHead();
                                                let row = thead.insertRow();
                                                for (let key of Object.keys(UserDeposits[0])) {
                                                if (key=="id" || key=="scheme_name" || key=="interest_rate" || key=="term" || key=="principal"){
                                                    let th = document.createElement("th");
                                                    if (key=="interest_rate") key+=" (%)"
                                                    if (key=="term") key+=" (in months)"
                                                    let text = document.createTextNode(key);
                                                    th.appendChild(text);
                                                    row.appendChild(th);
                                                    
                                                }
                                                }
                
                                                for (let element of UserDeposits) {
                                                    let row = table.insertRow();
                                                    let retParams = ["id", "scheme_name","term", "interest_rate", "principal"]
                                                    for (let key of retParams) {
                                                        let cell = row.insertCell();
                                                        let text = document.createTextNode(element[key]);
                                                        cell.appendChild(text);
                                                    }
                                                    }
                                                
                                                formcontents.appendChild(table)
                                                formcontents.innerHTML += '<br><br>'
                                            }
                                            else{
                                                formcontents.innerHTML = '<p>You have not made any deposits in this bank! Maybe you do in another!</p>'
                                                formcontents.innerHTML += '<br><br>'
                                            }
                                        
                                    });
                                }
                                });

                        });
                        

                    break;

                    case "governmentoffice":
                        formcontents.innerHTML = '<button id = "createAndVerifyID" type = "submit">Create/ Verify Government ID</button>'
                        formcontents.innerHTML += '<br><br>'
                        let createAndVerifyIDButton = dialogbox.querySelector("#createAndVerifyID");
                        createAndVerifyIDButton.addEventListener("click", (event) =>{
                            event.preventDefault(); // We don't want to submit this fake form
                            formcontents.innerHTML = ""
                            let playerDetails = {}
                            game.data.apiclient.sendSetGovernmentIDRequest().then(
                                async(dets) => {
                            playerDetails = dets;
                            console.log(playerDetails)
                            formcontents.innerHTML = `<p>Your Government ID: ${playerDetails.government_id}</p>`
                            formcontents.innerHTML += '<br><br>'

                                });

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