import { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import serviceData from '../data/serviceData';
import { buildApiUrl, buildMediaUrl } from '../utils/api';

const DetailScreen = () => {
	const { serviceId } = useParams();
	const [service, setService] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchService = async () => {
			try {
				const response = await fetch(buildApiUrl(`/api/v1/services/${serviceId}/`));
				const data = await response.json();

				if (!response.ok) {
					throw new Error('Unable to load service detail.');
				}

				setService({
					id: data.id,
					serviceName: data.service_name,
					description: data.description,
					price: `$${data.price}`,
					durationOfService: data.duration_of_service,
					sampleImage: buildMediaUrl(data.sample_image),
					nameOfTheExpert: data.seller,
					rating: 4.8,
				});
			} catch (error) {
				setService(serviceData.find((serviceItem) => serviceItem.id === Number(serviceId)) || null);
			} finally {
				setIsLoading(false);
			}
		};

		fetchService();
	}, [serviceId]);

	if (isLoading) {
		return (
			<main className="py-5">
				<Container className="text-center py-5">
					<Spinner animation="border" variant="primary" />
				</Container>
			</main>
		);
	}

	if (!service) {
		return (
			<main className="py-5">
				<Container>
					<Card className="border-0 shadow-sm rounded-4 p-4 text-center">
						<h1 className="h3 text-primary mb-3">Service not found</h1>
						<p className="text-muted mb-4">
							The selected plumbing service could not be located.
						</p>
						<div>
							<Button as={Link} to="/" variant="primary">
								Back to Home
							</Button>
						</div>
					</Card>
				</Container>
			</main>
		);
	}

	return (
		<main className="py-5">
			<Container>

				<div className="mb-4">
					<Button as={Link} to="/" variant="outline-primary">
						← Back to Services
					</Button>
				</div>

				<Card className="border-0 shadow-sm rounded-4 overflow-hidden">
					<Row className="g-0">
						<Col lg={6}>
							<img
								src={service.sampleImage}
								alt={service.serviceName}
								className="w-100 h-100"
								style={{ objectFit: 'cover', minHeight: '100%' }}
							/>
						</Col>
						<Col lg={6}>
							<Card.Body className="p-4 p-md-5 h-100 d-flex flex-column">
								<div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
									<Badge bg="info" className="px-3 py-2 text-uppercase">
										Service Details
									</Badge>
									<Badge bg="warning" text="dark" pill>
										{service.rating} ★
									</Badge>
								</div>

								<h1 className="display-6 fw-bold text-primary mb-3">{service.serviceName}</h1>
								<p className="text-muted fs-5 mb-4">{service.description}</p>

								<Row className="g-3 mt-1">
									<Col sm={6}>
										<Card className="h-100 bg-light border-0 rounded-4">
											<Card.Body>
												<div className="text-uppercase small text-muted mb-2">service_name</div>
												<div className="fw-semibold text-dark">{service.serviceName}</div>
											</Card.Body>
										</Card>
									</Col>
									<Col sm={6}>
										<Card className="h-100 bg-light border-0 rounded-4">
											<Card.Body>
												<div className="text-uppercase small text-muted mb-2">rating</div>
												<div className="fw-semibold text-dark">{service.rating}</div>
											</Card.Body>
										</Card>
									</Col>
									<Col sm={6}>
										<Card className="h-100 bg-light border-0 rounded-4">
											<Card.Body>
												<div className="text-uppercase small text-muted mb-2">price</div>
												<div className="fw-semibold text-dark">{service.price}</div>
											</Card.Body>
										</Card>
									</Col>
									<Col sm={6}>
										<Card className="h-100 bg-light border-0 rounded-4">
											<Card.Body>
												<div className="text-uppercase small text-muted mb-2">duration_of_service</div>
												<div className="fw-semibold text-dark">{service.durationOfService}</div>
											</Card.Body>
										</Card>
									</Col>
									<Col sm={6}>
										<Card className="h-100 bg-light border-0 rounded-4">
											<Card.Body>
												<div className="text-uppercase small text-muted mb-2">name_of_the_expert</div>
												<div className="fw-semibold text-dark">{service.nameOfTheExpert}</div>
											</Card.Body>
										</Card>
									</Col>
									<Col sm={6}>
										<Card className="h-100 bg-light border-0 rounded-4">
											<Card.Body>
												<div className="text-uppercase small text-muted mb-2">sample_image</div>
												<div className="fw-semibold text-dark">Displayed on the left panel</div>
											</Card.Body>
										</Card>
									</Col>
									<Col xs={12}>
										<Card className="bg-light border-0 rounded-4">
											<Card.Body>
												<div className="text-uppercase small text-muted mb-2">description</div>
												<div className="fw-semibold text-dark">{service.description}</div>
											</Card.Body>
										</Card>
									</Col>
								</Row>
							</Card.Body>
						</Col>
					</Row>
				</Card>
			</Container>
		</main>
	);
};

export default DetailScreen;
