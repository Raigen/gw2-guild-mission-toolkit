import 'whatwg-fetch';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import { MapFloor, POI, getWaypoints } from './utils/mapMarkerFilters';

import { GuildBounty } from './components/GuildBounty';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const params = new URLSearchParams(document.location.search);
const difficulty = params.has('diff') ? Number.parseInt(params.get('diff'), 10) : 3;

const App = () => (
    <MuiThemeProvider>
        <GuildBounty difficulty={difficulty} />
    </MuiThemeProvider>
)

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
