import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Select from 'react-select';

//CSS:
import './style/Home.css';

//Data:
import region_data from '../data/region.json';

const Home = () => {
    const [countries_array, set_countries_array] = useState([]);
    const [search_term, set_search_term] = useState('');
    const rest_countries_url = 'https://restcountries.eu/rest/v2/all';
    let iterator = 0;
    let enable_empty = true;
    let show_empty_search = false;

    useEffect(() => {
        Axios.get(rest_countries_url)
        .then((response => {
            set_countries_array(response.data);
            console.log(response.data);
        }))
        .catch((err) => {
            if (err) throw err;
        })
    }, []);

     const handler_search = (e) => {
        set_search_term(e);
        iterator = 0;
        enable_empty = true;
        show_empty_search = false;
    };

    const handle_change = (option_selected) => {
        const filter_region_url = `https://restcountries.eu/rest/v2/region/${option_selected.value}`;
         Axios.get(filter_region_url)
        .then((response => {
            set_countries_array(response.data);

        }))
        .catch((err) => {
            if (err) throw err;
        })
    }

    return (
        <div className="home-container">
            <div className="filters-section">
                <div className="input-filter-container">
                    <i class="gg-search"></i>
                    <input 
                        type="text" 
                        className="input-filter-container__input" 
                        placeholder="Search for a Country..." 
                        autoComplete="off" 
                        onChange={(e) => handler_search(e.target.value)}
                    />
                </div>
                <Select className="filter-select" options={region_data} placeholder="Filter By Region" onChange={handle_change} />
            </div>
            <div className="countries-list-section">
                {countries_array
                    .filter((val) => {
                        iterator += 1;
                    if (search_term=== '') {
                        return val;
                    } else if (
                        val.name
                            .toString()
                            .toLowerCase() 
                            .slice(0, search_term.length)
                            .includes(search_term.toLocaleLowerCase())
                    ) {
                        enable_empty = false;
                        return val;
                    } else if (iterator == countries_array.length && enable_empty == true) {
                        show_empty_search = true;
                    }
                })
                .map((country) => {
                    return (
                        <div key={country.numericCode} className="country-card">
                            <img className="country-card__img" src={country.flag} alt="country-flag" />
                            <h3 className="country-card__name__h3">{country.name}</h3>
                            <p className="country-card__population"><span>Population:</span> {country.population}</p>
                            <p className="country-card__region"><span>Region:</span> {country.region}</p>
                            <p className="country-card__capital"><span>Capital:</span> {country.capital}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Home;
