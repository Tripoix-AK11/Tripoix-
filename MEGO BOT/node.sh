#!/bin/bash

echo "🚀 جاري تثبيت Node.js..."

# تحديث الحزم
apt update && apt upgrade -y

# تثبيت Node.js و npm
apt install nodejs -y

# التأكد من التثبيت
node -v && npm -v

echo "✅ تم تثبيت Node.js بنجاح!"
