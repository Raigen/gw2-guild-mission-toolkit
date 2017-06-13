import 'whatwg-fetch';

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as injectTapEventPlugin from 'react-tap-event-plugin'

import { MapFloor, getWaypoints } from './utils/mapMarkerFilters'

import App from './App'

injectTapEventPlugin();

window.fetch('https://api.guildwars2.com/v1/map_floor.json?continent_id=1&floor=1&lang=de')
    .then(response => response.json())
    .then((data: MapFloor) => getWaypoints(data))
    .then(waypoints => (window as any).waypoints = waypoints)
    .then(() => {
        ReactDOM.render(
            <App />,
            document.querySelector('body')
        );
    })
