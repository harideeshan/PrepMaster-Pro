# PrepMaster AI 🚀

PrepMaster AI is a full-stack interview preparation platform designed to help developers master Java, Data Structures, and SQL. It features an integrated AI mentor that explains complex concepts in real-time.

## 🧠 AI Integration
The core feature of this app is the **Gemini 3 Flash** integration. When a user answers a question, the AI provides a concise, 2-sentence explanation of the logic, acting as a personal technical interviewer.

## 🛠️ Tech Stack
- **Frontend:** React.js (Hooks, Context, Functional Components)
- **Backend:** Java Spring Boot (REST APIs, Service Pattern)
- **Database:** H2 In-Memory Database
- **AI Engine:** Google Gemini API (v1beta)
- **Security:** Environment Variables (.env) for API key protection

## 🚀 Installation & Setup

### Prerequisites
- Java 17 or higher
- Node.js & npm

### Backend Setup
1. Navigate to the `backend` folder.
2. Run `./mvnw spring-boot:run` to start the server at `http://localhost:8080`.

### Frontend Setup
1. Navigate to the `frontend` folder.
2. Create a `.env` file and add:
   `REACT_APP_GEMINI_KEY=your_api_key_here`
3. Run `npm install` and then `npm start`.

## 🛡️ Security Note
This project uses `.gitignore` to ensure that API keys are never pushed to public repositories.