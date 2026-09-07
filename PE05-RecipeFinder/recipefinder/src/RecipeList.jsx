import { Outlet } from "react-router";
import { NavLink, useNavigate } from "react-router";

export default function RecipeList({ recipes, setRecipes }) {
  console.log(recipes);
  const navigate = useNavigate();
  if (recipes.length === 0) {
    return <h2>No saved recipes...</h2>;
  }

  function deleteRecipe(id) {
    fetch(`http://localhost:5050/recipes/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id));
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  return (
    <>
      <div id="recipe-list">
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <NavLink to={`/details/${recipe.id}`}>{recipe.name}</NavLink>
              <button
                className="btn"
                onClick={() => navigate(`edit/${recipe._id}`)}
              >
                <i className="fa fa-pencil-square"></i>
              </button>
              <button className="btn" onClick={() => deleteRecipe(recipe._id)}>
                <i className="fa fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </>
  );
}
