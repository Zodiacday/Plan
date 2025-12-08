#!/bin/bash

# ThePlugDude - Helpful Commands

echo "🚀 ThePlugDude - Free Tools Directory"
echo "======================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  Warning: .env.local not found!"
    echo "📝 Creating from .env.example..."
    cp .env.example .env.local
    echo "✅ Created .env.local - Please add your Supabase credentials"
    echo ""
fi

echo "📋 Available Commands:"
echo ""
echo "  npm run dev      - Start development server (http://localhost:3000)"
echo "  npm run build    - Build for production"
echo "  npm start        - Start production server"
echo "  npm run lint     - Run ESLint"
echo ""
echo "📚 Documentation:"
echo ""
echo "  QUICKSTART.md    - Quick start guide"
echo "  SETUP.md         - Complete setup instructions"
echo "  DEVELOPMENT.md   - Development guide"
echo "  PROJECT_STRUCTURE.md - Project overview"
echo ""
echo "🔧 Setup Checklist:"
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "  ✅ Dependencies installed"
else
    echo "  ❌ Dependencies not installed - Run: npm install"
fi

# Check if .env.local has been configured
if [ -f .env.local ]; then
    if grep -q "your_supabase" .env.local; then
        echo "  ❌ Environment variables not configured"
        echo "     Edit .env.local with your Supabase credentials"
    else
        echo "  ✅ Environment variables configured"
    fi
else
    echo "  ❌ .env.local not found"
fi

echo ""
echo "🗄️  Database Setup:"
echo "  1. Create a Supabase project at https://supabase.com"
echo "  2. Go to SQL Editor in your Supabase dashboard"
echo "  3. Copy contents of database/schema.sql and run it"
echo ""
echo "🎨 Features:"
echo "  ✨ Ultra-dark minimal design"
echo "  ⚡ Server-side rendering"
echo "  📱 Fully responsive"
echo "  🔍 SEO optimized"
echo "  🎯 TypeScript"
echo ""
echo "Ready to start? Run: npm run dev"
echo ""
