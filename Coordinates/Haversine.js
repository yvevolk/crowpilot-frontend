const { LFPG, EGLL } = require('./Airports.js')
function haversineDistance(coords1, coords2) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    const lat1 = coords1[0];
    const phi1 = toRad(lat1)

    const lon1 = coords1[1];
    const lambda1 = toRad(lon1)


    const lat2 = coords2[0];
    const phi2 = toRad(lat2)

    const lon2 = coords2[1];
    const lambda2 = toRad(lon2)

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
    const fraction = 0.1 // must be between 0-1
    const a2 = Math.sin((1-fraction)*c)/Math.sin(c)
    const b = Math.sin(fraction*c)/Math.sin(c)
    const x = a2 * Math.cos(phi1) * Math.cos(lambda1) + b * Math.cos(phi2) * Math.cos(lambda2) 
    const y = a2 * Math.cos(phi1) * Math.sin(lambda1) + b * Math.cos(phi2) * Math.sin(lambda2) 
    const z = a2 * Math.sin(phi1) + b * Math.sin(phi2) 
    const phii = Math.atan2(z, Math.sqrt(Math.pow(x,2) + Math.pow(y,2)))
    const lambdai = Math.atan2(y, x)
    const lati = phii / (Math.PI / 180)
    const loni = lambdai / (Math.PI / 180)
    
    console.log([lati, loni]) //intermediate point coordinates
}
//https://www.movable-type.co.uk/scripts/latlong.html
haversineDistance(EGLL,LFPG)