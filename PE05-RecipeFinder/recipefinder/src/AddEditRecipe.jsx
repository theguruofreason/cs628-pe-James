import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function AddEditRecipe({ recipes, setRecipes }) {
  const { recipeId } = useParams();
  let recipe;
  if (recipeId) {
    recipe = recipeId
      ? recipes.find((recipe) => recipe._id === recipeId)
      : {
          name: "",
          ingredients: [],
          description: "",
          instructions: "",
        };
    setTimeout(() => {
      const name = document.getElementById("recipe-name-input");
      if (name) name.value = recipe.name;
      const description = document.getElementById("descriptionInput");
      if (description) description.value = recipe.description;
      const instructions = document.getElementById("instructionsInput");
      if (instructions) instructions.value = recipe.instructions;
    }, 10);
  }
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState(recipe?.ingredients ?? []);
  const recipeNameInput = useRef();
  const descriptionInput = useRef();
  const instructionsInput = useRef();
  let newId = Math.max(...recipes.map((recipe) => recipe.id)) + 1;
  if (newId < 0) newId = 0; // to prevent -infinity when recipes == []

  function submitRecipe() {
    const method = recipeId ? "PATCH" : "POST";
    let url = `http://localhost:5050/recipes/`;
    if (recipeId) url += recipeId;
    if (!recipeNameInput.current.reportValidity()) return;
    const recipe = {
      id: newId,
      name: recipeNameInput.current.value,
      ingredients: ingredients,
      description: descriptionInput.current.value,
      instructions: instructionsInput.current.value,
    };
    fetch(url, {
      method,
      body: JSON.stringify(recipe),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  return (
    <div id="add-recipe">
      <input
        id="recipe-name-input"
        type="text"
        placeholder="Recipe Name"
        ref={recipeNameInput}
        required
      />
      <h2>Ingredients</h2>
      <IngredientsEntry {...{ ingredients, setIngredients }} />
      <h2>Description</h2>
      <textarea
        id="descriptionInput"
        maxLength={500}
        placeholder="My grandmother's pudding is..."
        ref={descriptionInput}
      />
      <h2>Instructions</h2>
      <textarea
        id="instructionsInput"
        maxLength={500}
        placeholder="Place all ingredients into cauldron..."
        ref={instructionsInput}
      />
      <button onClick={submitRecipe}>Submit</button>
    </div>
  );
}

function IngredientsEntry({ ingredients, setIngredients }) {
  return (
    <>
      {ingredients.entries().map((i) => {
        let [ind, ingredient] = i;
        return (
          <div className="flex-h" key={ind}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => {
                setIngredients(ingredients.toSpliced(ind, 1, e.target.value));
              }}
            />
            <button
              className="btn"
              onClick={() =>
                setIngredients((ingredients) => ingredients.toSpliced(ind, 1))
              }
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        );
      })}
      <div className="flex-h">
        <input
          id="latest-ingredient"
          type="text"
          placeholder="ingredient"
          required
        />
        <button
          className="btn"
          onClick={() => {
            let latestIngredient = document.getElementById("latest-ingredient");
            if (!latestIngredient.reportValidity()) return;
            setIngredients((ingredients) => [
              ...ingredients,
              latestIngredient.value,
            ]);
          }}
        >
          <i className="fa fa-plus-square"></i>
        </button>
      </div>
    </>
  );
}
