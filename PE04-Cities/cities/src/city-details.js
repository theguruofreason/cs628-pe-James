import { useParams } from "react-router";

export default function CityDetails({ cities }) {
  const { cityId } = useParams();
  const city = cities.find((city) => city.id === +cityId);

  return (
    <div className="city-details">
      <h1>{city.name} Details</h1>
      <ul>
        <li>country: {city.country}</li>
        <li>population: {city.population}</li>
      </ul>
    </div>
  );
}
