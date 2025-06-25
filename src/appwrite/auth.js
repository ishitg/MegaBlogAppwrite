import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// code improvement

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    // this is preventing vendor lockin
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // call another method like if the acc creation is successfull then we'll log them in
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount :: error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      await this.account.createEmailPasswordSession(email, password);
      return true;
    } catch (error) {
      console.log("Appwrite service :: login :: error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const data = await this.account.get();
      // console.log("data", data);
      return data;
    } catch (error) {
      if (error.message.includes("missing scope (account)")) {
        return null;
      }
      console.error("Appwrite service :: getCurrentUser :: error", error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error ", error);
    }
  }
}

const authService = new AuthService();
export default authService;

// so that user doesnt have to manually create an object and an apply methods on the go
