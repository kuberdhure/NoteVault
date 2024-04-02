const config = {
  appwriteUrl: process.env.NEXT_PUBLIC_APPWRITE_URL,
  projectID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  databaseID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  bucketID: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
  booksCollectionID: process.env.NEXT_PUBLIC_APPWRITE_BOOKS_COLLECTION_ID,
  courseCollectionID: process.env.NEXT_PUBLIC_APPWRITE_COURSE_COLLECTION_ID,
  notesCollectionID: process.env.NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID,
  papersCollectionID: process.env.NEXT_PUBLIC_APPWRITE_PAPERS_COLLECTION_ID,
  usersCollectionID: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
  videosCollectionID: process.env.NEXT_PUBLIC_APPWRITE_VIDEOS_COLLECTION_ID,
};

export default config;