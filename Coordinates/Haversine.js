const { LFPG, EGLL } = require('./Airports.js')
function haversineDistance(coords1, coords2) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    const lat1 = coords1[0];
    const lon1 = coords1[1];

    const lat2 = coords2[0];
    const lon2 = coords2[1];

    const R = 6371; // km

    const x1 = lat2 - lat1;
    const dLat = toRad(x1);
    const x2 = lon2 - lon1;
    const dLon = toRad(x2)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    // if(isMiles) d /= 1.60934;
    console.log(d, 'km')
    
    const a =
    const b =
    const x =
    const y =
    const z = 
    const lati =
    const loni
}
//https://www.movable-type.co.uk/scripts/latlong.html
haversineDistance(EGLL,LFPG)