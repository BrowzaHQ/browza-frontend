#!/bin/bash
set -e

echo "🔍 Starting CI checks..."
echo ""

echo "📦 Installing dependencies..."
npm ci

echo "✅ Dependencies installed"
echo ""

echo "🔤 Running TypeScript check..."
npm run typecheck

echo "✅ TypeScript check passed"
echo ""

echo "🎨 Running ESLint..."
npm run lint

echo "✅ ESLint passed"
echo ""

echo "🏗️  Building Next.js..."
npm run build

echo "✅ Build succeeded"
echo ""

echo "✨ All checks passed!"
