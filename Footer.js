import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css"; // Import the CSS file
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import twit from "../Images/twit.jpg";
import WHATTS from "../Images/WHATTS.jpg";
import IN from "../Images/IN.png";
import INS from "../Images/INS.jpg";
import FB3 from "../Images/FB3.jpg";
import temp1 from "../Images/temp1.gif";

function Footer() {
  const [location, setLocation] = useState("");

  const [temperature, setTemperature] = useState(null);

  const [loading, setLoading] = useState(true);

  const apiKey = "6035d9c82fcfab58ff9620f89744d7d3";

  useEffect(() => {
    const fetchWeatherByCoordinates = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        setLocation(data.name);

        setTemperature(data.main.temp);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }

      setLoading(false);
    };

    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            fetchWeatherByCoordinates(latitude, longitude);
          },

          (error) => {
            console.error("Error getting location:", error);

            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");

        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const [news, setNews] = useState([]);
  const [currentHeadline, setCurrentHeadline] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=1e28c3490fbc4c7ab4206df1bff87c5b"
      )
      .then((res) => setNews(res.data.articles))
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prevIndex) => (prevIndex + 1) % news.length);
    }, 5000); // Change the time (in milliseconds) to switch headlines
    return () => clearInterval(interval);
  }, [news.length]);

  return (
    <div className="footer-container" >
      <div
        className="news-ticker"
        style={{
          marginTop: "60px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        {news.length > 0 && (
          <div
            className="news-item"
            style={{ color: "white" }}
            title={news[currentHeadline].description}
          >
            {news[currentHeadline].title}
            <div className="popup">
              <div className="content-details">
                <h3>{news[currentHeadline].title}</h3>
                <p>{news[currentHeadline].description}</p>
                <div className="division">
                  <img
                    style={{ height: "200px", width: "400px" }}
                    className="boximage"
                    src={news[currentHeadline].urlToImage}
                    alt="Article Thumbnail"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>




             <img style={{width:"50px",borderRadius:"30px"}}  src={temp1}></img>


{loading ? (

  <p>Loading...</p>

) : temperature !== null ? (

  <p style={{color:"black"}}><span style={{color:"red"}}>The temperature in </span>{location} is {temperature}°C</p>

) : (

  <p>Unable to fetch weather data.</p>

)}


      {/* <div>
<h1 style={{fontFamily:"serif",color:"black",textAlign:"center"}}>CLIENT PULSE</h1>
<Row>
    <Col xs={12} md={6} xl={4}></Col>
    <Col xs={12} md={6} xl={4}>
        <div style={{textAlign:"center"}}>
    <h3 style={{color:"black",fontFamily:"serif",textAlign:"center",marginTop:"10px"}}>ContactInformation</h3>
    <p style={{color:"black",fontSize:"15px"}}>Mobile No:9025254281</p>
    <p style={{color:"black",fontSize:"15px"}}>Address:3/261B,R.S.Mathur,sendurai,Ariyalur</p>
    <p style={{color:"black",fontSize:"15px"}}>email:gobanbanu749@gmail.com</p>
    </div>
    </Col>
    <Col xs={12} md={6} xl={4}>
        <h3 style={{color:"black",fontFamily:"serif",textAlign:"center",marginTop:"10px"}}>Contact Us</h3>
<div style={{textAlign:"center"}}>
        <img style={{width:"50px",borderRadius:"60px"}} src={twit}></img>
        <img style={{width:"50px",borderRadius:"60px"}} src={WHATTS}></img>
        <img style={{width:"50px",borderRadius:"60px"}} src={IN}></img>
        <img style={{width:"50px",borderRadius:"60px"}} src={INS}></img>
        <img style={{width:"50px",borderRadius:"60px"}} src={FB3}></img>
        </div>

    </Col>
</Row>

</div> */}
    </div>
  );
}

export default Footer;
