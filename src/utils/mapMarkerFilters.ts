import {flattenDeep, uniqBy} from 'lodash';

export interface POI {
    coord: number[];
    floor: number;
    name: string;
    poi_id: number;
    type: string;
}
interface RegionMap {
    points_of_interest: POI[]
}
interface Region {
    maps: {
        [x: string]: RegionMap
    }
}

export interface MapFloor {
    regions: {
        [x: string]: Region
    }
}

function filterWaypoints(a: any): boolean {
    return a.type === 'waypoint'
}

export function getWaypoints(raw: MapFloor): POI[] {
    return uniqBy<POI>(flattenDeep<POI>(Object.keys(raw.regions).map(regionKey => {
        const region = raw.regions[regionKey];
        return Object.keys(region.maps).map(mapKey => {
            const map = region.maps[mapKey];
            return map.points_of_interest.filter(filterWaypoints)
        })
    })), 'poi_id')
}
