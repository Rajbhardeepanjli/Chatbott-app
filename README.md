# 🤖 Full-Stack Chatbot Application

A full-stack chatbot application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.  
The chatbot processes user input using an AI API, converts responses into structured JSON, and stores the data in a database.

---

## 🎯 Objective

Build a modern chatbot where users can interact seamlessly. The app should:

- Process user input via AI API (OpenAI, etc.)
- Convert chatbot responses into JSON
- Send JSON to the backend
- Store JSON data in a database (PostgreSQL)

---

## ✅ Features

- Interactive chat interface 
- AI-powered responses
- JSON response parsing and storage
- Sentiment analysis and keywords extraction
- Modular and clean code structure
- Styled with Tailwind CSS and shadcn/ui

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS, shadcn/ui  
- **Backend:** Next.js API routes  
- **Database:** SQLite / PostgreSQL / MySQL (via Prisma)  
- **AI API:** OpenAI API  

---



## 💻 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
2. Install dependencies
bash
Copy code
npm install
# or
yarn install
3. Configure environment variables
Create a .env file in the root directory and add:

env
Copy code
# OpenAI API key
OPENAI_API_KEY=your_openai_api_key_here

# Database URL for Prisma
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

You can get your OpenAI API key from OpenAI API Keys.

4. Set up the database
bash
Copy code
# Generate Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate dev --name init
5. Run the development server
bash
Copy code
npm run dev

Open your browser at http://localhost:3000 to start using the chatbot.

## 💻 Screenshots
![alt text](assets/chatbot-ui.png)
chatbot-app/assets/conversation.png
chatbot-app/assets/DB_Stored.png
chatbot-app/assets/json.png
