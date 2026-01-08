# Docker Setup - Frontend (posyandu-fe)

Frontend service untuk aplikasi Posyandu dengan Nginx.

## 🚀 Quick Start

```bash
# 1. Setup environment (optional)
cd posyandu-fe
cp env.example .env

# 2. Build dan jalankan
docker-compose up -d

# 3. Lihat logs
docker-compose logs -f

# 4. Akses aplikasi
# http://localhost:5173
```

## 🛑 Stop Service

```bash
docker-compose down
```

## 📝 Environment Variables

Optional di `.env`:

- `FRONTEND_PORT` - Default: 5173

## 🔧 Commands

```bash
# Rebuild
docker-compose build --no-cache

# Restart
docker-compose restart

# View logs
docker-compose logs -f
```

## 📝 Notes

- Frontend di-serve via Nginx
- Build menggunakan Vite
- Environment variables untuk Vite harus diset saat build
- Untuk development, gunakan `npm run dev` langsung
