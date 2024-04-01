const config = {
  appwriteUrl: String(process.env.VITE_APPWRITE_URL),
  projectID: String(process.env.VITE_APPWRITE_PROJECT_ID),
  databaseID: String(process.env.VITE_APPWRITE_DATABASE_ID),
  bucketID: String(process.env.VITE_APPWRITE_BUCKET_ID),
  booksCollectionID: String(process.env.VITE_APPWRITE_BOOKS_COLLECTION_ID),
  CourseCollectionID: String(process.env.VITE_APPWRITE_COURSE_COLLECTION_ID),
  NotesCollectionID: String(process.env.VITE_APPWRITE_NOTES_COLLECTION_ID),
  PapersCollectionID: String(process.env.VITE_APPWRITE_PAPERS_COLLECTION_ID),
  UsersCollectionID: String(process.env.VITE_APPWRITE_USERS_COLLECTION_ID),
  VideosCollectionID: String(process.env.VITE_APPWRITE_VIDEOS_COLLECTION_ID),
};

export default config;