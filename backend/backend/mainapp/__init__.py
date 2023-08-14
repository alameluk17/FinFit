from string import ascii_uppercase, digits

# Some Game Constants:
class GAME_CONSTANTS:
    STARTING_ACCOUNT_BALANCE= 10000
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
    FD_TYPES = [
        ("O","Ongoing"),
        ("B","Broken"),
        ("C","Completed")
    ]
    TRANSACTION_PURPOSES = [
        ("CH" ,"Charity"),
        ("WW","WithdrawalFromWallet"),
        ("DW","DepositToWallet"),
        ("EM","Emergency"),
        ("SH","Shopping")
    ]
    DEFAULT_FD_TYPE = "O"

    DELETED_USER_USERNAME = "Deleted User"
    POLICE_USER_USERNAME = "Police Station"
    HOSPITAL_USER_USERNAME = "Hospital"
    GOVERNMENTOFFICE_USER_USERNAME = "Government Office"
    POSTOFFICE_USER_USERNAME = "Post Office"
    PRIVATEBANK_USER_USERNAME = "Private Bank"
    PUBLICBANK_USER_USERNAME = "Public Bank"
    CHARITY_USER_USERNAME = "Charity"
    SHOP_USER_USERNAME = "Shop"
