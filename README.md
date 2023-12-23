# QuizQr

### Project Overview

This application, built using React (Vite) and TypeScript for the front end and Express (TypeScript) for the server, is designed to facilitate quiz creation, access, and management. It allows admins to create quizzes securely and users to access and take those quizzes by scanning QR codes.
### Features 
1. **Admin Authentication** :
Secure authentication system allowing authorized users to create quizzes. 
2. **Quiz Creation (Admin)** :
Admins can create quizzes by adding questions and multiple-choice answers. 
3. **QR Code Generation (Admin)** :
Unique QR code generation for each created quiz. 
4. **Quiz Access (User)** :
Users can access quizzes by scanning the QR code. 
5. **Quiz Taking (User)** :
Users can take quizzes with instant feedback on correct and incorrect answers. 
6. **Score Tracking** :
Tracking and displaying quiz scores for each user upon completion. 
7. **Customization** :
Admins can customize quiz appearance with different themes and styles. 
9. **Scoreboard** :
Implementation of scoreboard showcasing top scorers for each quiz.

### Technologies Used 
- **Frontend:** 
  - React
  - Vite
  - TypeScript
  - Tailwind CSS 
- **Backend:** 
  - Express
  - TypeScript


### Project Structure 
- **Frontend:**  
- `public/` - Contains public assets for the website. 
- `src/` - Main source code folder. 
- `src/assets/` - Contains private assets for the react app. 
- `src/components/` - Contains reusable UI components. 
- `src/pages/` - Views and pages of routing. 
- `src/style/` - Css files for element styling. 
- `src/types/` - Types used in the app. 
- `src/utils/` - Utility functions.
- **Backend:**  
- `data/` - Used to store data as json files & qr code images.
- `middlewares/` - Defines middleware functions.
- `routes/` - Defines API endpoints.
- `types/` - Types used in the app. 
- `utils/` - Utility functions.

### Project Setup Instructions
#### Frontend Setup: 
1. **Clone Repository:** 
- Clone the repository containing the project:
  ```bash
  git clone https://github.com/imadfen/QuizQr.git
  ```
  
2. **Environment Setup:**  
- Navigate to the `client` directory.
- Create the `.env`. 
- Add the `VITE_SERVER_URL` variable to match the server's URL:
```makefile
VITE_SERVER_URL="http://localhost:3000"
```

- Run `npm install` to install frontend dependencies. 
3. **Starting the Frontend:**  
- Run `npm run dev` to start the frontend development server using Vite.


#### Backend Setup: 
1. **Navigate to Backend:**  
- Go to the `server` directory. 
2. **Environment Setup:**  
- Create a `.env` file. 
- Add the following environment variables:
```makefile
SECRET_KEY=9hLpZ3GqA5FtW7sYuRNd2PvVbE6cXxJyIrMlCw4aTkf1eQoOBiSjnKgD8Hz0m
CLIENT_URL=http://localhost:5173
PORT=3000
``` 
- Modify variables as needed. `SECRET_KEY` is for securing sensitive data, `CLIENT_URL` specifies the frontend URL, and `PORT` defines the server port. 
3. **Installing Backend Dependencies:**  
- Run `npm install` to install backend dependencies. 
4. **Starting the Backend:**  
- Run `npm run dev` to start the Express server.

### Usage 
- Access the frontend development server at `http://localhost:5173`. 
- Admins can log in, create quizzes, customize appearance, and manage quizzes at `http://localhost:5173`.
- Users can scan QR codes to access quizzes, take quizzes, and view scores upon completion.

### Notes
- Ensure both frontend and backend servers are running concurrently for seamless interaction. 
- Modify environment variables in the `.env` files as per your requirements, especially if deploying to different environments.

This setup guide helps configure the project environment, set necessary variables, and initiate the frontend and backend servers for smooth application functionality.


### Conclusion

This documentation provides an overview of the quiz application, outlining its features, technologies used, project structure, setup instructions, and usage guidelines for admins and users.
