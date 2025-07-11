#!/bin/bash

echo "🗄️  Setting up PostgreSQL database for Budget App..."

# Check if PostgreSQL is running
if ! brew services list | grep -q "postgresql.*started"; then
    echo "❌ PostgreSQL is not running. Starting it now..."
    brew services start postgresql@15
    sleep 3
fi

# Create database and user
echo "📝 Creating database and user..."

# Create the database
createdb budget_app 2>/dev/null || echo "Database 'budget_app' already exists"

# Create user if it doesn't exist
psql -d postgres -c "CREATE USER budget_user WITH PASSWORD 'budget_password';" 2>/dev/null || echo "User 'budget_user' already exists"

# Grant privileges
psql -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE budget_app TO budget_user;" 2>/dev/null || echo "Privileges already granted"

# Update the .env file with the correct database URL
echo "🔧 Updating database configuration..."
cd server
cat > .env << EOF
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://budget_user:budget_password@localhost:5432/budget_app?schema=public"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
EOF

echo "✅ Database setup complete!"
echo ""
echo "🔧 Next steps:"
echo "1. Run database migrations: cd server && npx prisma migrate dev --name init"
echo "2. Start the backend: cd server && npm run dev"
echo "3. Start the frontend: cd client && npm run dev"
echo ""
echo "🌐 The app will be available at:"
echo "   Frontend: http://localhost:5173"
echo "   Backend API: http://localhost:5000" 