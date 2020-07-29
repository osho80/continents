import React, { Component } from 'react';
import continentService from '../services/continentService.js'
import { ContinentList } from '../cmps/ContinentsList';

export class Home extends Component {

    state = {
        continents: null
    }

    async componentDidMount() {
        let continents = await continentService.query();
        this.setState({continents})
    }

    getCountries = async(code) => {
        this.props.history.push(`/countries/${code}`)
    }

    render() {
        const {continents} = this.state
        return(

            (continents &&<div>
                <ContinentList continents={continents} getCountries={this.getCountries}/>
            </div>)
        )
    }
}