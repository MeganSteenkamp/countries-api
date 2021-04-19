import { useHistory } from 'react-router-dom';

const SearchBar = ({ searchQuery, setSearchQuery, filterCountries }) => {
  const history = useHistory();
  
  const onSubmit = (e) => {
    history.push(`?s=${searchQuery}`);
    e.preventDefault();
  };

  return (
    <form
      className="field"
      action="/"
      method="get"
      autoComplete="off"
      onSumbit={onSubmit}
    >
      <label className="label" htmlFor="countries-search">
        <span className="visually-hidden">Search countries</span>
      </label>
      <div class="field has-addons">
        <input
          className="input"
          type="text"
          id="country-search"
          placeholder="Search countries..."
          name="s"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            filterCountries(e.target.value);
          }}
        />
        <button className="button is-link" type={'submit'}>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
