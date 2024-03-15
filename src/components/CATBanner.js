import React from 'react';
import { Link } from "react-router-dom";
import { Links } from '../App';

function Bannner({ title, text, img, isReverse }) {

  const containerClassName = isReverse ? "banner-container-reverse" : "banner-container";

  return (
    <section className="banner">
      <div className="container">
        <div className={containerClassName}>
          <div className="text-side">
            <div className="text">
              <h3>{title}</h3>
              <p>{text}</p>
              <Link className="btn btn-primary" onClick={() => window.scrollTo(0, 0)} to={Links.products}>
                Get Started
              </Link>
            </div>
          </div>
          <div className="img-side">
            <img src={img} alt="banner" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Bannner