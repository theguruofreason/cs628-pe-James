import { useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function AddCity({ cities, setCities }) {
  const nameInput = useRef();
  const countryInput = useRef();
  const populationInput = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  function handleNewCity() {
    const name = nameInput.current.value;
    const country = countryInput.current.value;
    const population = populationInput.current.value;
    if (name === "" || (country === "") | (population === "")) {
      setError(true);
      return;
    }
    const newId = Math.max(...cities.map((city) => city.id)) + 1;
    setCities([
      ...cities,
      { id: newId, name: name, country: country, population: population },
    ]);
    navigate("/cities-list");
  }

  return (
    <div className="add-city">
      <h1>Add City</h1>
      <p>
        Name:
        <input type="text" ref={nameInput} required />
      </p>
      <p>
        Country:
        <input type="text" ref={countryInput} required />
      </p>
      <p>
        Population:
        <input type="number" ref={populationInput} required />
      </p>
      <button onClick={handleNewCity}>Add City</button>
      {error && <p className="error">All fields are required.</p>}
    </div>
  );
}
