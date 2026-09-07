import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import AddEditRecipe from "./AddEditRecipe";
import RecipeDetails from "./RecipeDetails";
import RecipeList from "./RecipeList";

function App() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5050/recipes")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.message);
        }
        response.json().then((recipes) => setRecipes(recipes));
      })
      .catch((err) => {
        console.error(err);
        throw new Error(err);
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar">
          <ul>
            <li>
              <NavLink to="/" activeClassName="active">
                Recipe List
              </NavLink>
            </li>
            <li>
              <NavLink to="/add" activeClassName="active">
                Add Recipe
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<RecipeList {...{ recipes, setRecipes }} />}>
            <Route
              path="details/:recipeId"
              element={<RecipeDetails {...{ recipes }} />}
            />
          </Route>
          <Route
            path="add"
            element={<AddEditRecipe {...{ recipes, setRecipes }} />}
          />
          <Route
            path="edit/:recipeId"
            element={<AddEditRecipe {...{ recipes, setRecipes }} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
