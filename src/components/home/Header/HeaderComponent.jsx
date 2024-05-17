import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import Typed from 'typed.js';
import HeaderService from './HeaderService';
import LoadingSpinner from '../../spinner/LoadingSpinner.jsx'

const HeaderComponent = () => {
  const [headerData, setHeaderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    HeaderService()
      .then(data => {
        setHeaderData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao obter dados:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (headerData) {
      const typed = new Typed('.typed', {
        strings: headerData.strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });

      return () => {
        typed.destroy();
      };
    }
  }, [headerData]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!headerData) {
    return null;
  }

  return (
    <section id="hero" className="hero d-flex flex-column justify-content-center">
      <div className="container" data-aos="zoom-in" data-aos-delay="100">
        <h1>{headerData.name}</h1>
        <p><span className="typed"></span></p>
        <div className="social-links">
          <a href={headerData.linkInstagram} className="instagram" target="_blank" rel="noopener noreferrer"><i className="bx bxl-instagram"></i></a>
          <a href={headerData.linkLinkedin} className="linkedin" target="_blank" rel="noopener noreferrer"><i className="bx bxl-linkedin"></i></a>
        </div>
      </div>
    </section>
  );
};

export default HeaderComponent;
