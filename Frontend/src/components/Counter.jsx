import React, { useState, useEffect, useRef } from 'react';
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-default.css';
import counter_bg from './img/bg/counter_bg.jpg'

const Counter = () => {
  const [counts, setCounts] = useState({
    dogsBred: 0,
    mostDogsFirst: 0,
    dogBreeding: 0,
    yearsOfHistory: 0,
  });

  const [hasScrolledTo, setHasScrolledTo] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledTo(true);
          observer.disconnect(); // Stop observing after the counter is triggered
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the counter section is visible
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (hasScrolledTo) {
      setCounts({
        dogsBred: 73,
        mostDogsFirst: 259,
        dogBreeding: 89,
        yearsOfHistory: 45,
      });
    }
  }, [hasScrolledTo]);

  return (
    <>
      {/* counter-area */}
      <section
        className="counter-area counter-bg"
        style={{ backgroundImage: `url(${counter_bg})` }}
        ref={counterRef}
      >
        {/* <img src={counter_bg} alt="Counter Background" /> */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="counter-title text-center mb-65">
                <h6 className="sub-title">Why Choose Us?</h6>
                <h2 className="title">
                  Best Service to Breeds Your Loved Dog Explore
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="counter-item">
                <h2 className="count">
                  <Odometer value={counts.dogsBred} format="d" />%
                </h2>
                <p>dogs are first bred</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="counter-item">
                <h2 className="count">
                  <Odometer value={counts.mostDogsFirst} format="d" />+
                </h2>
                <p>Most dogs are first</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="counter-item">
                <h2 className="count">
                  <Odometer value={counts.dogBreeding} format="d" />K
                </h2>
                <p>Dog Breeding</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6">
              <div className="counter-item">
                <h2 className="count">
                  <Odometer value={counts.yearsOfHistory} format="d" />+
                </h2>
                <p>Years Of History</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* counter-area-end */}
    </>
  );
};

export default Counter;
