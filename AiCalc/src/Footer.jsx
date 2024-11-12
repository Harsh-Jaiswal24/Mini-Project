import React from 'react';
import axios from 'axios';
import { useState} from 'react';

 
const Footer = () => {
  const [feedback, setFeedback] = useState("");

  // Handle feedback input change
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  // Send feedback to the backend
  const sendFeedback = async (event) => {
    event.preventDefault();

    // Ensure feedback is not empty
    if (!feedback.trim()) {
      alert("Please provide some feedback.");
      return;
    }

    try {
      // Send the feedback to the backend
      const response = await axios.post("https://notesolver-backend.onrender.com/feedback", {
        feedbackMessage: feedback,  // Send feedback message
      });

      // Handle the response from the backend
      console.log("Feedback response:", response.data);
      alert("Feedback submitted successfully!");

      // Clear the feedback input after submission
      setFeedback("");

    } catch (err) {
      console.error("Error sending feedback:", err);
      alert("Something went wrong. Please try again.");
    }
  };



  return (
    <footer className="bg-dark text-center text-white mt-5">
      {/* Grid container */}
      <div className="container p-4">
        {/* Section: Social media */}
        <section className="mb-4">
      
        {/* LinkedIn */}
        <a className="btn btn-outline-light btn-floating m-1" href="www.linkedin.com/in/
harsh-jaiswal-93755a2a7" role="button" target='blank'>
            <i className="fab fa-linkedin-in"></i>
          </a>

        {/* GitHub */}
        <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/Harsh-Jaiswal24" role="button" target='blank'>
                   <i className="fab fa-github"></i>
                 </a>
         
        {/* Google */}
        <a className="btn btn-outline-light btn-floating m-1"  href="mailto:harsh4jaiswal@gmail.com?subject=Inquiry%20from%20NoteSolver%20Visitor" role="button" target='blank'>
            <i className="fab fa-google"></i>
          </a>

        {/* Instagram */}
        <a className="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/harsh_jais2005/" role="button" target='blank'>
            <i className="fab fa-instagram"></i>
          </a>

         {/* Twitter */}
          <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
          <i class="fa-brands fa-x-twitter"></i>
          </a>

        </section>

        {/* Section: Form */}
        <section>
  <form onSubmit={sendFeedback}>
    <div className="row d-flex justify-content-center">
      <div className="col-auto">
        <p className="pt-2">
          <strong className="form-label" htmlFor="feedbackInput">Report an Issue / Suggest a Feature</strong>
        </p>
      </div>
      <div className="col-md-5 col-12">
        <div className="form-outline form-white mb-4">
          <input value={feedback} onChange={handleFeedbackChange} type="text" id="feedbackInput" className="form-control" placeholder="Describe your feedback here" />
        </div>
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-outline-light mb-4" onClick={sendFeedback}>Submit</button>
      </div>
    </div>
  </form>
</section>

        {/* Section: Links (centered) */}
        <section>
          <div className="d-flex justify-content-center">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Featured Projects</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="https://harsh-jaiswal24.github.io/Crypto-and-Currency-Converter/" className="text-white" target="_blank">Crypto & Currency-Converter</a>
                </li>
                <li>
                  <a href="https://harsh-jaiswal24.github.io/Weather-Forecasts-Website/" className="text-white" target="_blank">Advanced Weather Forecasting</a>
                </li>
                <li>
                  <a href="https://harsh-jaiswal24.github.io/CalmConnect/" className="text-white" target="_blank">Calm-Connect</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>


        {/* Section: Text */}
        <section className="mb-4">
          <p>
          Designed & Developed by Harsh Jaiswal
          </p>
        </section>

      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Copyright: NoteSolver
      </div>
    </footer>
  );
};

export default Footer;

