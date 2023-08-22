
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import Button from "./Buttons";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  const handleBack = () => {
    console.log("Back");
  };

  return (
    <header className="header">
      <h1></h1>
      {location.pathname === "/" && ( 
        <Link to="/add" style={{ textDecoration: "none" }}>
          <Button text="Add Member" />
        </Link>
      )}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
  showAdd: PropTypes.bool.isRequired,
};

export default Header;
