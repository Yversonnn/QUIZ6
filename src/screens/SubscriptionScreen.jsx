import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Modal, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { subscribeToTier } from '../actions/subscriptionActions';
import { buildApiUrl } from '../utils/api';

const SubscriptionScreen = () => {
	const dispatch = useDispatch();
	const { userInfo, accessToken } = useSelector((state) => state.userAuth);

	const [subscriptionTiers, setSubscriptionTiers] = useState([]);
	const [selectedTier, setSelectedTier] = useState(null);
	const [showPayPalModal, setShowPayPalModal] = useState(false);
	const [subscriptionSuccessMessage, setSubscriptionSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTiers = async () => {
			try {
				const response = await fetch(buildApiUrl('/api/v1/subscription/tiers/'));
				const data = await response.json();

				if (!response.ok) {
					throw new Error('Unable to load subscription tiers.');
				}

				setSubscriptionTiers(
					data.map((tier, index) => ({
						id: tier.id,
						tierName: tier.name,
						monthlyPrice: `$${tier.price} / month`,
						paypalPlanId: `PAYPAL-PLAN-${index + 1}`,
						benefits: [`Up to ${tier.max_usage} chatbot usages`, 'Subscription-based platform access'],
					}))
				);
			} catch (error) {
				setErrorMessage(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTiers();
	}, []);

	const handleOpenPayPalModal = (tier) => {
		setSelectedTier(tier);
		setShowPayPalModal(true);
	};

	const handleConfirmPayPalSubscription = async () => {
		if (!selectedTier) {
			return;
		}

		try {
			await dispatch(subscribeToTier(selectedTier.id, accessToken));
			setSubscriptionSuccessMessage(
				`${selectedTier.tierName} subscription activated via PayPal Subscription for ${userInfo?.email}.`
			);
			setErrorMessage('');
			setShowPayPalModal(false);
			setSelectedTier(null);
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	return (
		<main className="py-5">
			<Container>
				<section className="text-center mb-5">
					<Badge bg="primary" className="text-uppercase px-3 py-2 mb-3">
						PayPal Subscription
					</Badge>
					<h1 className="fw-bold text-primary mb-3">Choose Your Subscription Tier</h1>
					<p className="text-muted mx-auto" style={{ maxWidth: '760px' }}>
						Select one subscription tier below. This page uses PayPal <strong>subscription</strong> flow,
						not one-time purchase flow.
					</p>
				</section>

				{subscriptionSuccessMessage && <Alert variant="success">{subscriptionSuccessMessage}</Alert>}
				{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

				{isLoading ? (
					<div className="text-center py-5">
						<Spinner animation="border" variant="primary" />
					</div>
				) : (
				<Row className="g-4">
					{subscriptionTiers.map((tier) => (
						<Col key={tier.id} md={6} lg={4}>
							<Card className="h-100 border-0 shadow-sm rounded-4">
								<Card.Body className="d-flex flex-column p-4">
									<h2 className="h4 fw-bold text-primary mb-2">{tier.tierName}</h2>
									<p className="text-muted mb-3">{tier.monthlyPrice}</p>
									<div className="small text-muted mb-2">plan_id</div>
									<div className="fw-semibold mb-3">{tier.paypalPlanId}</div>
									<ul className="ps-3 text-muted mb-4">
										{tier.benefits.map((benefit) => (
											<li key={benefit}>{benefit}</li>
										))}
									</ul>
									<Button className="mt-auto" variant="warning" onClick={() => handleOpenPayPalModal(tier)}>
										Subscribe with PayPal
									</Button>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
				)}

				<div className="d-flex flex-wrap gap-2 mt-4">
					<Button as={Link} to="/" variant="outline-primary">
						Back to Home
					</Button>
					<Button as={Link} to="/subscription-list" variant="outline-secondary">
						View Subscription Transactions (Admin)
					</Button>
				</div>

				<Modal show={showPayPalModal} onHide={() => setShowPayPalModal(false)} centered>
					<Modal.Header closeButton>
						<Modal.Title>Confirm PayPal Subscription</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p className="mb-2">
							Subscriber: <strong>{userInfo?.email}</strong>
						</p>
						<p className="mb-2">
							Tier: <strong>{selectedTier?.tierName}</strong>
						</p>
						<p className="mb-2">
							Price: <strong>{selectedTier?.monthlyPrice}</strong>
						</p>
						<p className="mb-0">
							Plan ID: <strong>{selectedTier?.paypalPlanId}</strong>
						</p>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => setShowPayPalModal(false)}>
							Cancel
						</Button>
						<Button variant="warning" onClick={handleConfirmPayPalSubscription}>
							Confirm PayPal Subscription
						</Button>
					</Modal.Footer>
				</Modal>
			</Container>
		</main>
	);
};

export default SubscriptionScreen;
