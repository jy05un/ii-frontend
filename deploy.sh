#!/bin/bash

# 1. Git 최신 코드 가져오기
echo "Pulling latest changes from Git..."
git pull || { echo "Git pull failed. Exiting."; exit 1; }

# 2. 프로젝트 빌드
echo "Building the project using npm..."
npm run build || { echo "npm build failed. Exiting."; exit 1; }

# 3. 빌드 결과를 Nginx 웹 루트로 복사
echo "Copying build files to Nginx web root: $NGINX_WEB_ROOT"
sudo cp -r build/* "$NGINX_WEB_ROOT" || { echo "Failed to copy build files. Exiting."; exit 1; }

# 4. Nginx 재시작
echo "Restarting Nginx..."
sudo systemctl restart nginx || { echo "Failed to restart Nginx. Exiting."; exit 1; }

echo "Deployment completed successfully!"
