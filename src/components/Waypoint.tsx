import * as React from 'react';
import {IdToChatCode} from '../utils/base64ToHex';
import { POI } from '../utils/mapMarkerFilters';
import * as CopyToClipboard from 'react-copy-to-clipboard';

export interface WaypointSelectionProps {
    pois: POI[]
}

export interface WaypointProps {
  name: string;
  id: number;
};

interface WaypointState {
    copied: boolean;
}

export class WaypointSelection extends React.Component<WaypointSelectionProps, undefined> {
    render() {
        return <ul>
            {this.props.pois.map(poi => {
                return <li key={poi.poi_id}><Waypoint id={poi.poi_id} name={poi.name} /></li>
            })}
        </ul>
    }
}

export class Waypoint extends React.Component<WaypointProps, WaypointState> {
    state = { copied: false }

    setCopied() {
        this.setState({copied: true})
        window.setTimeout(() => {
            this.setState({copied: false})
        }, 3000)
    }

    render() {
        const {name, id} = this.props
        const code = IdToChatCode(id);
        return <span>
            {name}
            <CopyToClipboard text={code} onCopy={() => this.setCopied()}>
                <span>({code}) {this.state.copied &&<span style={{color: 'green'}}> Copied</span>}</span>
            </CopyToClipboard>
        </span>
    }
}
