#!/bin/bash

echo "🚀 Starting Budget App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if PostgreSQL is running (basic check)
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL client not found. Make sure PostgreSQL is installed and running."
fi

echo "📦 Installing dependencies..."

# Install backend dependencies
echo "Installing backend dependencies..."
cd server
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../client
npm install

echo "✅ Dependencies installed successfully!"

echo ""
echo "🔧 Next steps:"
echo "1. Configure your database connection in server/.env"
echo "2. Run database migrations: cd server && npx prisma migrate dev"
echo "3. Start the backend: cd server && npm run dev"
echo "4. Start the frontend: cd client && npm run dev"
echo ""
echo "🌐 The app will be available at:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:5000"
echo ""
echo "📚 For more information, see the README.md file" 