
import "./Contact.css";
import { assets } from "../../assets/assets";

const Contact = () => {
 
  return (
    <section className="contact-page">
      <div className="contact-canvas" />

      <div className="contact-container">
      
        <div className="contact-left">
          <div className="contact-image-wrapper">
            <div className="image-glow" />
            <div className="image-ring" />
            <img src={assets.img2} alt="Harsh Bairagi" />
            <div className="image-shine" />
          </div>
        </div>

        <div className="contact-right">
          <div className="greeting-badge">Available for work</div>
          <h2 className="contact-name">
            <span className="wave">👋</span> Hi, I'm{" "}
            <span className="name-highlight">Harsh</span>
          </h2>
          <p className="contact-role">Full-Stack MERN Developer</p>

          <p className="contact-description">
            I build things that start as my own ideas — side projects, tools, apps I wished existed. Using React, Node.js, Express, and MongoDB, I take an idea from zero to shipped, handling both the logic and the look.
            {/* I got into development because I kept having ideas and no way to build them. So I learned. Now when something comes to mind — a tool, an app, a solution to something that annoys me — I can actually make it real. I work across the full MERN stack, and I care as much about how something feels to use as how it's built under the hood. Every project I take on, personal or professional, gets the same attention — clean code, thoughtful UI, and something I'd actually want to use myself. */}
          </p>

          <div className="contact-info">
            {[
              { icon: "📧", text: "harskpw592@gmail.com", href: "mailto:harskpw592@gmail.com" },
              { icon: "📱", text: "+91 7974829206", href: "tel:+917974829206" },
              { icon: "💼", text: "linkedin.com/in/harshbairagi", href: "https://linkedin.com/in/harshbairagi" },
              { icon: "💻", text: "github.com/harsh-bairagi4", href: "https://github.com/harsh-bairagi4" },
            ].map((item, i) => (
              <a
                key={i}
                className="info-item"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ animationDelay: `${0.1 * i + 0.4}s` }}
              >
                <span className="info-icon">{item.icon}</span>
                <p>{item.text}</p>
                <span className="info-arrow">→</span>
              </a>
            ))}
          </div>

          <div className="contact-actions">
            <button
              className="contact-btn primary-btn"
              onClick={() => window.open("mailto:harskpw592@gmail.com")}
            >
              <span>Contact Me</span>
              <span className="btn-glow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;