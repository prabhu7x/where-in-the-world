import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectById } from "../slice";

function SinglePage() {
  const navigate = useNavigate()
  const { id } = useParams();
  const country = useSelector(state=> selectById(state,Number(id)));

  if (!country || country === undefined) {
    return <div className="not-found">
    <h1>Page not found!</h1>
    <br />
    <p>click back to Home and try again</p>
    {id}
    </div> 
  }

  return (
    <div className="single-page">
      <button onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faArrowLeft} />
        back
      </button>
      <div className="container">
        <img src={country.flag} alt="" />
        <div className="info">
          <h1>{country.name}</h1>
          <div className="details">
            <h4>
              Native Name: <span>{country.nativeName}</span>
            </h4>
            <h4>
              Population: <span>{country.population}</span>
            </h4>
            <h4>
              Region: <span>{country.region}</span>
            </h4>
            <h4>
              Sub Region: <span>{country.subregion}</span>
            </h4>
            <h4>
              Capital: <span>{country.capital}</span>
            </h4>
            <h4>
              Top Level Domain: <span>{country.topLevelDomain}</span>
            </h4>
            <h4>
              Currencies: <span>{country.currencies[0].code}</span>
            </h4>
            <h4>
              Languages:{" "}
              {country.languages.map((lang, index, array) => (
                <span key={index}>
                  {index < array.length - 1
                    ? `${lang.name}, `
                    : `${lang.name}.`}
                </span>
              ))}
            </h4>
          </div>
          <div>
            <div className="border">
              <h4>Border Countries:</h4>
              <div>
              {country.borders.map((border, index) => (
                  <span key={index}>{border}</span>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
