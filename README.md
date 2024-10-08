
# Barkeep App

Barkeep is a cocktail recipe app that allows users to search for recipes, track available ingredients, and get recommendations for drinks they can make. The project is divided into two main components: the frontend and the backend.

## Project Structure

```
/barkeep
│
├── barkeep-frontend   # Frontend code (React app)
├── barkeep-backend    # Backend code (Express/Node.js app)
└── README.md          # Project documentation
```

## Getting Started

To run this project locally, you'll need to set up both the frontend and backend. Below are instructions for setting up each component.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (if using a local database)

---

## Barkeep Backend

The backend is built with Node.js and Express, and it interacts with a PostgreSQL database.

### Setup Instructions

1. Navigate to the backend directory:

   ```bash
   cd barkeep-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the `barkeep-backend` directory. Add the following variables:

   ```bash
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   PORT=4000
   ```

4. Run the backend server:

   ```bash
   npm start
   ```

   The backend should now be running on `http://localhost:4000`.

---

## Barkeep Frontend

The frontend is built with React and styled using Material-UI and Tailwind CSS.

### Setup Instructions

1. Navigate to the frontend directory:

   ```bash
   cd barkeep-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the `barkeep-frontend` directory. Add the following:

   ```bash
   REACT_APP_API_URL=http://localhost:4000
   ```

4. Run the frontend development server:

   ```bash
   npm start
   ```

   The frontend should now be running on `http://localhost:3000`.

---

## Database Setup

The backend requires a PostgreSQL database. If you're using a local database, follow these steps to set it up:

1. Create a PostgreSQL database.
2. Update the `DATABASE_URL` in the backend `.env` file to point to your database.
3. Run migrations (if applicable) to set up the necessary tables.

---

## Future Enhancements

- [ ] Add a chatbot feature for drink recommendations
- [ ] Add user authentication and profile management
- [ ] Implement a rating system for cocktails
- [ ] Expand the ingredient tracking feature

---

## Contributing

If you'd like to contribute to Barkeep, please follow the steps below:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add a new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

