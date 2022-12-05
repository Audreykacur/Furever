import mainLogo from "../../assets/logoMain.png"
import './Nav.scss'

const Navigation = ({ authentication, setShowPopup, showPopup, setIsUser }) => {
  const handleClick = () => {
    setShowPopup(true);
    setIsUser(false);
  };

  return (
    <nav>
      <div className="navigation_container">
        <img
          className="furever_logo"
          src={mainLogo}
          alt="furever_logo"
        />
        <h1>Furever</h1>
      </div>
      <div className="button_container">
      <a href="/contact"><button className="navigation_button">Contact Us</button></a>
      <button className="navigation_button">About Us</button>
      {!authentication && (
        <button
          className="navigation_button"
          onClick={handleClick}
          disabled={showPopup}
        >
          Log in
        </button>
      )}
      </div>
    </nav>
  );
};
export default Navigation;