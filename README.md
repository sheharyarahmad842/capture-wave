# Capture Wave

Capture Wave is a social media application inspired by Instagram, built using React.js, Appwrite, Tailwind CSS, TypeScript, and Tanstack Query. It features an infinite scroll for seamless browsing, a user-friendly interface for liking and saving posts, and comprehensive explore and create post functionalities.

## Features

- Infinite scroll for uninterrupted browsing
- Liking and saving posts to keep track of your favorites
- Explore page to discover new content and users
- Create posts to share your thoughts and experiences

## Technologies

- **Frontend**: React.js, Tailwind CSS, TypeScript
- **Backend**: Appwrite
- **State Management**: Tanstack Query

## Installation:

1. Clone the repository:

```bash
   git clone https://github.com/sheharyarahmad842/capture-wave.git
```

2. Navigate to the project directory:

```bash
cd capture-wave
```

3. Install the dependencies:

```bash
npm install
```

4. Create a .env.local file in the root directory and add the following environment variables:

```
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=YOUR_VITE_APPWRITE_PROJECT_ID
VITE_APPWRITE_STORAGE_ID=YOUR_VITE_APPWRITE_STORAGE_ID
VITE_APPWRITE_DATABASE_ID=YOUR_VITE_APPWRITE_DATABASE_ID
VITE_APPWRITE_USER_COLLECTION_ID=YOUR_VITE_APPWRITE_USER_COLLECTION_ID
VITE_APPWRITE_POST_COLLECTION_ID=YOUR_VITE_APPWRITE_POST_COLLECTION_ID
VITE_APPWRITE_SAVES_COLLECTION_ID=YOUR_VITE_APPWRITE_SAVES_COLLECTION_ID
VITE_APPWRITE_FOLLOWERS_COLLECTION_ID=YOUR_VITE_APPWRITE_FOLLOWERS_COLLECTION_ID
```

## Development:

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and visit: http://localhost:5137

## Contributing

We encourage contributions to improve the project. To get started:

- Fork the repository.
- Create a new branch for your feature or fix.
- Make your changes.
- Submit a pull request

## License

This project is licensed under the MIT License.
