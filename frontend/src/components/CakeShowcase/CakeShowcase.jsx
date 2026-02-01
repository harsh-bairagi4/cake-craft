import React from "react";
import "./CakeShowcase.css";

const cakes = [
  {
    id: 1,
    name: "Chocolate Bloom",
    creator: "Harsh",
    image: "/cake1.jpg",
    description: "Rich chocolate layers with floral frosting.",
  },
  {
    id: 2,
    name: "Vanilla Sky",
    creator: "Ananya",
    image: "/cake2.jpg",
    description: "Soft vanilla cake with pastel buttercream.",
  },
  {
    id: 3,
    name: "Berry Bliss",
    creator: "Rahul",
    image: "/cake3.jpg",
    description: "Fresh berries with whipped cream layers.",
  },
  {
    id: 4,
    name: "Golden Caramel",
    creator: "Sneha",
    image: "/cake4.jpg",
    description: "Caramel glaze with crunchy nut layers.",
  },
];

const CakeShowcase = () => {
  return (
    <section className="cake-showcase">
      <h2 className="section-title">
        Cakes Created by Our Community
      </h2>

      <div className="cake-swiper">
        <div className="cake-track">
          {[...cakes, ...cakes].map((cake, index) => (
            <div className="cake-card" key={index}>
              <img src={cake.image} alt={cake.name} />

              <div className="cake-info">
                <h3>{cake.name}</h3>
                <p className="cake-desc">{cake.description}</p>
                <span className="cake-creator">
                  Designed by {cake.creator}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CakeShowcase;
