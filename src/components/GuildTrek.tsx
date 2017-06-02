import * as React from 'react';
import {Waypoint, WaypointSelection} from './Waypoint';

export interface GuildTrekProps {};

export class GuildTrek extends React.Component<GuildTrekProps, undefined> {
    render() {
        return <WaypointSelection pois={(window as any).waypoints} />
    }
}
