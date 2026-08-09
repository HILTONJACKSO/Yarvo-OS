# Yarvo OS

Yarvo OS is a comprehensive, multi-tenant hotel and hospitality management system designed to streamline operations across the entire property. It features a robust NestJS backend and a highly responsive Next.js frontend, providing real-time synchronization via WebSockets.

## Architecture

The system is built as a monorepo containing two main applications:
- **`apps/api`**: A powerful NestJS backend utilizing Prisma for PostgreSQL interactions. It handles strict multi-tenant data isolation, ensuring hotels only ever access their own data securely.
- **`apps/web`**: A dynamic Next.js React frontend built with a modern, glassmorphic UI and optimized for high-performance dashboards.

## Features
- **Multi-Tenant System**: Securely run multiple hotel businesses/branches from a single database deployment.
- **Housekeeping & Maintenance**: Real-time room status tracking, automated task assignment, and lost & found management.
- **Kitchen & Point of Sale (POS)**: Live kitchen display tickets, order management, and split-payment processing.
- **Admissions & Ticketing**: QR code generation and validation for pool, gym, and event access.
- **Cashier Shifts**: Comprehensive drawer balancing and secure shift management for front-desk clerks.

## Deployment Setup (Hostinger VPS / Docker)

Yarvo OS is fully Dockerized and optimized for production deployment on a VPS.

### Prerequisites
- Docker and Docker Compose installed on your VPS.
- PostgreSQL database (automatically provisioned via docker-compose).

### Quick Start
1. Clone this repository to your server:
   ```bash
   git clone https://github.com/HILTONJACKSO/Yarvo-OS.git
   cd Yarvo-OS
   ```
2. Copy the environment variables template and configure your secrets:
   ```bash
   cp .env.example .env
   # Edit .env to include your secure passwords and the actual domain/IP
   ```
3. Boot the system:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

### Reverse Proxy Configuration
If deploying with a domain name, configure Nginx or Cloudflare to route:
- `yourdomain.com` -> Port `3001` (Next.js Web Frontend)
- `api.yourdomain.com` -> Port `3002` (NestJS API)

## Database Reset 
If you need to completely wipe your database to remove old ghost reservations, run:
```bash
npx prisma migrate reset --schema=./apps/api/prisma/schema.prisma --force
```

---
*Built with ❤️ for the modern hospitality industry.*
