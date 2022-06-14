import React, {Component} from 'react';
import { Row, Col } from 'antd';
import { Button} from 'antd';
class Middleupper extends Component {
    state={count:1};
    render() {
        return (
            <middleupper className="middleupper">
    <Col span={18} push={6}>
    <Button className="tripbutton3">Trip{this.state.count+2}</Button>
    <Button className="tripbutton2">Trip{this.state.count+1}</Button>
    <Button className="tripbutton1">Trip{this.state.count}</Button>
    <br/>
    <Button ClassName="nextbutton" type="dashed" onClick={()=>this.setState({count:this.state.count+3})}>Next</Button>
    <Button ClassName="previousbutton" type="dashed" onClick={()=>this.setState({count:this.state.count-3})}>Previous</Button>
    </Col>
    <Col span={6} pull={18}>
    <Button>Create Plan</Button>
    </Col>
            </middleupper>
        );
    }
}

export default Middleupper;

