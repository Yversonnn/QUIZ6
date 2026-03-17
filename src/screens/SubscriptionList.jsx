import { Badge, Button, Card, Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SubscriptionList = () => {
  const userInfo = useSelector((state) => state.userAuth.userInfo);
  const transactions = useSelector((state) => state.subscription.transactions);

  return (
    <main className="py-5">
      <Container>
        <Card className="border-0 shadow-sm rounded-4">
          <Card.Body className="p-4 p-md-5">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
              <div>
                <Badge bg="primary" className="text-uppercase px-3 py-2 mb-2">
                  Admin Only
                </Badge>
                <h1 className="h3 fw-bold text-primary mb-2">Subscription Transactions</h1>
                <p className="text-muted mb-0">List of all subscription records on the platform.</p>
              </div>
              <Button as={Link} to="/" variant="outline-primary">
                Back to Home
              </Button>
            </div>

            <div className="mb-3 small text-muted">
              Logged in as: <strong>{userInfo?.email}</strong>
            </div>

            <Table responsive hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th>user</th>
                  <th>tier</th>
                  <th>subscription_date (created_at)</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.user}</td>
                    <td>{transaction.tier}</td>
                    <td>{transaction.createdAt}</td>
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

export default SubscriptionList;