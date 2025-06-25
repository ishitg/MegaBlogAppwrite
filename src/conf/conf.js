const conf = {
  appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteDevKey: String(import.meta.env.VITE_APPWRITE_DEV_KEY),
  appwriteAPIkey: String(import.meta.env.VITE_APPWRITE_API_KEY),
  tinyMCEapiKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
};

export default conf;
