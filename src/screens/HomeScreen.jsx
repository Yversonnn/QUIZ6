import { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutUser } from '../actions/userActions';
import serviceData from '../data/serviceData';
import { buildApiUrl, buildMediaUrl } from '../utils/api';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userAuth.userInfo);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/v1/services/list/'));
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Unable to load services.');
        }

        if (Array.isArray(data) && data.length > 0) {
          setServices(
            data.map((service) => ({
              id: service.id,
              serviceName: service.service_name,
              description: service.description,
              price: `$${service.price}`,
              durationOfService: service.duration_of_service,
              sampleImage: buildMediaUrl(service.sample_image),
              nameOfTheExpert: service.seller,
              rating: 4.8,
            }))
          );
        } else {
          setServices(serviceData);
        }

      } catch (error) {
        setServices(serviceData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <main
      className="py-5"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.55)), url("https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1800&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Container>
        <section
          className="text-center mb-5 p-4 p-md-5 rounded-4 shadow-sm"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.82)' }}
        >
          <Badge bg="dark" className="text-uppercase px-3 py-2 mb-3" style={{ backgroundColor: '#000000' }}>
            Plumbing and Drain Services
          </Badge>
          <h1 className="fw-bold text-dark mb-3">Available Service List</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: '720px' }}>
            Browse our featured plumbing and drain solutions presented in a card
            layout with clear descriptions, service ratings, and sample images.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
            <Button as={Link} to="/signin" variant="dark" style={{ backgroundColor: '#000000', borderColor: '#000000' }}>
              Go to Login Page
            </Button>
            <Button as={Link} to="/signup" variant="outline-dark" style={{ color: '#000000', borderColor: '#000000' }}>
              Go to Register Page
            </Button>
            <Button as={Link} to="/apply-seller" variant="outline-dark" style={{ color: '#000000', borderColor: '#000000' }}>
              Apply as Seller
            </Button>
            <Button as={Link} to="/users" variant="outline-dark" style={{ color: '#000000', borderColor: '#000000' }}>
              Admin Users Page
            </Button>
            <Button as={Link} to="/seller-dashboard" variant="outline-dark" style={{ color: '#000000', borderColor: '#000000' }}>
              Seller Dashboard
            </Button>
            <Button as={Link} to="/user-profile" variant="outline-dark" style={{ color: '#000000', borderColor: '#000000' }}>
              User Profile
            </Button>
            <Button as={Link} to="/subscription" variant="outline-dark" style={{ color: '#000000', borderColor: '#000000' }}>
              Subscription
            </Button>
            <Button as={Link} to="/paypal" variant="outline-dark" style={{ color: '#000000', borderColor: '#000000' }}>
              PayPal Transactions
            </Button>
            <Button as={Link} to="/chatbot" variant="outline-dark" style={{ color: '#000000', borderColor: '#000000' }}>
              AI Chatbot
            </Button>
            <Button as={Link} to="/" variant="outline-dark" style={{ color: '#000000', borderColor: '#000000' }}>
              Browse Services
            </Button>
            <Button variant="danger" onClick={() => dispatch(signOutUser())}>
              Sign Out
            </Button>
          </div>
          <p className="text-muted small mt-3 mb-0">Signed in as: {userInfo?.email}</p>
        </section>

        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (

        <Row className="g-4">
          {services.map((service) => (
            <Col key={service.id} md={6} lg={4} xl={3}>
              <Card
                as={Link}
                to={`/services/${service.id}`}
                className="h-100 border-0 shadow-sm rounded-4 overflow-hidden text-decoration-none service-card"
              >
                <Card.Img
                  variant="top"
                  src={service.sampleImage}
                  alt={service.serviceName}
                  style={{ height: '220px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                    <Card.Title className="fw-bold fs-5 mb-0">
                      {service.serviceName}
                    </Card.Title>
                    <Badge bg="transparent" text="dark" pill className="border border-dark" style={{ color: '#000000', borderColor: '#000000' }}>
                      {service.rating} ★
                    </Badge>
                  </div>

                  <Card.Text className="text-muted mb-4 flex-grow-1">
                    {service.description}
                  </Card.Text>

                  <div className="small">
                    <div className="mb-2">
                      <span className="fw-semibold text-dark">service_name:</span>{' '}
                      <span>{service.serviceName}</span>
                    </div>
                    <div className="mb-2">
                      <span className="fw-semibold text-dark">description:</span>{' '}
                      <span>{service.description}</span>
                    </div>
                    <div className="mb-2">
                      <span className="fw-semibold text-dark">rating:</span>{' '}
                      <span>{service.rating}</span>
                    </div>
                    <div>
                      <span className="fw-semibold text-dark">sample_image:</span>{' '}
                      <span>Displayed above</span>
                    </div>
                  </div>

                  <div className="mt-4 fw-semibold" style={{ color: '#000000' }}>View service details →</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        )}
      </Container>
    </main>
  );
};

export default HomeScreen;