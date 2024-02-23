const { LFPG, EGLL } = require('./Airports.js')
function toRad(x) {
    return x * Math.PI / 180;
}
function getC(coords1, coords2) {
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

    // if(isMiles) d /= 1.60934;
    return c
}
function getFraction(time_taken, time_depart, time_arrival) {
    const datei = new Date(`2000-01-01T${time_taken}Z`)
    const date1 = new Date(`2000-01-01T${time_depart}Z`)
    const date2 = new Date(`2000-01-01T${time_arrival}Z`)

    if (date2 < date1) {
    date2.setDate(date2.getDate() + 1);
    }

    if (datei < date1) {
        datei.setDate(datei.getDate() + 1);
    }

    const fl_duration = date2 - date1
    const photo_point = datei - date1
    const fraction = (photo_point/fl_duration).toFixed(2)
    return fraction
}
function intermediatePoint(c, coords1, coords2, fraction) {
    const lat1 = coords1[0];
    const phi1 = toRad(lat1)

    const lon1 = coords1[1];
    const lambda1 = toRad(lon1)


    const lat2 = coords2[0];
    const phi2 = toRad(lat2)

    const lon2 = coords2[1];
    const lambda2 = toRad(lon2)

    const a2 = Math.sin((1-fraction)*c)/Math.sin(c)
    const b = Math.sin(fraction*c)/Math.sin(c)
    const x = a2 * Math.cos(phi1) * Math.cos(lambda1) + b * Math.cos(phi2) * Math.cos(lambda2)
    const y = a2 * Math.cos(phi1) * Math.sin(lambda1) + b * Math.cos(phi2) * Math.sin(lambda2)
    const z = a2 * Math.sin(phi1) + b * Math.sin(phi2)

    const phii = Math.atan2(z, Math.sqrt(Math.pow(x,2) + Math.pow(y,2)))
    const lambdai = Math.atan2(y, x)

    const lati = phii / (Math.PI / 180)
    const loni = lambdai / (Math.PI / 180)
    const cooridnates = [lati, loni]

    return cooridnates
}

//https://www.movable-type.co.uk/scripts/latlong.html

const c = getC(EGLL, LFPG)
const fraction = getFraction("01:00", "23:00", "03:00")
const coord = intermediatePoint(c, EGLL, LFPG, fraction)

console.log(coord);