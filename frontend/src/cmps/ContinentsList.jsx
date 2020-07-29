import React from 'react'


export function ContinentList(props) {
    const { continents, getCountries } = props

    return (
        (continents && <section className="continents-preview">
            <table className="continents-table">
                <thead>
                    <tr>
                        <th>Continent name</th>
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                    {continents.map(continent => {
                        return <tr key={continent.code} onClick={()=>getCountries(continent.code)} className="continent-row">
                            <td>{continent.name}</td>
                            <td>{continent.code}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>)
    )
}