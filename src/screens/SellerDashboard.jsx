import { useMemo, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import serviceData from '../data/serviceData';

const currentSellerSession = {
	email: 'bianca.flores@example.com',
	userType: 'Seller',
	sellerApplicationStatus: 'Approved',
	merchantId: 'SELLER-MERCHANT-2026-4412',
};

const initialServiceFormData = {
	serviceName: '',
	description: '',
	price: '',
	durationOfService: '',
	sampleImage: '',
};

const SellerDashboard = () => {
	const [services, setServices] = useState(serviceData);
	const [serviceFormData, setServiceFormData] = useState(initialServiceFormData);
	const [editServiceId, setEditServiceId] = useState(null);
  const userInfo = useSelector((state) => state.userAuth.userInfo);

	const canAccessDashboard = useMemo(
		() => (userInfo?.userType || currentSellerSession.userType) === 'Seller',
		[userInfo?.userType]
	);

	const handleFormChange = (event) => {
		const { name, value } = event.target;
		setServiceFormData((currentFormData) => ({
			...currentFormData,
			[name]: value,
		}));
	};

	const resetForm = () => {
		setServiceFormData(initialServiceFormData);
		setEditServiceId(null);
	};

	const handleSubmitService = (event) => {
		event.preventDefault();

		if (editServiceId) {
			setServices((currentServices) =>
				currentServices.map((service) => {
					if (service.id !== editServiceId) {
						return service;
					}

					return {
						...service,
						serviceName: serviceFormData.serviceName,
						description: serviceFormData.description,
						price: serviceFormData.price,
						durationOfService: serviceFormData.durationOfService,
						sampleImage: serviceFormData.sampleImage,
					};
				})
			);

			resetForm();
			return;
		}

		const newService = {
			id: Date.now(),
			serviceName: serviceFormData.serviceName,
			description: serviceFormData.description,
			rating: 4.8,
			price: serviceFormData.price,
			durationOfService: serviceFormData.durationOfService,
			nameOfTheExpert: 'Bianca Flores',
			sampleImage:
				serviceFormData.sampleImage || 'https://via.placeholder.com/600x400?text=Plumbing+Service',
		};

		setServices((currentServices) => [newService, ...currentServices]);
		resetForm();
	};

	const handleEditService = (service) => {
		setEditServiceId(service.id);
		setServiceFormData({
			serviceName: service.serviceName,
			description: service.description,
			price: service.price,
			durationOfService: service.durationOfService,
			sampleImage: service.sampleImage,
		});
	};

	const handleDeleteService = (serviceId) => {
		setServices((currentServices) => currentServices.filter((service) => service.id !== serviceId));

		if (editServiceId === serviceId) {
			resetForm();
		}
	};

	if (!canAccessDashboard) {
		return (
			<main className="py-5">
				<Container>
					<Card className="border-0 shadow-sm rounded-4 p-4 text-center">
						<h1 className="h3 text-primary mb-3">Seller Dashboard Access Denied</h1>
						<p className="text-muted mb-4">
							Only approved sellers can access this dashboard.
						</p>
						<div className="d-flex justify-content-center gap-2">
							<Button as={Link} to="/apply-seller" variant="primary">
								Apply as Seller
							</Button>
							<Button as={Link} to="/" variant="outline-primary">
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
				<Card className="border-0 shadow-sm rounded-4 mb-4">
					<Card.Body className="p-4 p-md-5">
						<div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
							<div>
								<Badge bg="success" className="text-uppercase px-3 py-2 mb-2">
									Approved Seller
								</Badge>
								<h1 className="h2 fw-bold text-primary mb-2">Seller Dashboard</h1>
								<p className="text-muted mb-0">
									Add new services and manage your existing service listings.
								</p>
							</div>
							<Button as={Link} to="/" variant="outline-primary">
								Back to Home
							</Button>
						</div>

						<Alert variant="info" className="mb-0">
							Merchant ID: <strong>{currentSellerSession.merchantId}</strong> | Seller: <strong>{userInfo?.email}</strong>
						</Alert>
					</Card.Body>
				</Card>

				<Row className="g-4">
					<Col lg={4}>
						<Card className="border-0 shadow-sm rounded-4 h-100">
							<Card.Body className="p-4">
								<h2 className="h4 fw-bold text-primary mb-3">
									{editServiceId ? 'Edit Service' : 'Add New Service'}
								</h2>

								<Form onSubmit={handleSubmitService}>
									<Form.Group className="mb-3" controlId="sellerServiceName">
										<Form.Label className="fw-semibold">name</Form.Label>
										<Form.Control
											name="serviceName"
											value={serviceFormData.serviceName}
											onChange={handleFormChange}
											placeholder="Hydro Jet Drain Cleaning"
											required
										/>
									</Form.Group>

									<Form.Group className="mb-3" controlId="sellerServiceDescription">
										<Form.Label className="fw-semibold">description</Form.Label>
										<Form.Control
											as="textarea"
											rows={3}
											name="description"
											value={serviceFormData.description}
											onChange={handleFormChange}
											placeholder="High-pressure cleaning for stubborn drain blockages."
											required
										/>
									</Form.Group>

									<Form.Group className="mb-3" controlId="sellerServicePrice">
										<Form.Label className="fw-semibold">price</Form.Label>
										<Form.Control
											name="price"
											value={serviceFormData.price}
											onChange={handleFormChange}
											placeholder="$150"
											required
										/>
									</Form.Group>

									<Form.Group className="mb-3" controlId="sellerServiceDuration">
										<Form.Label className="fw-semibold">duration</Form.Label>
										<Form.Control
											name="durationOfService"
											value={serviceFormData.durationOfService}
											onChange={handleFormChange}
											placeholder="1 to 2 hours"
											required
										/>
									</Form.Group>

									<Form.Group className="mb-4" controlId="sellerServiceImage">
										<Form.Label className="fw-semibold">image</Form.Label>
										<Form.Control
											name="sampleImage"
											value={serviceFormData.sampleImage}
											onChange={handleFormChange}
											placeholder="https://images.example.com/service-image.jpg"
										/>
									</Form.Group>

									<div className="d-flex flex-wrap gap-2">
										<Button type="submit" variant="primary">
											{editServiceId ? 'Save Service' : 'Add Service'}
										</Button>
										{editServiceId && (
											<Button type="button" variant="outline-secondary" onClick={resetForm}>
												Cancel Edit
											</Button>
										)}
									</div>
								</Form>
							</Card.Body>
						</Card>
					</Col>

					<Col lg={8}>
						<Card className="border-0 shadow-sm rounded-4 h-100">
							<Card.Body className="p-4">
								<h2 className="h4 fw-bold text-primary mb-3">Manage Existing Services</h2>

								<Table responsive hover className="align-middle mb-0">
									<thead>
										<tr>
											<th>name</th>
											<th>price</th>
											<th>duration</th>
											<th className="text-end">actions</th>
										</tr>
									</thead>
									<tbody>
										{services.map((service) => (
											<tr key={service.id}>
												<td>
													<div className="fw-semibold text-dark">{service.serviceName}</div>
													<div className="small text-muted">{service.description}</div>
												</td>
												<td>{service.price}</td>
												<td>{service.durationOfService}</td>
												<td className="text-end">
													<div className="d-inline-flex gap-2">
														<Button size="sm" variant="warning" onClick={() => handleEditService(service)}>
															Edit
														</Button>
														<Button size="sm" variant="danger" onClick={() => handleDeleteService(service.id)}>
															Delete
														</Button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</main>
	);
};

export default SellerDashboard;
