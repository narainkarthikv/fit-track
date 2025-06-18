import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="mb-5 fw-bold">Success Stories</h2>

        {/* Carousel Container */}
        <div className="testimonial-carousel position-relative overflow-hidden">
          <div className="testimonial-track d-flex align-items-stretch">
            {/* Repeatable Cards */}
            {[...Array(6)].map((_, i) => (
              <div className="testimonial-card p-4 me-4 rounded shadow bg-white" key={i}>
                <FaUserCircle size={40} className="mb-3 text-warning" />
                <p className="fst-italic">
                  {
                    [
                      `"Fit-Track helped me stay on track and lose 8kg in 3 months!"`,
                      `"The app keeps me consistent. Love it!"`,
                      `"Best app for tracking gym routines!"`,
                      `"I've never been this consistent with my workouts before!"`,
                      `"Progress charts keep me motivated every day!"`,
                      `"Personalized profiles make it feel like my own space!"`,
                    ][i % 6]
                  }
                </p>
                <footer className="blockquote-footer mt-2 fw-semibold">
                  {
                    [
                      'Riya, CrossFit Enthusiast',
                      'Arjun, Runner',
                      'Neha, Yoga Trainer',
                      'Rahul, Gym Rat',
                      'Sanya, Fitness Coach',
                      'Aman, Beginner',
                    ][i % 6]
                  }
                </footer>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inline Style for Animation */}
      <style>{`
        .testimonial-carousel {
          overflow: hidden;
        }

        .testimonial-track {
          display: flex;
          gap: 1.5rem;
          animation: scroll-left 40s linear infinite;
          width: max-content;
        }

        .testimonial-card {
          min-width: 300px;
          max-width: 300px;
          flex-shrink: 0;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .testimonial-card {
            min-width: 250px;
            max-width: 250px;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
