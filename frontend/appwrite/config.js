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

  const bucketIdMap = {
    "Image":"imageBucketID",
    "Docs":"docsBucketID"
  }

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

  mapBucketID(bucketName){
    let bucketId =  "";
    if (bucketIdMap.hasOwnProperty(bucketName)) {
        // Fetch the bucket ID from the config object using the mapping
        bucketId = config[bucketIdMap[bucketName]];
    }
    return bucketId;
  }

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.projectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //uploads data to appwrite
async uploadData(
    { collectionName, title, docID, coverImage, status },
    extras
  ) {
    const collectionNames = [
      "Books",
      "Notes",
      "Papers",
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
              author:  extras.author?extras.author:null,
              edition: extras.edition?extras.edition:null,
              cover_page: coverImage,
              course: extras.course,
              imgFileId:extras.imageFileID,
              docFileID:docID
            };
          } else if (collectionName === "Notes") {
            collectionId = config.notesCollectionID;
            data = {
              title:title,
              file:extras.file,
              cover_page:coverImage,
              course:extras.course
            }
          } else if (collectionName === "Papers") {
            data = {
              title:title,
              file:extras.file,
              cover_page:coverImage,
              course:extras.course,
              CATEGORY_CHOICES:extras.category,
              year:extras.year,
              is_approved: false,
              approved_on: null,
            }
            console.log(data.CATEGORY_CHOICES)
            collectionId = config.papersCollectionID;
          } else if (collectionName === "Users") {
            collectionId = config.usersCollectionID;
          } else if (collectionName === "Videos") {
            collectionId = config.videosCollectionID;
            data={
              title:title,
              link:extras.link,
              course:extras.course
              }
            }
    } else {
      throw "Invalid Collection Name";
    }

    try {
      return await this.databases.createDocument(
        config.databaseID,
        collectionId,
        ID.unique(),
        data
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updateDoc(docID,collectionName, { title , is_approved , views }) {
    let collectionID = this.mapCollectionName(collectionName);
    console.log("from config",collectionName,collectionID)
    try {
      return await this.databases.updateDocument(
        config.databaseID,
        collectionID,
        docID,
        {
          is_approved,
          views
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error.message);
    }
  }

  async deleteDoc(docID,collectionName) {
    let collectionID = this.mapCollectionName(collectionName);

    try {
      await this.databases.deleteDocument(
        config.databaseID,
        collectionID,
        docID
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }
 
  //get document data from appwrite
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

  //Lists all the documents in a collection
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
  async uploadFile(bucketName,file) {
    let bucketID = this.mapBucketID(bucketName);
    try {
      return await this.bucket.createFile(
        bucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(imageFileId,docFileId) {
 
    try {
      await this.bucket.deleteFile(config.docsBucketID, docFileId);
      await this.bucket.deleteFile(config.imageBucketID,imageFileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.docsBucketID, fileId);
  }

  getImagePreview(fileId) {
    return this.bucket.getFilePreview(config.imageBucketID, fileId);
  }
  /**
 * This function gets the popular book from database
 * * @param {string} collectionName
 */
  async getPopularDocs(collectionName){
    let collectionId = this.mapCollectionName(collectionName);
    try {
      const res = await this.databases.listDocuments(config.databaseID,collectionId,[Query.greaterThan("views",15)])
      console.log(res)
      return res;
    } catch (error) {
      console.error(error);   
    }
  }
}

const service = new Service();
export default service;
