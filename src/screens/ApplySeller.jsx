import { useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const initialApplicationData = {
	email: '',
	username: '',
	phoneNumber: '',
	serviceSpecialty: '',
	yearsOfExperience: '',
	serviceLocation: '',
	applicationMessage: '',
};

const ApplySeller = () => {
	const [applicationData, setApplicationData] = useState(initialApplicationData);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setApplicationData((currentApplicationData) => ({
			...currentApplicationData,
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsSubmitted(true);
	};

	return (
		<main className="py-5">
			<Container>
				<Row className="justify-content-center">
					<Col lg={10} xl={9}>
						<Card className="border-0 shadow-sm rounded-4 overflow-hidden">
							<Row className="g-0">
								<Col md={5} className="bg-primary text-white p-4 p-md-5 d-flex flex-column">
									<Badge bg="info" className="align-self-start text-uppercase px-3 py-2 mb-3">
										Seller Application
									</Badge>
									<h1 className="fw-bold mb-3">Apply to become a seller</h1>
									<p className="text-white-50 mb-3">
										Any registered account can apply for seller access. Every application is reviewed by the Admin.
									</p>
									<p className="small text-white-50 mb-4">
										Current registration level remains <strong>User</strong> until approval is granted.
									</p>

									<div className="mt-auto d-flex flex-wrap gap-2">
										<Button as={Link} to="/signup" variant="light">
											Register First
										</Button>
										<Button as={Link} to="/" variant="outline-light">
											Back to Home
										</Button>
									</div>
								</Col>

								<Col md={7}>
									<Card.Body className="p-4 p-md-5">
										<div className="mb-4">
											<h2 className="h3 fw-bold text-primary mb-2">Application Form</h2>
											<p className="text-muted mb-0">
												Submit your details and wait for Admin approval.
											</p>
										</div>

										{isSubmitted && (
											<Alert variant="success">
												Application submitted for <strong>{applicationData.email}</strong>. Status: <strong>Pending Admin Approval</strong>.
											</Alert>
										)}

										<Form onSubmit={handleSubmit}>
											<Row className="g-3">
												<Col xs={12}>
													<Form.Group controlId="applySellerEmail">
														<Form.Label className="fw-semibold">email</Form.Label>
														<Form.Control
															type="email"
															name="email"
															value={applicationData.email}
															onChange={handleChange}
															placeholder="seller@example.com"
															required
														/>
													</Form.Group>
												</Col>

												<Col md={6}>
													<Form.Group controlId="applySellerUsername">
														<Form.Label className="fw-semibold">username</Form.Label>
														<Form.Control
															type="text"
															name="username"
															value={applicationData.username}
															onChange={handleChange}
															placeholder="trusted.plumber"
															required
														/>
													</Form.Group>
												</Col>

												<Col md={6}>
													<Form.Group controlId="applySellerPhoneNumber">
														<Form.Label className="fw-semibold">phone_number</Form.Label>
														<Form.Control
															type="tel"
															name="phoneNumber"
															value={applicationData.phoneNumber}
															onChange={handleChange}
															placeholder="0917 000 1111"
															required
														/>
													</Form.Group>
												</Col>

												<Col md={6}>
													<Form.Group controlId="applySellerServiceSpecialty">
														<Form.Label className="fw-semibold">service_specialty</Form.Label>
														<Form.Control
															type="text"
															name="serviceSpecialty"
															value={applicationData.serviceSpecialty}
															onChange={handleChange}
															placeholder="Drain cleaning and repair"
															required
														/>
													</Form.Group>
												</Col>

												<Col md={6}>
													<Form.Group controlId="applySellerYearsOfExperience">
														<Form.Label className="fw-semibold">years_of_experience</Form.Label>
														<Form.Control
															type="number"
															name="yearsOfExperience"
															value={applicationData.yearsOfExperience}
															onChange={handleChange}
															min="0"
															placeholder="3"
															required
														/>
													</Form.Group>
												</Col>

												<Col xs={12}>
													<Form.Group controlId="applySellerServiceLocation">
														<Form.Label className="fw-semibold">service_location</Form.Label>
														<Form.Control
															type="text"
															name="serviceLocation"
															value={applicationData.serviceLocation}
															onChange={handleChange}
															placeholder="Manila and nearby cities"
															required
														/>
													</Form.Group>
												</Col>

												<Col xs={12}>
													<Form.Group controlId="applySellerApplicationMessage">
														<Form.Label className="fw-semibold">application_message</Form.Label>
														<Form.Control
															as="textarea"
															rows={4}
															name="applicationMessage"
															value={applicationData.applicationMessage}
															onChange={handleChange}
															placeholder="Explain why you should be approved as a seller."
															required
														/>
													</Form.Group>
												</Col>
											</Row>

											<div className="d-flex flex-wrap gap-3 mt-4">
												<Button type="submit" variant="primary">
													Submit Seller Application
												</Button>
												<Button as={Link} to="/signin" variant="outline-primary">
													Login Page
												</Button>
												<Button as={Link} to="/" variant="outline-secondary">
													Cancel
												</Button>
											</div>
										</Form>
									</Card.Body>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</Container>
		</main>
	);
};

export default ApplySeller;
