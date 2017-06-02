import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'whatwg-fetch';

import { GuildTrek } from './components/GuildTrek';
import { getWaypoints, MapFloor, POI } from './utils/mapMarkerFilters';

window.fetch('https://api.guildwars2.com/v1/map_floor.json?continent_id=1&floor=1&lang=de')
    .then(response => response.json())
    .then((data: MapFloor) => getWaypoints(data))
    .then(waypoints => (window as any).waypoints = waypoints)
    .then(() => {
        ReactDOM.render(
            <GuildTrek />,
            document.getElementById('body')
        );
    })
