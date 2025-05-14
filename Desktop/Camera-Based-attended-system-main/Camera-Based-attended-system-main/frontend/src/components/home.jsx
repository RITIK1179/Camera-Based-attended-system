// import React from 'react';
// import Header from './header'; // Import the Header component
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import image from '../images/OIP.jpeg';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpeg';
import './home.css'; // Custom styling

const Home = () => {
  return (
    <>
      {/* <Header /> Use the Header component */}
      <Container fluid className="main-container">
        <Row>
          <Col>
            <h1 className="text-center mb-4">Welcome to the FaceTrack</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={image}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={image1}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={image2}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={6}>
            <h2>Modern Attendance Tracking</h2>
            <p>Our camera-based attendance system leverages cutting-edge technology to provide accurate and efficient attendance tracking.</p>
          </Col>
          <Col md={6}>
            <h2>Easy to Use</h2>
            <p>Our system is designed with user-friendliness in mind, making it simple for administrators and users to manage attendance.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;