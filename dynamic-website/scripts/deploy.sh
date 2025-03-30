#!/bin/bash

# Exit on error
set -e

# Load environment variables
source .env

# Build the application
npm run build

# Deploy to production
if [ "$DEPLOY_ENV" = "production" ]; then
    echo "Deploying to production..."
    docker-compose -f .docker/docker-compose.prod.yml up -d
else
    echo "Deploying to development..."
    docker-compose -f .docker/docker-compose.yml up -d
fi

echo "Deployment complete!"