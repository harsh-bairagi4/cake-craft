import { useContext } from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

const Footer = () => {
  const { navigate } = useContext(Context);
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div onClick={() => navigate("/")} className="logo">
            🍰 Cake<span>Craft</span>
          </div>
          <p>
            Design unique cakes using AI and turn celebrations into memorable
            moments.
          </p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li>Create a Cake</li>
            <li>Cake Collection</li>
            <li onClick={() => navigate("/subscription")}>Pricing</li>
            <li onClick={() => navigate("/help")}>How It Works</li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Contact</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Socials</h4>
          <div className="social-icons">
            <a href="https://github.com/harsh-bairagi4/" target="_blank">
              <img src="/github.png" alt="" />
            </a>
            <a href="https://linkedin.com/in/harshbairagi" target="_blank">
               <img src="/linkedin.png" alt="" />
            </a>
            <a href="https://x.com/harskpw592" target="_blank">
              <img src="/x.png" alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CakeCraft. All rights reserved.</p>
        <p className="footer-tagline">Every cake has a creator.</p>
      </div>
      <h4 className="harsh">Built with ❤️ by Harsh</h4>
    </footer>
  );
};

export default Footer;
