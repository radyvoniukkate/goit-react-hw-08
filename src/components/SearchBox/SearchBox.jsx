import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "/src/redux//filtersSlice.js";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectNameFilter);

  const handleSearchChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={styles.box}>
      <label htmlFor="inputSearch">Find contacts by name</label>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.input}
        id="inputSearch"
      />
    </div>
  );
};

export default SearchBox;

