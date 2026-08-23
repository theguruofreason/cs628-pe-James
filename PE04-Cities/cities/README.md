# Input
The user navigates to the root which redirects to "<root>/cities-list" to ensure the NavLinks work. The user can click on any city in the list, or click on the "Cities List" or "Add City" navlinks in the nav bar. In the "Add City" page, the user can input a name, country, and population for the city to add as well as click the "Add City" button to add the new city.

# Process
Adding a city calls setCities and adds the new city to the list of cities. If details are incomplete, error is set using setState. Afterwards the user is redirected to the cities-list.

# Output
The cities-list page displays all city names. Clicking on a city name navigates to the details for that city, which is a child-route of the cities-list. The details appear below the list. For the "Add City" route, if details are not completely filled when "Add City" is clicked, an error message is displayed.
