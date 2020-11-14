import { DropMenu, RangeSlider, FilterItems } from "../../components";
import classes from "./Sidebar.module.css";

const Sidebar = ({ categories, brands, handleFilters }) => {
  return (
    <div className={classes.Sidebar}>
      <DropMenu title="Brand">
        <FilterItems
          list={brands}
          handleFilters={(filterItems) => handleFilters("brand", filterItems)}
        />
      </DropMenu>
      <DropMenu title="Category">
        <FilterItems
          list={categories}
          handleFilters={(filterItems) =>
            handleFilters("category", filterItems)
          }
        />
      </DropMenu>
      <DropMenu title="Price">
        <RangeSlider
          handleFilters={(filterItems) => handleFilters("price", filterItems)}
        />
      </DropMenu>
    </div>
  );
};

export default Sidebar;
