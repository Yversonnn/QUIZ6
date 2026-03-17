import { useMemo, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { buildApiUrl, getAuthHeaders } from '../utils/api';

const initialFormData = {
	email: '',
	username: '',
	phoneNumber: '',
	firstName: '',
	lastName: '',
	location: '',
	gender: '',
	password: '',
	confirmPassword: '',
};

const SignUp = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState(initialFormData);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const passwordsMatch = useMemo(() => {
		if (!formData.password || !formData.confirmPassword) {
			return true;
		}

		return formData.password === formData.confirmPassword;
	}, [formData.confirmPassword, formData.password]);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((currentFormData) => ({
			...currentFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!passwordsMatch) {
			setErrorMessage('Password and confirm password must match.');
			return;
		}

		try {
			const response = await fetch(buildApiUrl('/api/v1/users/register/'), {
				method: 'POST',
				headers: getAuthHeaders(),
				body: JSON.stringify({
					email: formData.email,
					username: formData.username,
					phone_number: formData.phoneNumber,
					first_name: formData.firstName,
					last_name: formData.lastName,
					location: formData.location,
					gender: formData.gender,
					password: formData.password,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.detail || Object.values(data).flat().join(' ') || 'Unable to register.');
			}

			setErrorMessage('');
			setIsSubmitted(true);
			setTimeout(() => navigate('/signin'), 1200);
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	return (
		<main className="py-5">
			<Container>
				<Row className="justify-content-center">
					<Col lg={10} xl={9}>
						<Card className="border-0 shadow-sm rounded-4 overflow-hidden">
							<Row className="g-0">
								<Col md={5} className="bg-info-subtle p-4 p-md-5 d-flex flex-column">
									<Badge bg="primary" className="align-self-start text-uppercase px-3 py-2 mb-3">
										Register Page
									</Badge>
									<h1 className="fw-bold text-primary mb-3">Create your service account</h1>
									<p className="text-muted mb-4">
										Register a customer account for plumbing and drain services using email as the main contact credential.
									</p>
									<p className="small text-muted mb-4">
										Newly registered accounts are created with <strong>User</strong> level by default.
									</p>

									<div className="mt-auto">
										<div className="small text-muted mb-2">Information collected</div>
										<ul className="ps-3 mb-4 text-dark">
											<li>Email and username</li>
											<li>Contact and location details</li>
											<li>Personal profile information</li>
											<li>Password confirmation</li>
										</ul>
										<div className="d-flex flex-wrap gap-2">
											<Button as={Link} to="/signin" variant="primary">
												Go to Login
											</Button>
											<Button as={Link} to="/" variant="outline-primary">
												Back to Services
											</Button>
										</div>
									</div>
								</Col>

								<Col md={7}>
									<Card.Body className="p-4 p-md-5">
										<div className="mb-4">
											<h2 className="h3 fw-bold text-primary mb-2">Register</h2>
											<p className="text-muted mb-0">
												Fill in all required fields below to create your account.
											</p>
										</div>

										{isSubmitted && (
											<Alert variant="success">
												Registration details captured successfully for <strong>{formData.email}</strong>. Your account level is
												 <strong>User</strong>. You can submit a seller application for Admin approval.
											</Alert>
										)}

										{!passwordsMatch && (
											<Alert variant="danger">Password and confirm password must match.</Alert>
										)}

										{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

										<Form onSubmit={handleSubmit}>
											<Row className="g-3">
												<Col xs={12}>
													<Form.Group controlId="registerEmail">
														<Form.Label className="fw-semibold">email</Form.Label>
														<Form.Control
															type="email"
															name="email"
															value={formData.email}
															onChange={handleChange}
															placeholder="customer@example.com"
															required
														/>
													</Form.Group>
												</Col>

												<Col md={6}>
													<Form.Group controlId="registerUsername">
														<Form.Label className="fw-semibold">username</Form.Label>
														<Form.Control
															type="text"
															name="username"
															value={formData.username}
															onChange={handleChange}
															placeholder="plumbing.customer"
															required
														/>
													</Form.Group>
												</Col>

												<Col md={6}>
													<Form.Group controlId="registerPhoneNumber">
														<Form.Label className="fw-semibold">phone_number</Form.Label>
														<Form.Control
															type="tel"
															name="phoneNumber"
															value={formData.phoneNumber}
															onChange={handleChange}
															placeholder="0917 555 1024"
															required
														/>
													</Form.Group>
												</Col>

												<Col md={6}>
													<Form.Group controlId="registerFirstName">
														<Form.Label className="fw-semibold">first_name</Form.Label>
														<Form.Control
															type="text"
															name="firstName"
															value={formData.firstName}
															onChange={handleChange}
															placeholder="Andrea"
															required
														/>
													</Form.Group>
												</Col>

												<Col md={6}>
													<Form.Group controlId="registerLastName">
														<Form.Label className="fw-semibold">last_name</Form.Label>
														<Form.Control
															type="text"
															name="lastName"
															value={formData.lastName}
															onChange={handleChange}
															placeholder="Domingo"
															required
														/>
													</Form.Group>
												</Col>

												<Col md={6}>
													<Form.Group controlId="registerLocation">
														<Form.Label className="fw-semibold">location</Form.Label>
														<Form.Control
															type="text"
															name="location"
															value={formData.location}
															onChange={handleChange}
															placeholder="Makati City"
															required
														/>
													</Form.Group>
												</Col>

												<Col md={6}>
													<Form.Group controlId="registerGender">
														<Form.Label className="fw-semibold">gender</Form.Label>
														<Form.Select
															name="gender"
															value={formData.gender}
															onChange={handleChange}
															required
														>
															<option value="">Select gender</option>
															<option value="Male">Male</option>
															<option value="Female">Female</option>
															<option value="Non-binary">Non-binary</option>
															<option value="Prefer not to say">Prefer not to say</option>
														</Form.Select>
													</Form.Group>
												</Col>

												<Col md={6}>
													<Form.Group controlId="registerPassword">
														<Form.Label className="fw-semibold">password</Form.Label>
														<Form.Control
															type="password"
															name="password"
															value={formData.password}
															onChange={handleChange}
															placeholder="Create password"
															required
														/>
													</Form.Group>
												</Col>

												<Col md={6}>
													<Form.Group controlId="registerConfirmPassword">
														<Form.Label className="fw-semibold">confirm_password</Form.Label>
														<Form.Control
															type="password"
															name="confirmPassword"
															value={formData.confirmPassword}
															onChange={handleChange}
															placeholder="Confirm password"
															isInvalid={!passwordsMatch}
															required
														/>
														<Form.Control.Feedback type="invalid">
															Password and confirm password must match.
														</Form.Control.Feedback>
													</Form.Group>
												</Col>
											</Row>

											<div className="d-flex flex-wrap gap-3 mt-4">
												<Button type="submit" variant="primary">
													Register Account
												</Button>
												<Button as={Link} to="/signin" variant="outline-primary">
													Already have an account?
												</Button>
												<Button as={Link} to="/apply-seller" variant="outline-primary">
													Apply as Seller
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

export default SignUp;
