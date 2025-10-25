# Backend Setup Guide

This README provides instructions to run the backend in both **Development** and **Production** modes using Docker.

---

## 📦 Prerequisites

- Docker & Docker Compose installed
- `.env` file configured in the root directory

## 🚀 Development Mode (docker-compose.dev.yml)

This mode is used during development with features like hot-reloading.

### ✅ Start Services in Detached Mode

```bash
docker-compose -f docker-compose.dev.yml up -d
```

### 🔄 Rebuild Containers with Changes

```bash
docker-compose -f docker-compose.dev.yml up -d --build
```

### 🛑 Stop Services

```bash
docker-compose -f docker-compose.dev.yml down
```

### 🔍 View Logs (Node App Only)

```bash
docker-compose -f docker-compose.dev.yml logs -f app
```

---

## 🏗 Production Mode (docker-compose.yml)

This mode is optimized for deployment.

### ✅ Start Services in Detached Mode

```bash
docker-compose up -d
```

### 🔄 Rebuild and Start

```bash
docker-compose up -d --build
```

### 🛑 Stop Services

```bash
docker-compose down
```

### 🔍 View Logs (Node App Only)

```bash
docker-compose logs -f app
```

---

## 🎯 Conclusion

You now have a structured guide to run your backend in both **Development** and **Production** environments using Docker. Update environment variables and services as your project grows.
