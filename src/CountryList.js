import React from 'react';

const CountryList = ({ countryList }) => {
  return (
    <ul>
      {countryList.map((country, index) => {
        return <li key={index}>{country}</li>;
      })}
    </ul>
  );
};

export default CountryList;
