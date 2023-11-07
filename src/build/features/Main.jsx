import React, { useEffect, useState } from "react";
import { fetchData } from "../slice";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Main() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.jsonData);

  const [regionName, setRegionName] = useState("");

  const [filteredItems, setFilteredItems] = useState(data);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
    setFilteredItems(data)
  }, [status, dispatch]);
  //

  const handleInputChange = (value) => {
    setInputValue(value);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  // Apply filtering based on name and region
const filteredData = filteredItems.filter((item) => {
  if (inputValue === "" && regionName === "") {
    // If neither input nor region filter is set, return all items
    return true;
  } else if (inputValue === "" && regionName !== "") {
    // If only region filter is set, filter by region
    return item.region === regionName;
  } else if (inputValue !== "" && regionName === "") {
    // If only input filter is set, filter by the first few letters of the name
    return item.name.toLowerCase().startsWith(inputValue.toLowerCase());
  } else {
    // If both input and region filters are set, apply both filters
    return (
      item.name.toLowerCase().startsWith(inputValue.toLowerCase()) &&
      item.region === regionName
    );
  }
});

  //
  const name_set = new Set(data.map(country=>country.region))
  const name_array = Array.from(name_set)
  const sorted_regions = name_array.sort((a,b)=>a.localeCompare(b))
  const regions_list = sorted_regions.map((region, index)=><option key={index}>{region}</option>)
  //
  const filtered_data = data.filter(country=>{
    if(regionName === ""){
      return country
    }else {
      return country.region === regionName
    }
  })
  // 
  return (
    <main>
      <div className="search-bar">
        <div className="input-box">
          <FontAwesomeIcon icon={faSearch} />
          <input value={inputValue} onChange={(e)=>handleInputChange(e.target.value)} type="text" placeholder="Search for a country" />
        </div>
        <select
          name={regionName}
          id="regions"
          onChange={(e) => setRegionName(e.target.value)}
        >
          <option value="">Filter by Region</option>
          {regions_list}
        </select>
      </div>
      <div className="container">
        {filteredData.map((country) => (
          <Link to={`singlePage/${country.countryId}`} key={country.id}>
            <section>
              <img src={country.flags.png} alt="" />
              <div className="info">
                <h3>{country.name}</h3>
                <div>
                  <h4>
                    Population: <span>{country.population}</span>
                  </h4>
                  <h4>
                    Region: <span>{country.region}</span>
                  </h4>
                  <h4>
                    Capital: <span>{country.capital}</span>
                  </h4>
                </div>
              </div>
            </section>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Main;
