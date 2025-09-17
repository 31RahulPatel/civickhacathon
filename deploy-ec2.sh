#!/bin/bash

# CivicSpot EC2 Deployment Script
echo "🚀 Starting CivicSpot deployment on EC2..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install global packages
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx git -y

# Install dependencies
npm run install-all

# Build frontend
cd frontend && npm run build && cd ..

# Start backend with PM2
cd backend
pm2 start server.js --name "civicspot-backend"
pm2 startup
pm2 save
cd ..

# Configure Nginx (basic config)
sudo tee /etc/nginx/sites-available/civicspot > /dev/null <<EOF
server {
    listen 80;
    server_name _;

    location / {
        root $(pwd)/frontend/dist;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/civicspot /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx

# Configure firewall
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

echo "✅ Deployment complete!"
echo "🌐 Access your app at: http://$(curl -s ifconfig.me)"
echo "📊 Monitor backend: pm2 status"