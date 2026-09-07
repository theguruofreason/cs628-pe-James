import { useParams } from "react-router";

export default function RecipeDetails({ recipes }) {
  const { recipeId } = useParams();
  const { name, ingredients, description, instructions } = recipes.find(
    (recipe) => recipe.id === +recipeId,
  );

  return (
    <div id="recipe-details">
      <hr />
      <h2>{name}</h2>
      <hr />
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <hr />
      <h3>Description</h3>
      <p>{description}</p>
      <h3>Instructions</h3>
      <div>{instructions}</div>
    </div>
  );
}
