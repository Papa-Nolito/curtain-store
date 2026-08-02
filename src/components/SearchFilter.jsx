import "../styles/SearchFilter.css";

function SearchFilter({
  search,
  setSearch,
  category,
  setCategory,
}) {
  return (
    <section className="search-filter">
      <input
        type="text"
        placeholder="Search curtains..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="All">
          All Categories
        </option>

        <option value="Bedroom">
          Bedroom
        </option>

        <option value="Living Room">
          Living Room
        </option>

        <option value="Office">
          Office
        </option>

        <option value="Hotel">
          Hotel
        </option>
      </select>
    </section>
  );
}

export default SearchFilter;