import { BrowserRouter, Route, Routes, NavLink, Navigate } from "react-router";
import CitiesList from "./cities-list";
import AddCity from "./add-city";
import CityDetails from "./city-details";
import { useState } from "react";

function App() {
  const [cities, setCities] = useState([
    { id: 1, name: "Seattle", country: "USA", population: 733919 },
    { id: 2, name: "Paris", country: "France", population: 13200000 },
    { id: 3, name: "Tokyo", country: "Japan", population: 14270748 },
  ]);

  return (
    <div className="App">
      <h1>Cities Application</h1>
      <BrowserRouter>
        <div className="container">
          <nav className="navbar">
            <ul>
              <li>
                <NavLink to="/cities-list" activeClassName="active">
                  Cities List
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-city" activeClassName="active">
                  Add City
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="content">
            <Routes>
              <Route
                path="/cities-list"
                element={<CitiesList cities={cities} />}
              >
                <Route
                  path="/cities-list/details/:cityId"
                  element={<CityDetails cities={cities} />}
                />
              </Route>
              <Route
                path="/add-city"
                element={<AddCity setCities={setCities} cities={cities} />}
              />
              <Route
                path="*"
                element={<Navigate to="/cities-list" replace />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
