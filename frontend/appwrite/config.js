import config from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

const collectionIdMap = {
    "Books": "booksCollectionID",
    "Course": "courseCollectionID",
    "Notes": "notesCollectionID",
    "Papers": "papersCollectionID",
    "Users": "usersCollectionID",
    "Videos": "videosCollectionID"
  };

export class Service {
  client = new Client();
  databases;
  bucket;

 
  mapCollectionName(collectionName){
    let collectionId =  "";
    if (collectionIdMap.hasOwnProperty(collectionName)) {
        // Fetch the collection ID from the config object using the mapping
        collectionId = config[collectionIdMap[collectionName]];
    }
    return collectionId;
  }

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.projectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async uploadData(
    { collectionName, title, docID, coverImage, status },
    extras
  ) {
    const collectionNames = [
      "Books",
      "Course",
      "Notes",
      "Papers",
      "Users",
      "Videos",
    ];
    let collectionId = "";
    let data = {};

    if (collectionNames.includes(collectionName)) {
        if (collectionName === "Books") {
            collectionId = config.booksCollectionID;
            data = {
              title: title,
              file: extras.file,
              is_approved: status,
              approved_on: null,
              author: null,
              edition: null,
              cover_page: coverImage,
              course: extras.course,
            };
          } else if (collectionName === "Course") {
            collectionId = config.courseCollectionID;
          } else if (collectionName === "Notes") {
            collectionId = config.notesCollectionID;
          } else if (collectionName === "Papers") {
            collectionId = config.papersCollectionID;
          } else if (collectionName === "Users") {
            collectionId = config.usersCollectionID;
          } else if (collectionName === "Videos") {
            collectionId = config.videosCollectionID;
          }
    } else {
      throw "Invalid Collection Name";
    }

    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        collectionId,
        docID,
        data
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(docID, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        docID,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(docID) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        docID
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getData(docID,collectionName) {
    const collectionId = this.mapCollectionName(collectionName);
    try {
      return await this.databases.getDocument(
        config.databaseID,  
        collectionId,
        docID
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getAllDocs(collectionName,queries) {
    const collectionId = this.mapCollectionName(collectionName);

    try {
      return await this.databases.listDocuments(
        config.databaseID,
        collectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
