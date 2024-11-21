# B2B Sales Management Application

This repository contains the backend implementation for a Sales Management System using Node.js and PostgreSQL.

---

## Features

- CRUD operations for products and sales orders.
- Attach products to sales orders.
- Dynamic filtering and searching for sales orders.
- Integration with a third-party API for order details.
- PostgreSQL database connection and initialization.

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **PostgreSQL** (v12 or later)
- **Git**

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/PolepallyBhaskar/sales-hub.git
   cd sales-hub/backend
   ```

Use npm start to run server

sudo apt install postgresql
psql --version
sudo systemctl status postgresql
ls /etc/postgresql/
sudo systemctl start postgresql@14-main
sudo systemctl status postgresql@14-main
netstat -tuln | grep 5432
psql -U postgres -h localhost -d postgres
sudo -u postgres psql
ALTER USER postgres PASSWORD 'database@123';
psql -U postgres -h localhost -d postgres
