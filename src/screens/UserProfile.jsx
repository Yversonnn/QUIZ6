import { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import orderData from '../data/orderData';
import { buildApiUrl, getAuthHeaders } from '../utils/api';

const currentUserProfile = {
	firstName: 'Liam',
	lastName: 'Navarro',
	email: 'liam.navarro@example.com',
	username: 'liam.navarro',
	phoneNumber: '0917 234 5678',
	location: 'Quezon City',
	gender: 'Male',
	userType: 'User',
};

const UserProfile = () => {
	const { userInfo, accessToken } = useSelector((state) => state.userAuth);
	const [orders, setOrders] = useState(orderData);
	const [isLoadingOrders, setIsLoadingOrders] = useState(true);


	const profileData = {
		...currentUserProfile,
		firstName: userInfo?.firstName || currentUserProfile.firstName,
		lastName: userInfo?.lastName || currentUserProfile.lastName,
		email: userInfo?.email || currentUserProfile.email,
		username: userInfo?.username || currentUserProfile.username,
		phoneNumber: userInfo?.phoneNumber || currentUserProfile.phoneNumber,
		location: userInfo?.location || currentUserProfile.location,
		gender: userInfo?.gender || currentUserProfile.gender,
		userType: userInfo?.userType || currentUserProfile.userType,
	};

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await fetch(buildApiUrl('/api/v1/orders/history/'), {
					headers: getAuthHeaders(accessToken),
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.detail || 'Unable to load orders.');
				}

				setOrders(
					data.map((order) => ({
						id: order.id,
						serviceName: order.service_name,
						price: `$${order.price_paid}`,
						orderStatus: 'Purchased',
						paymentMethod: 'PayPal',
						orderDate: order.date_purchased,
					}))
				);
			} catch (error) {
				// silently fall back to empty orders
			} finally {
				setIsLoadingOrders(false);
			}
		};

		fetchOrders();
	}, [accessToken]);

	return (
		<main className="py-5">
			<Container>
				<Card className="border-0 shadow-sm rounded-4 mb-4">
					<Card.Body className="p-4 p-md-5">
						<div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
							<div>
								<Badge bg="primary" className="text-uppercase px-3 py-2 mb-2">
									User Profile
								</Badge>
								<h1 className="h2 fw-bold text-primary mb-2">Account Information</h1>
								<p className="text-muted mb-0">View your profile details and order history.</p>
							</div>
							<Button as={Link} to="/" variant="outline-primary">
								Back to Home
							</Button>
						</div>

						<Row className="g-3">
							<Col md={6} lg={4}>
								<div className="small text-muted text-uppercase">first_name</div>
								<div className="fw-semibold text-dark">{profileData.firstName}</div>
							</Col>
							<Col md={6} lg={4}>
								<div className="small text-muted text-uppercase">last_name</div>
								<div className="fw-semibold text-dark">{profileData.lastName}</div>
							</Col>
							<Col md={6} lg={4}>
								<div className="small text-muted text-uppercase">email</div>
								<div className="fw-semibold text-dark">{profileData.email}</div>
							</Col>
							<Col md={6} lg={4}>
								<div className="small text-muted text-uppercase">username</div>
								<div className="fw-semibold text-dark">{profileData.username}</div>
							</Col>
							<Col md={6} lg={4}>
								<div className="small text-muted text-uppercase">phone_number</div>
								<div className="fw-semibold text-dark">{profileData.phoneNumber}</div>
							</Col>
							<Col md={6} lg={4}>
								<div className="small text-muted text-uppercase">location</div>
								<div className="fw-semibold text-dark">{profileData.location}</div>
							</Col>
							<Col md={6} lg={4}>
								<div className="small text-muted text-uppercase">gender</div>
								<div className="fw-semibold text-dark">{profileData.gender}</div>
							</Col>
							<Col md={6} lg={4}>
								<div className="small text-muted text-uppercase">user_type</div>
								<div className="fw-semibold text-dark">{profileData.userType}</div>
							</Col>
						</Row>
					</Card.Body>
				</Card>

				<Card className="border-0 shadow-sm rounded-4">
					<Card.Body className="p-4 p-md-5">
						<h2 className="h4 fw-bold text-primary mb-3">My Orders</h2>
	
						{isLoadingOrders ? (
							<div className="text-center py-4">
								<Spinner animation="border" variant="primary" />
							</div>
						) : (
						<Table responsive hover className="align-middle mb-0">
							<thead>
								<tr>
									<th>order_id</th>
									<th>service_name</th>
									<th>price</th>
									<th>status</th>
									<th>payment_method</th>
									<th>order_date</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order) => (
									<tr key={order.id}>
										<td>{order.id}</td>
										<td>{order.serviceName}</td>
										<td>{order.price}</td>
										<td>{order.orderStatus}</td>
										<td>{order.paymentMethod}</td>
										<td>{order.orderDate}</td>
									</tr>
								))}
							</tbody>
						</Table>
						)}
					</Card.Body>
				</Card>
			</Container>
		</main>
	);
};

export default UserProfile;
