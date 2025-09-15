# AI Recipe Remixer 🍲✨

Welcome to **AI Recipe Remixer**, a full-stack web application that transforms your leftover ingredients into delicious, unique recipes powered by cutting-edge generative AI technologies.

<img width="1919" height="866" alt="image" src="https://github.com/user-attachments/assets/0e143569-ac7c-49ed-90a0-a6e780bbe068" />


## 🚀 Live Demo

[https://smart-ai-chef.vercel.app/](https://smart-ai-chef.vercel.app/)

Frontend is deployed on **Vercel** and backend on **Render**.

---

## 📊 Key Features

### ✨ Dynamic Recipe Generation

* Input a list of ingredients.
* Select dietary preferences (Any, Vegetarian, Vegan).
* Add other preferences to generate a unique recipe.

### 🤖 AI-Powered Content

* **Text Generation**: Generates title, description, ingredients, and detailed step-by-step instructions using **Google Gemini API**.
* **Image Generation**: Creates photorealistic images of the final dish via **Stability AI API**, dynamically adapting prompts based on dietary restrictions.

### 👤 Full User Authentication

* Secure registration and login with **JWT (JSON Web Tokens)**.

### 📂 Personal Recipe History

* Save favorite recipes to a cloud-based "Recipe Box" stored in **MongoDB Atlas**.

### ✏️ CRUD Functionality

* View, save, and delete generated recipes.

### 🌟 Modern & Responsive UI

* Dark/White Mode toggle.
* Fully responsive for mobile and desktop.
* Custom modals, toast notifications, and responsive hamburger menu.

---

## 🛠️ Tech Stack

| Category       | Technology                                                               |
| -------------- | ------------------------------------------------------------------------ |
| Frontend       | React (Vite), Tailwind CSS, React Router, Axios, Framer Motion           |
| Backend        | Node.js, Express.js                                                      |
| Database       | MongoDB Atlas                                                            |
| AI Services    | Google Gemini API (Text Generation), Stability AI API (Image Generation) |
| Authentication | JWT, bcrypt.js                                                           |
| Deployment     | Frontend: Vercel, Backend: Render                                        |

---

## ⚙️ Setup and Installation

### Prerequisites

* Node.js
* MongoDB Atlas account

### 1. Clone the Repository

```bash
git clone https://github.com/debjit-stack/airecipe.git
cd airecipe
```

### 2. Backend Setup

```bash
cd server
npm install

touch .env
```

### 3. Frontend Setup

```bash
cd client
npm install
```

### 4. Environment Variables

Create a `.env` file in `/server` with the following:

```plaintext
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
STABILITY_API_KEY=your_stability_ai_api_key
```

### 5. Running the Application

Open two separate terminals:

#### Terminal 1 (Backend):

```bash
cd server
npm run dev
```

#### Terminal 2 (Frontend):

```bash
cd client
npm run dev
```

Access frontend at: [http://localhost:5173](http://localhost:5173)
Backend runs at: [http://localhost:5000](http://localhost:5000)

---

## 📣 Contribution

Contributions are welcome! Please open an issue or submit a pull request on GitHub.
