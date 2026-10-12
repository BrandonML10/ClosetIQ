# 👕 ClosetIQ - Your Smart Closet

ClosetIQ is a full-stack web application that digitizes your wardrobe and uses Artificial Intelligence to help you decide what to wear. Forget the classic "I have nothing to wear"; ClosetIQ analyzes your clothes, the weather, and the occasion to put together the best look of the day for you.

## ✨ Key Features

* **Automated Digital Closet:** Upload photos of your garments. The built-in AI automatically removes the image background and extracts the primary color palette.
* **Weather & Occasion Suggestions:** ClosetIQ cross-references your city's current weather data with your clothes to suggest the ideal outfit, adapting to whether you need something casual or formal.
* **Outfit Builder:** An interactive space where you can mix and match your tops, bottoms, and footwear to save your favorite combinations.
* **Style Calendar:** Assign your outfits to specific days of the week to plan your looks and keep track of what clothes you've already worn.
* **Statistical Dashboard:** View real-time charts about the predominant colors in your wardrobe and your total number of garments.

## 🛠️ Tech Stack

The project is divided into microservices to ensure optimal performance:

* **Frontend:** Next.js, React, Tailwind CSS.
* **Database:** Supabase (PostgreSQL) connected via Prisma ORM.
* **AI Microservice (Backend):** Python, FastAPI. Uses `rembg` for computer vision, `scikit-learn` for color clustering, and Machine Learning models for classification.
* **Deployment:** 100% containerized project using Docker and Docker Compose.

## 🚀 How to run the project locally

Thanks to the Docker architecture, you don't need to manually install Node.js dependencies or configure Python environments. Setting up the project takes just a single command.

1. **Clone this repository:**
```bash
git clone [https://github.com/your-user/ClosetIQ.git]
cd CLosetIQ
```

2. **Set up your environment:**
Create a `.env` file in the root folder and add your Supabase credentials:
```env
DATABASE_URL="your_supabase_db_url"
NEXT_PUBLIC_SUPABASE_URL="your_public_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key"
```

3. **Start the project:**
Open your terminal and run:
```bash
docker-compose up --build -d
```

4. **Ready!**
* The application Frontend will be running at: `http://localhost:3000`
* The AI Engine will be listening at: `http://localhost:8000`

---
*Designed and developed by  Brandon Lucatero / Zabdiel Cervantes  * ✌️
