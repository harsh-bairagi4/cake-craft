
import React, { useState } from "react";
import "./Faq.css";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How is my cake created using AI?",
    answer:
      "You select preferences like flavor, layers, and style. Our AI uses these inputs to generate a unique cake design specially for you.",
  },
  {
    question: "Will my cake design be unique?",
    answer:
      "Yes. Every cake starts as a fresh design based on your choices. Once ordered, it becomes part of our collection with your name as the creator.",
  },
  {
    question: "Can someone else order the same cake?",
    answer:
      "Yes, others can reorder your cake from the collection, but your name will always be shown as the original creator.",
  },
  {
    question: "Can I reorder my cake later?",
    answer:
      "Absolutely. Your created cakes are saved, so you or your family can reorder them anytime in the future.",
  },
  {
    question: "Is the cake exactly the same as the AI image?",
    answer:
      "The AI image represents the design and style. Our bakers recreate it as closely as possible using real ingredients and craftsmanship.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="faq"
     >
      <h2 className="faq-title">Frequently Asked Questions</h2>

      <motion.div className="faq-list"  initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFaq(index)}
          >
            <div className="faq-question">
              <h4>{faq.question}</h4>
              <span>{activeIndex === index ? "−" : "+"}</span>
            </div>

            {activeIndex === index && (
              <p className="faq-answer">{faq.answer}</p>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Faq;
