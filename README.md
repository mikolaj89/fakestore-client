# FakeStore Client

This is a **Next.js** client for interacting with the FakeStore API. It allows users to browse product categories and add items to the cart. Note - since Fakestore API doesn't save/update cart items by persisting changes in DB, all crucial cart operations are performed client-side.

## 🚀 Getting Started

### **1. Clone the Repository**
```sh
git clone https://github.com/mikolaj89/fakestore-client.git
cd fakestore-client
```

### **2. Install Dependencies**
Make sure you have **Node.js (v18 or later)** installed, then run:
```sh
npm install
```

### **3. Run the Development Server**
To start the local development server, use:
```sh
npm run dev
```
This will start the Next.js app on `http://localhost:3000/`.

### **4. Build for Production**
To create an optimized production build:
```sh
npm run build
```
After building, start the production server:
```sh
npm run start
```

## ⚡ Technologies Used
- **Next.js** (v15)
- **React** (v19)
- **TypeScript**
- **SCSS** for styling
- **ESLint** for linting

## 🛠️ Additional Commands
- **Lint Code:**
  ```sh
  npm run lint
  ```

## 📌 Notes
- This project uses the **FakeStore API** (`https://fakestoreapi.com/`).
- Data does **not** persist when adding/updating items in the cart.


