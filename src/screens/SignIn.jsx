import { useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signInUser } from '../actions/userActions';

const initialFormData = {
	email: '',
	password: '',
};

const SignIn = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState(initialFormData);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormData((currentFormData) => ({
			...currentFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (formData.password.trim().length < 6) {
			setErrorMessage('Password must be at least 6 characters.');
			return;
		}

		try {
			await dispatch(
				signInUser({
					email: formData.email,
					password: formData.password,
				})
			);

			setErrorMessage('');
			setIsSubmitted(true);
			navigate('/');
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	return (
		<main
			className="py-5"
			style={{
				backgroundImage:
					'linear-gradient(rgba(25, 135, 84, 0.18), rgba(25, 135, 84, 0.12)), url("https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1800&q=80")',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<Container>
				<Row className="justify-content-center">
					<Col lg={10} xl={9}>
						<Card className="border-0 shadow-sm rounded-4 overflow-hidden">
							<Row className="g-0">
								<Col
									md={5}
									className="text-white p-4 p-md-5 d-flex flex-column"
									style={{
										backgroundImage:
											'linear-gradient(rgba(20, 88, 58, 0.92), rgba(25, 135, 84, 0.84)), url("https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80")',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
									}}
								>
									<Badge bg="success" className="align-self-start text-uppercase px-3 py-2 mb-3">
										Login Page
									</Badge>
									<h1 className="fw-bold mb-3">PLUMBING AND DRAIN SERVICES</h1>
									<p className="text-white-50 mb-4">
										
									</p>

									<div className="mt-auto">
										<div className="small text-white-50 mb-2">Required fields</div>
										<ul className="ps-3 mb-4">
											<li>Email credential</li>
											<li>Password</li>
										</ul>
										<Button as={Link} to="/" variant="light">
											← Back to Services
										</Button>
									</div>
								</Col>

								<Col md={7}>
									<Card.Body className="p-4 p-md-5">
										<div className="mb-4">
											<h2 className="h3 fw-bold text-success mb-2">Sign In</h2>
											<p className="text-muted mb-0">
												Enter your email and password to access the Plumbing and Drain Services platform.
											</p>
										</div>

										{isSubmitted && (
											<Alert variant="success">
												Login details captured successfully for <strong>{formData.email}</strong>.
											</Alert>
										)}

										{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

										<Form onSubmit={handleSubmit}>
											<Row className="g-3">
												<Col xs={12}>
													<Form.Group controlId="email">
														<Form.Label className="fw-semibold">email</Form.Label>
														<Form.Control
															type="email"
															name="email"
															value={formData.email}
															onChange={handleChange}
															placeholder="name@example.com"
															required
														/>
														<Form.Text className="text-muted">
															Use email for authentication instead of username.
														</Form.Text>
													</Form.Group>
												</Col>

												<Col xs={12}>
													<Form.Group controlId="password">
														<Form.Label className="fw-semibold">password</Form.Label>
														<Form.Control
															type="password"
															name="password"
															value={formData.password}
															onChange={handleChange}
															placeholder="Enter password"
															required
														/>
													</Form.Group>
												</Col>
											</Row>

											<div className="d-flex flex-wrap gap-3 mt-4">
												<Button type="submit" variant="success">
													Sign In with Email
												</Button>
												<Button as={Link} to="/signup" variant="outline-primary">
													Create Account
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

export default SignIn;
