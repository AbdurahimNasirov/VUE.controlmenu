import { getDatabase, ref, get, set } from "firebase/database";

export default () => ({
  /**
   * Get Products List
   *
   * @param {Object} requestData
   * @param {String} requestData.title
   * @param {Number} requestData.price
   * @param {String} requestData.category
   */
  async getProductsList(requestData, userUid) {
    try {
      const data = await get(
        ref(getDatabase(), `users/${userUid}/products/${requestData.category}`)
      );
      return (await data.exists()) ? JSON.parse(data.val()) : [];
    } catch (error) {
      return error
    }
  },

  /**
   * Create Product Item
   *
   * @param {Object} requestData
   * @param {String} requestData.title
   * @param {Number} requestData.price
   * @param {String} requestData.category
   */
  async createProduct(requestData = {}, userUid) {
    try {
      const data = await this.getProductsList(requestData, userUid);
      data.push(requestData);
      await set(
        ref(getDatabase(), `users/${userUid}/products/${requestData.category}`),
        JSON.stringify(data)
      );
    } catch (error) {
      return error
    }
  },

  /**
   * Delete Product Item
   *
   * @param {Object} requestData
   * @param {String} requestData.title
   * @param {Number} requestData.price
   * @param {String} requestData.category
   */
  async deleteProduct(requestData = {}, userUid) {
    try {
      let data = await this.getProductsList(requestData, userUid);
      data = await data.filter((item) => item.title !== requestData.title);
      await set(
        ref(getDatabase(), `users/${userUid}/products/${requestData.category}`),
        JSON.stringify(data)
      );
    } catch (error) {
      return error
    }
  },
});
