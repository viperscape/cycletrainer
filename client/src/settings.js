import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

class Settings extends Component {
    constructor(props)
    {
        super(props);
        this.weight = React.createRef();

        this.state = { connected: false };

        this.Connected = this.Connected.bind(this);
        this.props.bus.on("data", this.Connected);
    }

    Connected(_, data)
    {
        this.setState({ connected: data.connected });
    }

    Restart()
    {
        this.props.bus.send("BLE_Restart");
        this.setState({connected:false});
    }

    componentWillUnmount()
    {
        this.props.bus.removeListener("data", this.Connected);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>Connected to Trainer</Col>
                    <Col xs={5}>
                    <input type="checkbox" disabled={true} checked={this.state.connected}></input>
                    </Col>
                    
                    <Col>
                    <Button variant="dark" onClick={ () => this.Restart() }>
                        Restart Bluetooth
                    </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>Set Weight (Kgs)</Col>
                    <Col xs={4}>
                    <input ref={this.weight} type="number" defaultValue="80"
                    onChange={ () => this.props.set({weight: this.weight.current.value}) }></input>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default Settings;