import * as React from 'react';
import * as CopyToClipboard from 'react-copy-to-clipboard';

export interface WaypointProps {
  name: string;
  code: string;
};

interface WaypointState {
    copied: boolean;
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
        const {name, code} = this.props
        return <span>
            {name}
            <CopyToClipboard text={code} onCopy={() => this.setCopied()}>
                <span>({code}) {this.state.copied &&<span style={{color: 'green'}}> Copied</span>}</span>
            </CopyToClipboard>
        </span>
    }
}
