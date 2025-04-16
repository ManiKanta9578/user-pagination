# Fullstack User Pagination 📄⚙️

A full-stack application that provides a paginated and sortable user listing.  
Built using **Node.js (Express)** for the backend and **React** for the frontend.

---

## ✨ Features

### 🔹 Backend (Node.js + Express)
- `GET /users` API endpoint
- Supports:
  - **Pagination** using `page` and `size` query params
  - **Sorting** using the `sort` query param (by any user field)
  - **Previous/Next** URIs in the response
  - **Total Results** tracking
- Clean, modular code with utility functions
- Unit tested with **Jest** and **Supertest**

### 🔹 Frontend (React)
- Displays user data in a table
- Allows:
  - Sorting by `name` or `id`
  - Configuring page size
  - Navigating with Previous/Next buttons

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/ManiKanta9578/user-pagination.git
cd user-pagination
