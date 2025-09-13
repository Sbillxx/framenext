# 🚀 Frame ID - Deployment Guide

## 📋 Setup Requirements untuk Laptop Baru

### 1. 🔧 System Requirements

```bash
- Node.js v18.17.0+ (Recommended: v20+)
- npm atau yarn
- MySQL Server 8.0+
- Git
```

### 2. 📦 Clone Repository

```bash
git clone <repository-url>
cd framenext
```

### 3. 💻 Install Dependencies

```bash
# Install all dependencies
npm install

# Atau jika pakai yarn
yarn install
```

### 4. 🗄️ Database Setup

#### A. Install MySQL

- **Windows:** Download MySQL Installer dari mysql.com
- **macOS:** `brew install mysql`
- **Linux:** `sudo apt install mysql-server`

#### B. Create Database

```sql
CREATE DATABASE twibbon_db;
USE twibbon_db;

-- Create twibbons table
CREATE TABLE twibbons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  filename VARCHAR(255) NOT NULL,
  url VARCHAR(255),
  downloads INT DEFAULT 0,
  shares INT DEFAULT 0,
  slug VARCHAR(255) UNIQUE NOT NULL,
  thumbnail VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table (optional)
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. ⚙️ Environment Variables

Create `.env.local` file di root folder:

```env
# Database Configuration
DB_HOST=localhost
DB_NAME=twibbon_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_PORT=3306
CONNECTION_LIMIT=10

# Next.js Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development

# Optional: SEO Verification Codes
GOOGLE_VERIFICATION_CODE=your_google_verification_code
YANDEX_VERIFICATION_CODE=your_yandex_verification_code

# JWT Secret (untuk session)
JWT_SECRET=your_super_secret_jwt_key_here
```

### 6. 📂 Directory Structure Requirements

Pastikan folder ini ada:

```
public/
├── uploads/           # Upload user photos
├── thumbnail/         # Twibbon thumbnails
└── images/           # Static assets
    ├── frameidbiru.png
    ├── Logo Frameid White.png
    └── ... (other images)
```

### 7. 🚀 Running the Application

#### Development Mode

```bash
npm run dev
# atau
yarn dev

# Server akan berjalan di http://localhost:3000
```

#### Production Mode

```bash
# Build aplikasi
npm run build

# Start production server
npm start
# atau
yarn start

# Server akan berjalan di http://localhost:8080
```

## 📋 Package Dependencies Explained

### 🎯 Core Dependencies

```json
{
  "next": "15.5.2", // React framework
  "react": "19.1.0", // React library
  "react-dom": "19.1.0", // React DOM
  "typescript": "^5" // TypeScript support
}
```

### 🎨 UI & Animation

```json
{
  "framer-motion": "^12.23.12", // Animations
  "tailwindcss": "^4", // CSS framework
  "react-icons": "^5.5.0", // Icon library
  "react-easy-crop": "^5.5.0" // Image cropping
}
```

### 🗄️ Database & Auth

```json
{
  "mysql2": "^3.14.3", // MySQL driver
  "bcrypt": "^6.0.0", // Password hashing
  "jose": "^6.1.0", // JWT handling
  "zod": "^4.1.5" // Schema validation
}
```

### 🔧 Development Tools

```json
{
  "@types/node": "^20.19.11", // Node.js types
  "@types/react": "^19", // React types
  "@types/bcrypt": "^6.0.0", // Bcrypt types
  "eslint": "^9", // Code linting
  "eslint-config-next": "15.5.2" // Next.js ESLint
}
```

## 🛠️ Troubleshooting

### Database Connection Issues

```bash
# Test MySQL connection
mysql -u root -p

# Grant permissions jika diperlukan
GRANT ALL PRIVILEGES ON twibbon_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### Port Already in Use

```bash
# Kill process di port 3000
npx kill-port 3000

# Atau ubah port di package.json
"dev": "next dev -p 3001"
```

### Permission Errors (Windows)

```bash
# Run as Administrator atau:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📱 Testing the Application

### 1. Homepage

- http://localhost:3000

### 2. Admin Panel

- http://localhost:3000/adminlogin
- http://localhost:3000/admin

### 3. Browse Twibbons

- http://localhost:3000/jelajahi

### 4. Help Center

- http://localhost:3000/pusat-bantuan

### 5. About Us

- http://localhost:3000/tentang-kami

## 🌐 Production Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Setup environment variables di Vercel dashboard
```

### Docker (Alternative)

```dockerfile
# Dockerfile sudah include semua requirements
docker build -t frameid .
docker run -p 3000:3000 frameid
```

## ✅ Verification Checklist

- [ ] Node.js installed (v18+)
- [ ] MySQL running and accessible
- [ ] Database `twibbon_db` created
- [ ] Tables created (twibbons, users)
- [ ] `.env.local` configured
- [ ] `npm install` completed
- [ ] `npm run dev` starts successfully
- [ ] Can access homepage
- [ ] Can upload and view twibbons
- [ ] Admin panel accessible

## 🆘 Need Help?

Jika ada error atau butuh bantuan setup:

1. **Check logs** di terminal
2. **Verify database connection** dengan MySQL client
3. **Ensure all environment variables** ter-set dengan benar
4. **Check file permissions** untuk upload directories

**Contact:** support@frameid.com

---

**Happy Coding! 🚀✨**
