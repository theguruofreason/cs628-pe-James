# Input
Users can click on any nav link, any recipe in the list, or the edit or delete buttons for recipes. They can also enter recipe details in the "Add Recipe" page including adding and deleting ingredients and then submitting the recipe with the "Submit" button. This page is reused for editting recipes as well.

# Process
Recipes are loaded to the list using UseEffect on the main app component. The list of ingredients can be altered using corresponding buttons to add, remove, or edit any ingredient. On submission, a POST or PATCH request is made to the server depending on the process required, and the user is routed to the main page with the list. Validation is implemented for the recipe name and when adding new ingredients.

# Output
The list is rendered at the main page. If a recipe is clicked, its details are shown. Clicking the trash icon deletes the recipe from the list, and clicking the pencil icon brings up the edit page. The plus can be clicked on the edit page to add new ingredients. If no recipes are saved, the user is notified.
