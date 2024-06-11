Angeline Vu, Zainub Siddiqui

GitHub Link: https://github.com/angelinevu/WebChat

Project Overview:

WebChat is a team project aimed at building a simplified instant messaging platform similar to Slack or Telegram. The application consists of a chat server and multiple chat clients (users), allowing users to send and receive messages in real-time over the Internet. Essential functionalities include authentication, creating and managing chat rooms, chatting, displaying message history, and proper database management for storing user information and messaging history.

Code and Test Structure:

The project follows a modular and scalable architecture, adhering to best practices and design patterns. The frontend is built using React.js, providing a responsive and user-friendly interface. The backend utilizes Node.js and Express.js for handling server-side logic and API routes. MongoDB is used as the database to store user information, chats, and messaging history.

The project follows a test-driven development approach, with unit tests covering backend functionality and integration tests for API routes and database interactions. Additionally, the frontend testing covered authentication, message sending, and custom hooks. The test plan includes detailed test cases for unit testing, feature testing, and system testing to ensure robustness and security.

Challenges Faced:

Implementing real-time messaging functionality presented challenges in managing WebSocket connections, synchronizing messages, and maintaining data consistency across clients. Additionally, bridging the gap between frontend and backend for chat creation posed a challenge. Testing was also a challenge as we had to immerse ourselves in new testing technologies such as Jest. Additionally, writing tests for various cases and ensuring they pass was difficult.

Additional Features Implemented:

In addition to the core functionalities, we implemented several extra features to enhance the user experience and usability of the application:

- New Message Notification Audio: Users receive audio notifications for new incoming messages, enhancing awareness and engagement.
- New Message Shake: The chat interface shakes subtly to alert users of new incoming messages, providing visual cues for immediate attention.
- Online Status Icon: Users' online status is indicated with an icon, allowing them to see the availability of other users in real-time.
- Automatic Scroll: The chat interface automatically scrolls to the latest message, ensuring users always stay updated with the latest conversations.

Deployment: WebChat is deployed and accessible online. You can access the deployed application by following the link: https://webchat-e96e.onrender.com/login

Running the Application:

To run the WebChat application locally, follow these steps:

Clone the Repository: 
Use the following command to clone the repository to your local machine:
git clone git@github.com:angelinevu/WebChat.git

Install Dependencies: Navigate to the project directory and install the necessary dependencies for both the frontend and backend:

cd WebChat
npm install
cd frontend
npm install
Start the backend server: npm start
Start the frontend server: npm run dev
Open your web browser and navigate to http://localhost:5000/.
