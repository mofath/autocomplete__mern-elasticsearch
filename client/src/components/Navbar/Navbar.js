import SearchBar from "./Searchbar/Searchbar";

import { AiOutlineShopping as ShoppingBagIcon } from "react-icons/ai";
import { VscHome as HomeIcon } from "react-icons/vsc";
import { GrFavorite as FavIcon } from "react-icons/gr";
import { FaRegUser as UserIcon } from "react-icons/fa";

import classes from "./Navbar.module.css";

const Navbar = (props) => {
  return (
    <header className={[classes.Header, "vertical-layout"].join(" ")}>
      {/* ******** Heading ********* */}
      <div className={classes.Heading}>
        PLEASE NOTE THAT WE HAVE SUSPENDED SHIPPING UNTIL FURTHER NOTICE DUE TO
        COVID-19. WE APPRECIATE YOUR PATIENCE.
      </div>

      {/* ******** Navigation ********* */}
      <nav
        className={[classes.NavigationContainer, "horizontal-layout"].join(" ")}
      >
        <div className={classes.BrandLogo}>
          <h1>Shopify</h1>
        </div>
        <SearchBar />
        <div>
          <i>
            <ShoppingBagIcon color="black" size="30px" />
          </i>
          <i>
            <HomeIcon color="black" size="30px" />
          </i>
          <i>
            <FavIcon color="black" size="30px" />
          </i>
          <i>
            <UserIcon color="black" size="27px" />
          </i>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
