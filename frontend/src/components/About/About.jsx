import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h2>
            🎂 About Cake<span>Craft</span>
          </h2>
          <p>
            Where creativity meets technology — design, customize and order
            cakes with the power of AI.
          </p>
        </div>

        <div className="about-content">
          {/* WHAT WE DO */}
          <div className="about-card">
            <h3>✨ What We Do</h3>
            <p>
              CakeCraft is an AI-powered cake customization platform that allows
              users to either choose from pre-designed cakes or create their own
              custom cake using artificial intelligence.
            </p>
            <p>
              Users can select flavor, size, layers, frosting, shape, sweetness,
              toppings— and instantly generate a realistic preview of their
              cake.
            </p>
          </div>

          {/* HOW IT WORKS */}
          <div className="about-card">
            <h3>🛒 How It Works</h3>
            <ul>
              <li>Browse and order already available cakes.</li>
              <li>Or design your own cake using the AI Cake Builder.</li>
              <li>Add your favorite creation to the cart.</li>
              <li>Proceed to checkout and place your order.</li>
              <li>Your cake would be delivered for your celebration 🎉</li>
            </ul>
          </div>

          {/* CREDITS SYSTEM */}
          <div className="about-card">
            <h3>🎁 Free Credits</h3>
            <p>
              Every user receives <strong>5 free credits</strong> upon signing
              up. These credits allow you to generate AI-based cake designs.
            </p>
            <p>
              Once credits are used, additional credits will be available
              through a Premium subscription model (currently under
              development).
            </p>
          </div>
          <div className="about-card">
            <h3>🌍 Community Creations</h3>

            <p>
              CakeCraft features a public Community Creations section where
              users can explore cakes designed by others.
            </p>

            <p>
              When a user generates a cake using the AI Cake Builder and
              successfully adds it to the cart, the creator’s name becomes
              associated with that cake design.
            </p>

            <p>
              Once added to the cart, the creation is eligible to appear in the
              community gallery with the designer’s name attached — giving
              recognition to their creativity.
            </p>

            <p>
              This ensures that only finalized and selected designs (not just
              random previews) are showcased in the community.
            </p>
          </div>

          {/* TECH STACK */}
          <div className="about-card">
            <h3>⚙️ Technology Behind CakeCraft</h3>
            <p>
              This platform is built using the MERN Stack: React.js, Node.js,
              Express.js, and MongoDB.
            </p>
            <p>
              It integrates AI-based image generation and Stripe payment gateway
              for order simulation.
            </p>
          </div>

          {/* IMPORTANT NOTE */}
          <div className="about-note">
            <h4>⚠️ Important Note</h4>
            <p>
              CakeCraft is a portfolio project created to demonstrate my
              full-stack MERN development skills.
            </p>
            <p>
              No real payments are processed and no physical cakes are delivered
              at this stage.
            </p>
            <p>
              The project is under continuous development and improvements are
              being actively made.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
