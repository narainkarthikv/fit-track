import React from 'react';
import graphImg from '../../assets/images/graph1.jpg';

const ProgressShowcase = () => {
  return (
    <section className="py-5 text-center progress-section">
      <div className="container">
        <h2 className="display-5 fw-bold text-white mb-3">See Your Progress</h2>
        <p className="lead text-light mb-5">
          From <span className="fw-semibold text-warning">streaks</span> to <span className="fw-semibold text-warning">monthly insights</span>, 
          visualize everything you need to stay motivated.
        </p>
        <img 
          src={graphImg} 
          alt="Progress graph" 
          className="progress-img img-fluid rounded shadow-lg"
        />
      </div>

      {/* Style inside the component */}
      <style>{`
        .progress-section {
          background: linear-gradient(135deg, #212529, #343a40);
          position: relative;
          overflow: hidden;
        }

        .progress-img {
          max-height: 420px;
          border: 2px solid rgba(255, 193, 7, 0.4);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .progress-img:hover {
          transform: scale(1.05);
          box-shadow: 0 0 40px rgba(255, 193, 7, 0.5);
        }

        .progress-section::before {
          content: '';
          position: absolute;
          top: -100px;
          left: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 193, 7, 0.2) 0%, transparent 70%);
          filter: blur(40px);
          z-index: 0;
        }

        .container {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .progress-img {
            max-height: 280px;
          }
        }
      `}</style>
    </section>
  );
};

export default ProgressShowcase;
