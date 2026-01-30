# Maharashtra Districts for CivicMind AI
# All 36 districts of Maharashtra state, India

MAHARASHTRA_DISTRICTS = [
    "Mumbai City",
    "Mumbai Suburban",
    "Thane",
    "Raigad",
    "Palghar",
    "Pune",
    "Ahmednagar",
    "Solapur",
    "Satara",
    "Sangli",
    "Kolhapur",
    "Ratnagiri",
    "Sindhudurg",
    "Nashik",
    "Dhule",
    "Nandurbar",
    "Jalgaon",
    "Aurangabad",
    "Jalna",
    "Beed",
    "Latur",
    "Osmanabad",
    "Parbhani",
    "Hingoli",
    "Nanded",
    "Nagpur",
    "Wardha",
    "Bhandara",
    "Gondia",
    "Chandrapur",
    "Gadchiroli",
    "Amravati",
    "Akola",
    "Washim",
    "Buldhana",
    "Yavatmal",
]

def get_districts():
    """Returns list of all Maharashtra districts"""
    return MAHARASHTRA_DISTRICTS

def is_valid_district(district_name):
    """Check if district name is valid"""
    return district_name in MAHARASHTRA_DISTRICTS
