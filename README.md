# Chatty

Chatty is a real-time chat application built with React, Vite, Express, MongoDB, and Socket.io. It allows users to sign up, log in, and chat with other users in real-time. The application also supports image uploads and different themes.

## Features

- **User Authentication**: Sign up, log in, and log out securely using JSON Web Tokens (JWT).
- **Real-Time Messaging**: Communicate instantly with other users via Socket.io.
- **Image Uploads**: Upload and share images in chats, powered by Cloudinary.
- **User Profiles**: Manage your personal information and customize your profile.
- **Theme Customization**: Choose and apply different themes using DaisyUI.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Services Used

- **Cloudinary**: For image storage and management.
- **Zustand**: For state management on the client side.
- **JWT**: For secure user authentication.
- **DaisyUI**: For pre-built UI components and theming.

## Project Structure

```
chatty/
├── backend/       # Backend code (Express, Socket.io, MongoDB, JWT)
│   ├── src/       # Backend source code
│   ├── .env       # Environment variables for the backend
│   ├── package.json # Backend dependencies
├── frontend/      # Frontend code (React, Vite, Zustand, DaisyUI)
│   ├── dist/      # Production build files
│   ├── public/    # Static assets
│   ├── src/       # Frontend source code
│   ├── package.json # Frontend dependencies
│   ├── vite.config.js # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
├── .gitignore     # Ignored files
├── package.json   # Root dependencies and scripts
├── README.md      # Documentation
```

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/chatty.git
   cd chatty
   ```

2. **Install dependencies**:

   ```bash
   npm run build
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the `backend` directory based on the provided `.env.example` file.
   - Create a `.env` file in the `frontend` directory based on the provided `.env.example` file.

4. **Start the development servers**:

   ```bash
   npm start
   ```

5. **Access the application**:

   Open your browser and navigate to `http://localhost:5173`.

## Usage

1. Sign up for a new account or log in with an existing one.
2. Start chatting in real-time with other users.
3. Upload images, customize your profile, and switch themes.

## Technologies Used

### Frontend

- React
- Vite
- Zustand
- DaisyUI

### Backend

- Express.js
- MongoDB
- Socket.io
- JWT

### Other Tools

- Cloudinary
- Postman (for API testing)
- ESLint and Prettier (for code quality)

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Socket.io](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)
- [DaisyUI](https://daisyui.com/)
- [Cloudinary](https://cloudinary.com/)

