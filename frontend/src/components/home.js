import React from "react";

function Home() {
  return (
    <div className="bg-light vh-100 d-flex align-items-center justify-content-center">
      <div className="container text-center">
        <lottie-player
          src="https://assets2.lottiefiles.com/packages/lf20_qp1q7mct.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px", margin: "0 auto" }}
          loop
          autoplay
        ></lottie-player>

        <h1 className="display-5 fw-bold mt-4">Welcome to DroneConnect</h1>
        <p className="lead">
          Rent or operate drones with ease. Elevate your view, automate your skies.
        </p>
        <a href="/register" className="btn btn-primary btn-lg mt-3">
          Get Started
        </a>
      </div>
    </div>
  );
}

export default Home;
