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
}