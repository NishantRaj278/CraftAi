# CraftAI 🚀

**CraftAI** is a full-stack AI-powered code generation and chat platform that helps developers create React components, CSS styles, and HTML code through conversational AI.

## ✨ Features

- 🤖 **AI-Powered Code Generation** - Generate React/JSX, CSS, and HTML code from natural language prompts
- 💬 **Chat Sessions** - Organize your conversations and code in persistent sessions
- 👁️ **Live Code Preview** - See your generated code rendered in real-time
- 📦 **Code Export** - Download generated code as a ZIP file with separate JSX and CSS files
- 🔐 **User Authentication** - Secure JWT-based authentication with HTTP-only cookies
- 📱 **Responsive Design** - Mobile-friendly UI with collapsible sidebar
- 🎨 **Modern UI** - Beautiful gradient-based design with Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- **React** with Next.js
- **Zustand** for state management
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Syntax Highlighter** for code display
- **JSZip** for code export

### Backend

- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/CraftAI.git
cd CraftAI
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
CraftAI/
├── backend/
│   ├── controllers/     # Request handlers
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── middleware/     # Authentication middleware
│   ├── utils/          # Helper functions
│   └── server.js       # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── app/        # Next.js pages
│   │   ├── components/ # React components
│   │   ├── store/      # Zustand stores
│   │   └── lib/        # Utilities
│   └── public/         # Static assets
│
└── readme.md
```

## 🎯 Usage

1. **Register/Login** - Create an account or sign in
2. **Create Session** - Start a new chat session with a title
3. **Generate Code** - Enter prompts like "Create a green button component"
4. **Preview & Download** - View live preview and download as ZIP
5. **Manage Sessions** - Access previous sessions from the sidebar

## 🔑 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - Logout user

### Sessions

- `GET /api/sessions` - Get all sessions
- `GET /api/sessions/:id` - Get session by ID
- `POST /api/sessions/new-session` - Create new session
- `PUT /api/sessions/:sessionId/add-chat/:chatId` - Add chat to session

### Messages

- `POST /api/messages/createMessage` - Generate code from prompt

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**

- GitHub: [@nishantraj278](https://github.com/nishantraj278)

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Tailwind CSS for the amazing styling framework
- The React and Node.js communities

---

Made with ❤️ by Nishant Raj
