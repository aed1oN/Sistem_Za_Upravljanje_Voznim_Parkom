import React from "react";

const iconPath = process.env.PUBLIC_URL + "/icons/";

const Home = () => {
  return (
    <div id="home-page">
      <div id="home-page-info">
        <h2>Dobrodošli na PONG aplikaciju za upravaljanje voznim parkom</h2>
        <h5>
          Ova aplikacija ubrazava proces izdavanja putnih naloga za vozila.
        </h5>
      </div>
      <div id="home-page-image">
        <img src={`${iconPath}background.svg`} alt="Background" />
      </div>
    </div>
  );
};

export default Home;
