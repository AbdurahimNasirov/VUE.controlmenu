import { getDatabase, ref, set, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "firebase/auth";
export default () => ({
  /**
   * Login User
   */
  async login(requestData) {
    try {
      await signInWithEmailAndPassword(
        getAuth(),
        requestData.email,
        requestData.password
      );
    } catch (error) {
      return error
    }
  },

  /**
   * Register User
   *
   * @param {Object} requestData
   * @param {String} requestData.name
   * @param {String} requestData.password
   * @param {String} requestData.email
   */
  async register(requestData = {}) {
    try {
      await createUserWithEmailAndPassword(
          getAuth(),
          requestData.email,
          requestData.password
        );
      await this.craeteUser(requestData)
    } catch (error) {
      return error
    }
  },

  /**
   * Craete User
   *
   * @param {Object} requestData
   * @param {String} requestData.name
   * @param {String} requestData.password
   * @param {String} requestData.email
   */
  async craeteUser(requestData = {}) {
    try {
      await set(ref(getDatabase(), `/users/${this.getUid()}/info`), requestData)
    } catch (error) {
      return error
    }
  },
  
  /**
   * Get User
   *
   * @param {Object} requestData
   * @param {String} requestData.name
   * @param {String} requestData.password
   * @param {String} requestData.email
   */
  async getUser(userUid) {
    try {
      const data = await get(ref(getDatabase(), `/users/${userUid}/info`))
      return (await data.exists()) ? data.val() : {};

    } catch (error) {
      return error
    }
  },
  
  /**
   * Sign out
   */
  async signOut() {
    try {
      await signOut(getAuth())
    } catch (error) {
      return error
    }
  },

  getUid() {
    return getAuth().currentUser ? getAuth().currentUser.uid : ''
  }
});
