import { Badge, Button, Card, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const paypalTransactions = [
	{
		id: 'PP-7001',
		orderDescription: 'Emergency Pipe Repair',
		price: '$180',
		sellerMerchantId: 'SELLER-MERCHANT-2026-4412',
		paymentDate: '2026-03-10',
	},
	{
		id: 'PP-7002',
		orderDescription: 'Drain Cleaning',
		price: '$120',
		sellerMerchantId: 'SELLER-MERCHANT-2026-7721',
		paymentDate: '2026-03-12',
	},
	{
		id: 'PP-7003',
		orderDescription: 'Sewer Line Inspection',
		price: '$240',
		sellerMerchantId: 'SELLER-MERCHANT-2026-4412',
		paymentDate: '2026-03-15',
	},
];

const PayPal = () => {
	return (
		<main className="py-5">
			<Container>
				<Card className="border-0 shadow-sm rounded-4">
					<Card.Body className="p-4 p-md-5">
						<div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
							<div>
								<Badge bg="primary" className="text-uppercase px-3 py-2 mb-2">
									PayPal Multi-Merchant
								</Badge>
								<h1 className="h3 fw-bold text-primary mb-2">Plumbing Service Transactions</h1>
								<p className="text-muted mb-0">
									Payments are directed to seller PayPal accounts, while this platform still tracks transaction visibility.
								</p>
							</div>
							<Button as={Link} to="/" variant="outline-primary">
								Back to Home
							</Button>
						</div>

						<Table responsive hover className="align-middle mb-0">
							<thead>
								<tr>
									<th>transaction_id</th>
									<th>order_description</th>
									<th>price</th>
									<th>seller_merchant_id</th>
									<th>payment_date</th>
								</tr>
							</thead>
							<tbody>
								{paypalTransactions.map((transaction) => (
									<tr key={transaction.id}>
										<td>{transaction.id}</td>
										<td>{transaction.orderDescription}</td>
										<td>{transaction.price}</td>
										<td>{transaction.sellerMerchantId}</td>
										<td>{transaction.paymentDate}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Card.Body>
				</Card>
			</Container>
		</main>
	);
};

export default PayPal;
