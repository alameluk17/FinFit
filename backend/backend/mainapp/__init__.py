from string import ascii_uppercase, digits

# Some Game Constants:
class GAME_CONSTANTS:
    STARTING_ACCOUNT_BALANCE= 10000
    STARTING_MONTHLY_EXPENSES= 10000
    STARTING_MONTHLY_SALARY= 25000
    STARTING_KINDESS_INDEX= 20
    GOVERNMENT_ID_LENGTH= 12
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
