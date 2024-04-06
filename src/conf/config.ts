const config = {
  appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
  appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  appwriteDriverCollectionId: String(
    process.env.NEXT_PUBLIC_APPWRITE_DRIVER_COLLECTION_ID
  ),
};

export default config;
