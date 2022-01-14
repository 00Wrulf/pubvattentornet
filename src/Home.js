import React, {Component} from "react"
import TutorialDataService from "./tutorial.service";
import {firebase} from './firebase'

class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        //TutorialDataService.login('nibe91@gmail.com', 'nisse123');
        TutorialDataService.authe();
        //TutorialDataService.logout();
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