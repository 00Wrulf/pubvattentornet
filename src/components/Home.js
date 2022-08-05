import React, {Component} from "react"
import VattentornetDataService from "../services/vattentornet.service";

class Home extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        VattentornetDataService.userAuthorization();
        this.setState({
            content : {
                display: 'none',
            }
        })
    }
    render(){
        return(
            <div className="welcomeContainer">
                <div className="welcome">
                    <p>Lennings gata 2, Norrköping</p>
                    <h1>Pub Vattentornet</h1>
                </div>
            </div>
        );
    }
}

export default Home;