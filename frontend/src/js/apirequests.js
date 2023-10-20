export class APIClient{
    constructor(username,password){
        this.username = username
        this.password = password
        this.endpoint = "http://localhost:8000"
        this.headersList = {
            "Accept": "application/json; indent=4",
            "User-Agent": "Game Frontend",
            "Authorization": `Basic ${btoa(this.username+":"+this.password)}`, // Untested!
            "Content-Type": "application/json"
        }
    }
    async recvUserDetails(){
        let endpoint = this.endpoint+"/users/"
        let response = await fetch(endpoint,{
            method:"GET",
            headers:this.headersList
        })
        response = await response.json()
        for (let element of response){
            if (element.username == this.username){
                return element
            }
        }
        return null
        //return response

    }
    async sendTransactionRequest(beneficiary,amount,purpose){
        let endpoint = this.endpoint+"/transaction"
        let benurl = this.endpoint+"/players"
        switch (beneficiary) {
            case "policedepartment":
            case "policestation":
                benurl+="/3/"
                break;
            case "governmentoffice":
                benurl+="/4/"
                break;
            case "bakery":
            case "cafe":
            case "fastfoodjoint":
            case "restaurant":
            case "shop1":
            case "shop2":
            case "shop3":
            case "shop4":
            case "shop5":
            case "shop6":
            case "shop7":
            case "shop8":
                benurl += "/10/"
                break;
            case "charity":
                benurl+="/9/"
                break;
            case "publicbank":
                benurl+="/8/"
                break;
            case "privatebank":
                benurl+="/7/"
                break;
            case "postoffice":
                benurl+="/6/"
                break;
            default:
                break;
        }
        let bodyContent = {beneficiary:benurl,amount:amount,purpose:purpose}
        let response = await fetch(endpoint, { 
            method: "POST",
            body: JSON.stringify(bodyContent),
            headers: this.headersList
          })
        return response
    }
    async recvDepositTypeRequest(){
        let endpoint = this.endpoint+"/fixeddeposittypes/"
        let response = await fetch(endpoint,{
            method:"GET",
            headers:this.headersList
        })
        response = await response.json()
        return response
    }
    async sendCreateDepositRequest(principal,fd_type,bank_loc){
        let endpoint = this.endpoint+"/deposits"
        let benurl = this.endpoint+"/players"
        let bodyContent = {principal:principal,fixed_deposit_type:fd_type}
        let response = await fetch(endpoint, { 
            method: "POST",
            body: JSON.stringify(bodyContent),
            headers: this.headersList
          })
        return response
    }
    async recvUserDeposits(){
        let endpoint = this.endpoint+"/deposits/"
        let user = await this.recvUserDetails()
        let response = await fetch(endpoint,{
            method:"GET",
            headers:this.headersList
        })
        response = await response.json()  
        let retlist = []
        for(let element of response ){
            if (element.owner == user.id){
                retlist.push(element)
            }
        }
        return retlist
    }

    async recvPlayerDetails(){
        let endpoint = this.endpoint+"/players/"
        let user = await this.recvUserDetails() 
        let userurl = this.endpoint+"/users/"+user.id+"/"
        let response = await fetch(endpoint,{
            method:"GET",
            headers:this.headersList
        })
        response = await response.json()
        for (let element of response){
            if (element.user == userurl){
                return element
            }
        }
        return null

    }

    async recvAssets(){
        let endpoint = this.endpoint+"/assets/"
        let response = await fetch(endpoint,{
            method:"GET",
            headers:this.headersList
        })
        response = await response.json()
        response = response.filter((x) => x.up_for_sale === true)
        return response
    }

    async sendPurchaseAssetRequest(assetid){
        let endpoint = this.endpoint+`/assets/${assetid}/purchase/`
        let response = await fetch(endpoint,{
            method:"POST",
            headers:this.headersList
        })
        response = await response.json()
        return response
    }
    async sendSaleAssetRequest(assetid,for_sale){
        let bodyContent = {up_for_sale : for_sale}
        let endpoint = this.endpoint+`/assets/${assetid}/sale/`
        let response = await fetch(endpoint,{
            method:"POST",
            body: JSON.stringify(bodyContent),
            headers:this.headersList
        })
        response = await response.json()
        return response
    }
    async sendSetGovernmentIDRequest(){
        let player = await this.recvPlayerDetails()
        if (player.government_id !== ""){
            return player
        }
        let govt_id = player.url.split("/")
        govt_id = govt_id[govt_id.length -2]
        govt_id = govt_id.padStart(12,'0')
        let endpoint = player.url
        let bodyContent = {government_id:govt_id, user:player.user}
        let response = await fetch(endpoint, { 
            method: "PUT",
            body: JSON.stringify(bodyContent),
            headers: this.headersList
          })
        return await response.json()
    }

    async createBankAccount(bank_location){
        let endpoint = this.endpoint+"/deposits/"
        let player = await this.recvPlayerDetails()
        console.log(player.account_location)
        
        if(player.account_location == null && player.government_id==""){
           return {"error":"You must create a government ID before you can create a bank account!"}
        }
        else if(player.account_location == null){
            let endpoint = player.url
            let bodyContent = {user:player.user,account_location: bank_location,government_id:player.government_id}
            let response = await fetch(endpoint, { 
            method: "PUT",
            body: JSON.stringify(bodyContent),
            headers: this.headersList})
            return response
        }
        else{
            return {"error":"You already have a bank account! (It might not be at this bank though!)"}
        }
    }
}