# Budget App - Full Stack Application

A modern full-stack budgeting application built with React, Express, and PostgreSQL.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Account Management**: Create and manage multiple financial accounts
- **Transaction Tracking**: Record income and expenses with categories
- **Budget Planning**: Set and track spending budgets
- **Dashboard**: Overview of financial health with charts and statistics
- **Responsive Design**: Modern UI that works on desktop and mobile

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
solvyr/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Backend Express application
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── controllers/   # Business logic
│   │   └── utils/         # Utility functions
│   ├── prisma/           # Database schema and migrations
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd solvyr
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your database credentials
   DATABASE_URL="postgresql://username:password@localhost:5432/budget_app?schema=public"
   JWT_SECRET="your-super-secret-jwt-key"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

6. **Configure frontend environment**
   ```bash
   # Create .env file
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The API will be available at `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Accounts
- `GET /api/accounts` - Get all user accounts
- `POST /api/accounts` - Create new account
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Categories
- `GET /api/categories` - Get user categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Budgets
- `GET /api/budgets` - Get user budgets
- `POST /api/budgets` - Create new budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget
- `GET /api/budgets/:id/progress` - Get budget progress

## 🗄️ Database Schema

The application uses the following main entities:

- **Users** - Application users with authentication
- **Accounts** - Financial accounts (checking, savings, etc.)
- **Categories** - Transaction categories (income/expense)
- **Transactions** - Financial transactions with amounts and metadata
- **Budgets** - Spending limits for categories

## 🔧 Development

### Backend Development
```bash
cd server
npm run dev  # Start with nodemon for auto-reload
```

### Frontend Development
```bash
cd client
npm run dev  # Start Vite dev server
```

### Database Management
```bash
cd server
npx prisma studio  # Open Prisma Studio for database management
npx prisma migrate dev  # Create and apply new migrations
npx prisma generate  # Generate Prisma client
```

## 🚀 Deployment

### Backend Deployment
1. Set up a PostgreSQL database (e.g., on Heroku, Railway, or AWS)
2. Configure environment variables
3. Run database migrations
4. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy the `dist` folder to your preferred platform (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on the repository. 