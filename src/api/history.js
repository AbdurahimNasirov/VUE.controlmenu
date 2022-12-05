import { getDatabase, ref, get, set } from "firebase/database";

export default () => ({
  /**
   * Get History orders list
   */
  async getHistoryOrdersList(userUid) {
    try {
      const data = await get(ref(getDatabase(), `users/${userUid}/history/`));
      return (await data.exists()) ? JSON.parse(data.val()) : [];
    } catch (error) {
      return error
    }
  },

  /**
   * Create Category Item
   * 
   * @param {Object} requestData 
   * @param {String} requestData.time
   * @param {Number} requestData.totalPrice
   * @param {Array} requestData.ordersList
   */
  async createHistoryOrder(requestData = {}, userUid) {
    try {
      console.log(requestData);
      const data = await this.getHistoryOrdersList();
      data.push(requestData);
      await set(ref(getDatabase(), `users/${userUid}/history/`), JSON.stringify(data));
    } catch (error) {
      return error
    }
  },

 /**
   * Delete Category Item
   * 
   * @param {Object} requestData 
   * @param {String} requestData.time
   * @param {Number} requestData.totalPrice
   * @param {Array} requestData.ordersList
   */
  async deleteHistoryOrder(requestData = {}, userUid) {
    try {
      let data = await this.getHistoryOrdersList(requestData, userUid);
      data = await data.filter((item) => item.time !== requestData.time);
      await set(
        ref(getDatabase(), `users/${userUid}/history/${data}`),
        JSON.stringify(data)
      );
    } catch (error) {
      return error
    }
  },
});
