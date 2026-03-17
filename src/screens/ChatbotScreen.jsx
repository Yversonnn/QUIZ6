import { useState } from 'react';
import { Alert, Badge, Button, Card, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearChatbotMessages, sendChatbotMessage } from '../actions/chatbotActions';

const ChatbotScreen = () => {
  const dispatch = useDispatch();
  const [questionInput, setQuestionInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const messages = useSelector((state) => state.chatbot.messages);
  const accessToken = useSelector((state) => state.userAuth.accessToken);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedQuestion = questionInput.trim();
    if (!trimmedQuestion) {
      return;
    }

    try {
      await dispatch(sendChatbotMessage(trimmedQuestion, accessToken));
      setQuestionInput('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <main className="py-5">
      <Container>
        <Card className="border-0 shadow-sm rounded-4">
          <Card.Body className="p-4 p-md-5">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
              <div>
                <Badge bg="primary" className="text-uppercase px-3 py-2 mb-2">
                  AI Chatbot
                </Badge>
                <h1 className="h3 fw-bold text-primary mb-2">Project Inquiry Assistant</h1>
                <p className="text-muted mb-0">
                  This chatbot only answers questions related to the Plumbing and Drain Services platform.
                </p>
              </div>
              <div className="d-flex gap-2">
                <Button as={Link} to="/" variant="outline-primary">
                  Back to Home
                </Button>
                <Button variant="outline-secondary" onClick={() => dispatch(clearChatbotMessages())}>
                  Clear Chat
                </Button>
              </div>
            </div>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Card className="bg-light border-0 rounded-4 mb-4">
              <Card.Body style={{ maxHeight: '360px', overflowY: 'auto' }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 d-flex ${message.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
                  >
                    <div
                      className={`px-3 py-2 rounded-3 ${
                        message.role === 'user' ? 'bg-primary text-white' : 'bg-white border'
                      }`}
                      style={{ maxWidth: '80%' }}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="chatbotQuestion">
                <Form.Label className="fw-semibold">Ask about this project</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Example: How does seller approval work?"
                  value={questionInput}
                  onChange={(event) => setQuestionInput(event.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Send Question
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
};

export default ChatbotScreen;