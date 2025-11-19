#!/bin/bash

# Docker deployment script
# Builds and runs the AI Code Reviewer in a Docker container

set -e

echo "🐳 AI Code Reviewer - Docker Deployment"
echo "========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed"
    echo "Please install Docker from https://www.docker.com/"
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Error: docker-compose is not installed"
    echo "Please install docker-compose"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from example..."
    cp env.example .env
    echo ""
    echo "⚠️  Please edit .env file with your credentials before continuing"
    echo ""
    read -p "Press Enter after editing .env file..."
fi

echo "🔨 Building Docker image..."
docker-compose build

echo ""
echo "🚀 Starting container..."
docker-compose up -d

echo ""
echo "✅ Container started successfully!"
echo ""

# Wait a moment for container to start
sleep 2

# Check if container is running
if docker-compose ps | grep -q "Up"; then
    echo "📊 Container Status:"
    docker-compose ps
    
    echo ""
    echo "🔍 Testing health endpoint..."
    sleep 1
    
    if curl -s http://localhost:3000/health > /dev/null 2>&1; then
        echo "✅ Server is healthy!"
        echo ""
        echo "Server is running at: http://localhost:3000"
        echo ""
        echo "Useful commands:"
        echo "  - View logs: docker-compose logs -f"
        echo "  - Stop server: docker-compose down"
        echo "  - Restart: docker-compose restart"
        echo ""
        echo "Next steps:"
        echo "  1. Configure GitHub webhook pointing to your server"
        echo "  2. Webhook URL: https://your-domain.com/webhook"
        echo "  3. See SETUP_GUIDE.md for webhook setup instructions"
    else
        echo "⚠️  Server might still be starting. Check logs:"
        echo "  docker-compose logs -f"
    fi
else
    echo "❌ Container failed to start. Check logs:"
    docker-compose logs
    exit 1
fi

echo ""

