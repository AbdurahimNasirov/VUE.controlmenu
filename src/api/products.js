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
  async getProductsList(requestData) {
    try {
      const data = await get(
        ref(getDatabase(), `/products/${requestData.category}`)
      );
      return (await data.exists()) ? JSON.parse(data.val()) : [];
    } catch (error) {
      console.log(error);
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
  async createProduct(requestData = {}) {
    try {
      const data = await this.getProductsList(requestData);
      data.push(requestData);
      await set(
        ref(getDatabase(), `/products/${requestData.category}`),
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(error);
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
  async deleteProduct(requestData = {}) {
    try {
      let data = await this.getProductsList(requestData);
      data = await data.filter((item) => item.title !== requestData.title);
      await set(
        ref(getDatabase(), `/products/${requestData.category}`),
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(error);
    }
  },
});
