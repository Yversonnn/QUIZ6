import { useMemo, useState } from 'react';
import {
	Alert,
	Badge,
	Button,
	Card,
	Container,
	Form,
	Modal,
	Nav,
	Table,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import userData from '../data/userData';

const UserScreen = () => {
	const [users, setUsers] = useState(userData);
	const [activeTab, setActiveTab] = useState('users');
	const [editUserId, setEditUserId] = useState(null);
	const [editFormData, setEditFormData] = useState({ firstName: '', lastName: '', email: '' });
	const [selectedApplicationUser, setSelectedApplicationUser] = useState(null);
	const [showApproveModal, setShowApproveModal] = useState(false);
	const [showDeclineModal, setShowDeclineModal] = useState(false);
	const [merchantIdInput, setMerchantIdInput] = useState('');
	const [declineReasonInput, setDeclineReasonInput] = useState('');
	const userInfo = useSelector((state) => state.userAuth.userInfo);

	const isAdmin = useMemo(() => userInfo?.userType === 'Admin', [userInfo?.userType]);

	const handleDelete = (userId) => {
		setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));
	};

	const handleEditOpen = (user) => {
		if (!isAdmin) {
			return;
		}

		setEditUserId(user.id);
		setEditFormData({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
		});
	};

	const handleEditCancel = () => {
		setEditUserId(null);
		setEditFormData({ firstName: '', lastName: '', email: '' });
	};

	const handleEditChange = (event) => {
		const { name, value } = event.target;
		setEditFormData((currentEditFormData) => ({
			...currentEditFormData,
			[name]: value,
		}));
	};

	const handleEditSave = (userId) => {
		if (!isAdmin) {
			return;
		}

		setUsers((currentUsers) =>
			currentUsers.map((user) => {
				if (user.id !== userId) {
					return user;
				}

				return {
					...user,
					firstName: editFormData.firstName,
					lastName: editFormData.lastName,
					email: editFormData.email,
				};
			})
		);

		handleEditCancel();
	};

	const sellerApplicationUsers = useMemo(
		() => users.filter((user) => user.sellerApplicationStatus === 'Pending'),
		[users]
	);

	const handleOpenApproveModal = (user) => {
		setSelectedApplicationUser(user);
		setMerchantIdInput('');
		setShowApproveModal(true);
	};

	const handleOpenDeclineModal = (user) => {
		setSelectedApplicationUser(user);
		setDeclineReasonInput('');
		setShowDeclineModal(true);
	};

	const handleApproveApplication = () => {
		if (!selectedApplicationUser || !merchantIdInput.trim()) {
			return;
		}

		setUsers((currentUsers) =>
			currentUsers.map((user) => {
				if (user.id !== selectedApplicationUser.id) {
					return user;
				}

				return {
					...user,
					userType: 'Seller',
					sellerApplicationStatus: 'Approved',
					merchantId: merchantIdInput.trim(),
					declineReason: '',
				};
			})
		);

		setShowApproveModal(false);
		setSelectedApplicationUser(null);
		setMerchantIdInput('');
	};

	const handleDeclineApplication = () => {
		if (!selectedApplicationUser || !declineReasonInput.trim()) {
			return;
		}

		setUsers((currentUsers) =>
			currentUsers.map((user) => {
				if (user.id !== selectedApplicationUser.id) {
					return user;
				}

				return {
					...user,
					userType: 'User',
					sellerApplicationStatus: 'Declined',
					declineReason: declineReasonInput.trim(),
				};
			})
		);

		setShowDeclineModal(false);
		setSelectedApplicationUser(null);
		setDeclineReasonInput('');
	};

	if (!isAdmin) {
		return (
			<main className="py-5">
				<Container>
					<Card className="border-0 shadow-sm rounded-4 p-4 text-center">
						<h1 className="h3 text-primary mb-3">Admin Access Only</h1>
						<p className="text-muted mb-4">
							The users page is restricted and can only be accessed by an Admin account.
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
				<Card className="border-0 shadow-sm rounded-4 overflow-hidden">
					<Card.Body className="p-4 p-md-5">
						<div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
							<div>
								<Badge bg="primary" className="text-uppercase px-3 py-2 mb-2">
									Admin Only
								</Badge>
								<h1 className="h2 fw-bold text-primary mb-2">Platform Users</h1>
								<p className="text-muted mb-0">
									View all users and manage records from this table. Only Admin can edit user details.
								</p>
							</div>
							<Button as={Link} to="/" variant="outline-primary">
								Back to Home
							</Button>
						</div>

						<Alert variant="info" className="mb-4">
							Active session: <strong>{userInfo?.email}</strong> ({userInfo?.userType})
						</Alert>

						<Nav
							variant="tabs"
							className="mb-4"
							activeKey={activeTab}
							onSelect={(selectedKey) => setActiveTab(selectedKey || 'users')}
						>
							<Nav.Item>
								<Nav.Link eventKey="users">All Users</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="sellerApplications">
									Seller Applications{' '}
									<Badge bg="secondary" pill>
										{sellerApplicationUsers.length}
									</Badge>
								</Nav.Link>
							</Nav.Item>
						</Nav>

						{activeTab === 'users' && (
							<Table responsive hover className="align-middle mb-0">
								<thead>
									<tr>
										<th>first_name</th>
										<th>last_name</th>
										<th>email</th>
										<th className="text-end">actions</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user) => {
										const isEditing = editUserId === user.id;

										return (
											<tr key={user.id}>
												<td>
													{isEditing ? (
														<Form.Control
															name="firstName"
															value={editFormData.firstName}
															onChange={handleEditChange}
															size="sm"
														/>
													) : (
														user.firstName
													)}
												</td>
												<td>
													{isEditing ? (
														<Form.Control
															name="lastName"
															value={editFormData.lastName}
															onChange={handleEditChange}
															size="sm"
														/>
													) : (
														user.lastName
													)}
												</td>
												<td>
													{isEditing ? (
														<Form.Control
															type="email"
															name="email"
															value={editFormData.email}
															onChange={handleEditChange}
															size="sm"
														/>
													) : (
														user.email
													)}
												</td>
												<td className="text-end">
													{isEditing ? (
														<div className="d-inline-flex gap-2">
															<Button size="sm" variant="success" onClick={() => handleEditSave(user.id)}>
																Save
															</Button>
															<Button size="sm" variant="secondary" onClick={handleEditCancel}>
																Cancel
															</Button>
														</div>
													) : (
														<div className="d-inline-flex gap-2">
															<Button
																size="sm"
																variant="warning"
																onClick={() => handleEditOpen(user)}
																disabled={!isAdmin}
															>
																Edit
															</Button>
															<Button size="sm" variant="danger" onClick={() => handleDelete(user.id)}>
																Delete
															</Button>
														</div>
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						)}

						{activeTab === 'sellerApplications' && (
							<Table responsive hover className="align-middle mb-0">
								<thead>
									<tr>
										<th>first_name</th>
										<th>last_name</th>
										<th>email</th>
										<th className="text-end">actions</th>
									</tr>
								</thead>
								<tbody>
									{sellerApplicationUsers.length === 0 && (
										<tr>
											<td colSpan={4} className="text-center text-muted py-4">
												No pending seller applications.
											</td>
										</tr>
									)}
									{sellerApplicationUsers.map((user) => (
										<tr key={user.id}>
											<td>{user.firstName}</td>
											<td>{user.lastName}</td>
											<td>{user.email}</td>
											<td className="text-end">
												<div className="d-inline-flex gap-2">
													<Button size="sm" variant="success" onClick={() => handleOpenApproveModal(user)}>
														Approve
													</Button>
													<Button size="sm" variant="danger" onClick={() => handleOpenDeclineModal(user)}>
														Decline
													</Button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						)}
					</Card.Body>
				</Card>
			</Container>

			<Modal show={showApproveModal} onHide={() => setShowApproveModal(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Approve Seller Application</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p className="mb-3">
						Assign a merchant-id for <strong>{selectedApplicationUser?.email}</strong>.
					</p>
					<Form.Group controlId="approveMerchantId">
						<Form.Label className="fw-semibold">merchant_id</Form.Label>
						<Form.Control
							type="text"
							placeholder="SELLER-MERCHANT-2026-1001"
							value={merchantIdInput}
							onChange={(event) => setMerchantIdInput(event.target.value)}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowApproveModal(false)}>
						Cancel
					</Button>
					<Button variant="success" onClick={handleApproveApplication} disabled={!merchantIdInput.trim()}>
						Approve
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={showDeclineModal} onHide={() => setShowDeclineModal(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Decline Seller Application</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p className="mb-3">
						Provide the reason for declining <strong>{selectedApplicationUser?.email}</strong>.
					</p>
					<Form.Group controlId="declineReason">
						<Form.Label className="fw-semibold">decline_reason</Form.Label>
						<Form.Control
							as="textarea"
							rows={4}
							placeholder="Please provide valid credentials and updated seller documents."
							value={declineReasonInput}
							onChange={(event) => setDeclineReasonInput(event.target.value)}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowDeclineModal(false)}>
						Cancel
					</Button>
					<Button variant="danger" onClick={handleDeclineApplication} disabled={!declineReasonInput.trim()}>
						Decline
					</Button>
				</Modal.Footer>
			</Modal>
		</main>
	);
};

export default UserScreen;
