from string import ascii_uppercase, digits

# Some Game Constants:
class GAME_CONSTANTS:
    STARTING_ACCOUNT_BALANCE= 0
    STARTING_MONTHLY_EXPENSES= 10000
    STARTING_MONTHLY_SALARY= 25000
    STARTING_KINDESS_INDEX= 20
    STARTING_WALLET_BALANCE = 0
    STARTING_NET_WORTH = STARTING_ACCOUNT_BALANCE+STARTING_WALLET_BALANCE
    GOVERNMENT_ID_LENGTH= 12
    STARTING_HAPPINESS_INDEX = 75
    GOVERNMENT_ID_ALPHABET= ascii_uppercase + digits
    ACCOUNT_LOCATIONS= [
        ("PRB" ,"Private Bank"),
        ("PBB" ,"Public Bank"),
        ("PO" ,"Post Office")
    ]
    ASSET_TYPES = [
        ("AP", "Apartment"),
        ("IH", "Individual House"),
        ("PL", "Plot"),
    ]
    FD_STATUSES = [
        ("O","Ongoing"),
        ("B","Broken"),
        ("C","Completed")
    ]
    
    BUY_ASSET_TRANSACTION_PURPOSE = "BA"
    TRANSACTION_PURPOSES = [
        ("CH" ,"Charity"),
        ("WW","WithdrawalFromWallet"),
        ("DW","DepositToWallet"),
        ("EM","Emergency"),
        ("SH","Shopping"),
        (BUY_ASSET_TRANSACTION_PURPOSE,"BuyAsset")
    ]
    DEFAULT_FD_STATUS = "O"

    DELETED_USER_USERNAME = "Deleted_User"
    POLICE_USER_USERNAME = "Police_Station"
    HOSPITAL_USER_USERNAME = "Hospital"
    GOVERNMENTOFFICE_USER_USERNAME = "Government_Office"
    POSTOFFICE_USER_USERNAME = "Post_Office"
    PRIVATEBANK_USER_USERNAME = "Private_Bank"
    PUBLICBANK_USER_USERNAME = "Public_Bank"
    CHARITY_USER_USERNAME = "Charity"
    SHOP_USER_USERNAME = "Shop"
    GENDERS= [
        ("M" ,"MALE"),
        ("F" ,"FEMALE"),
        ("N" ,"NEITHER")
    ]
    DEFAULT_GENDER = "N"
