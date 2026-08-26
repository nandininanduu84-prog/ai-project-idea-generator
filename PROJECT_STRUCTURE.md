# AI Project Idea Generator - Project Structure

```
ai-project-idea-generator/
├── frontend/                          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── Common/
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   ├── Toast.jsx
│   │   │   │   └── Card.jsx
│   │   │   └── Forms/
│   │   │       └── ProjectGeneratorForm.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── GenerateIdeas.jsx
│   │   │   ├── ProjectResults.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Favorites.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── projectService.js
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ProjectContext.jsx
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── validators.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                           # Node.js + Express Backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── projectController.js
│   │   │   ├── aiController.js
│   │   │   └── adminController.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── projects.js
│   │   │   ├── ai.js
│   │   │   └── admin.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Project.js
│   │   │   ├── SavedProject.js
│   │   │   └── GenerationHistory.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── services/
│   │   │   ├── aiService.js
│   │   │   ├── emailService.js
│   │   │   └── pdfService.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   └── constants.js
│   │   ├── config/
│   │   │   └── database.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── SETUP_GUIDE.md
│   └── DATABASE_SCHEMA.md
│
├── README.md
└── .gitignore
```
