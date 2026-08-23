import { Link, Outlet } from "react-router";
export default function CitiesList({ cities }) {
  return (
    <div className="cities-list">
      <h1>Cities List</h1>
      <ul>
        {cities.map((city) => {
          return (
            <li key={city.id}>
              <Link to={`/cities-list/details/${city.id}`}>{city.name}</Link>
            </li>
          );
        })}
      </ul>
      <Outlet />
    </div>
  );
}
