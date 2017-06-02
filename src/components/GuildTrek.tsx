import * as React from 'react';
import {Waypoint} from './Waypoint';

export interface GuildTrekProps {};

export class GuildTrek extends React.Component<GuildTrekProps, undefined> {
    render() {
        return <Waypoint name="Blabla" code="[sdfsefAAA]" />
    }
}
