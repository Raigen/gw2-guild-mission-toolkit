import 'whatwg-fetch';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MapFloor, POI, getWaypoints } from './utils/mapMarkerFilters';

import { GuildTrek } from './components/GuildTrek';

window.fetch('https://api.guildwars2.com/v1/map_floor.json?continent_id=1&floor=1&lang=de')
    .then(response => response.json())
    .then((data: MapFloor) => getWaypoints(data))
    .then(waypoints => (window as any).waypoints = waypoints)
    .then(() => {
        ReactDOM.render(
            <GuildTrek />,
            document.querySelector('body')
        );
    })
