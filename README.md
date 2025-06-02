# 📱 My First Full-Stack Mobile App – React Native Frontend

This is the **React Native frontend** for my first full-stack mobile application, built as part of my **10 Apps in 100 Days Challenge** — **Day 10**. It connects to a Spring Boot backend API for authentication, user management, and data handling.

---

## 🚀 Features

- User Authentication (Login, Register) via JWT
- API Integration with Spring Boot Backend
- Image Upload with React Native Image Picker
- Secure Token Storage using AsyncStorage
- Clean UI with React Native Components
- Error Handling and Form Validation

---

## 🛠️ Tech Stack

- React Native (Expo)
- Axios (API calls)
- React Navigation (Navigation)
- React Native Image Picker (Image Uploads)
- AsyncStorage (Token Storage)

---

## 🌐 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone (https://github.com/bascom241/ChowNaijaUI.git)
cd RN
2️⃣ Install Dependencies
npm install
3️⃣ Update API Base URL
In your API service file (e.g., api.js or axios.js), update the baseURL to match your backend:
const api = axios.create({
  baseURL: 'http://your-backend-url:port',
});
4️⃣ Run the App
Using Expo CLI:


npx expo start
Or with npm:


npm start
Scan the QR code with your Expo Go app to launch the app on your device.

🐛 Challenges Faced During Development
💡 This was a major learning experience for me!

🧩 Authentication Flow with JWT
Managing JWT tokens in React Native was tricky, especially using AsyncStorage for token persistence and auto-login.

Handling token expiry and logout flows took several iterations to get right.

🌐 CORS Issues
CORS errors occurred when the frontend tried to communicate with the backend.

Had to configure CORS in the Spring Boot backend (@CrossOrigin) and manage allowed origins.

📸 Image Picker Issues
Handling permissions and file formats on different devices was a challenge.

Some image formats caused errors during upload and required additional testing.

📦 Backend API
The backend API is built using Spring Boot and provides endpoints for:

User Authentication (Login, Register)

Image Uploads

Data Retrieval

🔗 Backend repository: (https://github.com/bascom241/ChownaijaServer.git)


🙌 Acknowledgments
This project is the first app of my 10 Apps in 100 Days Challenge — Day 10. It has been an incredible journey, tackling real-world problems and learning new technologies.

🤝 Contributing
Pull requests are welcome! Feel free to open an issue or contribute to the project.

