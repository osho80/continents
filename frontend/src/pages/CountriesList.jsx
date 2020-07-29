import React from 'react' 
import continentService from '../services/continentService.js'
import { CountryPreview } from '../cmps/CountryPreview.jsx'

export class CountriesList extends React.Component {
    state = {
        countries: null
    }

    async componentDidMount() {
        const id = this.props.match.params.id
        let countries = await continentService.query(id);
        this.setState({countries})
    }

    getFlags(code) {
        return `https://www.countryflags.io/${code}/shiny/64.png`
    }

    render() {

        const {countries} = this.state
        return (
            (countries && <div className="country-list">
                <img src="../assets/imgs/undo2.png" className="back-btn" title="Go back" onClick={()=> this.props.history.push('/')} alt="back" />
                {countries.map(country => {
                    return <CountryPreview key={country.code} country={country} flagSrc={this.getFlags(country.code)}/>
                })}
                
            </div>)
        
        )}
}