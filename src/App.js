/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Search from './SearchBar';
import CountryList from './CountryList';
import axios from 'axios';

const App = () => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');

  const [countryList, setCountryList] = useState([]);
  const [countryListDefault, setCountryListDefault] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [input, setInput] = useState(query || '');

  const filterCountries = (input) => {
    const filtered = countryListDefault.filter((country) => {
      const countryName = country.toLowerCase();
      return countryName.includes(input);
    });
    setCountryList(filtered);
  };

  const fetchData = async () => {
    const response = await axios('https://restcountries.eu/rest/v2/all');
    const data = response.data;

    let countryNames = [];
    for (let i = 0; i < data.length; i++) {
      countryNames[i] = data[i].name;
    }

    // Set state, accounting for possible search term in URL
    setCountryListDefault(countryNames);
    if (input !== '') {
      setCountryList(
        countryNames.filter((country) => {
          const countryName = country.toLowerCase();
          return countryName.includes(input);
        })
      );
    } else {
      setCountryList(countryNames);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading || !countryList ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Search
            searchQuery={input}
            setSearchQuery={setInput}
            filterCountries={filterCountries}
          />
          <CountryList
            countryList={input === '' ? countryListDefault : countryList}
          />
        </div>
      )}
    </div>
  );
};

export default App;
