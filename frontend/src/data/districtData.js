export const districtCoordinates = {
    "Mumbai City": { lat: 18.9388, lng: 72.8353 },
    "Mumbai Suburban": { lat: 19.1136, lng: 72.8697 },
    "Thane": { lat: 19.2183, lng: 72.9781 },
    "Pune": { lat: 18.5204, lng: 73.8567 },
    "Nagpur": { lat: 21.1458, lng: 79.0882 },
    "Nashik": { lat: 19.9975, lng: 73.7898 },
    "Aurangabad": { lat: 19.8762, lng: 75.3433 },
    "Solapur": { lat: 17.6599, lng: 75.9064 },
    "Kolhapur": { lat: 16.7050, lng: 74.2433 },
    "Amravati": { lat: 20.9320, lng: 77.7523 },
    "Nanded": { lat: 19.1383, lng: 77.3210 },
    "Sangli": { lat: 16.8524, lng: 74.5815 },
    "Jalgaon": { lat: 21.0077, lng: 75.5626 },
    "Akola": { lat: 20.7002, lng: 77.0082 },
    "Latur": { lat: 18.4088, lng: 76.5604 },
    "Dhule": { lat: 20.9042, lng: 74.7749 },
    "Ahmednagar": { lat: 19.0952, lng: 74.7496 },
    "Chandrapur": { lat: 19.9615, lng: 79.2961 },
    "Parbhani": { lat: 19.2644, lng: 76.6413 },
    "Ichalkaranji": { lat: 16.6992, lng: 74.4582 },
    "Jalna": { lat: 19.8297, lng: 75.8800 },
    "Bhusawal": { lat: 21.0455, lng: 75.7837 },
    "Navi Mumbai": { lat: 19.0330, lng: 73.0297 },
    "Panvel": { lat: 18.9894, lng: 73.1175 }
};

export const getDistrictCoordinates = (districtName) => {
    return districtCoordinates[districtName] || districtCoordinates["Mumbai City"];
};
