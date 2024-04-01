import config from "../conf/conf";
import { Client, Account , ID } from "appwrite";


export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client 
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('660579aadb0cea1edae6');
        this.account = new Account(this.client)
        console.log("constructor called")
    }

    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //call another method4
                return this.login({email,password})
            } else {
                return userAccount; 
            }
        }catch(error){
            throw error;
        }

      
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()       
        } catch (error) {
            console.log("appwrite service error :: getCurrentUser :: error",error)
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("appwrite service errot :: logout :: error",error)
        }
    }

};

const authService = new AuthService();

export default authService; 