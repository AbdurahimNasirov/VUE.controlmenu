import { getDatabase, ref, get, set } from "firebase/database";

export default () => ({
  /**
   * Get History orders list
   */
  async getHistoryOrdersList() {
    try {
      const data = await get(ref(getDatabase(), `/history/`));
      return (await data.exists()) ? JSON.parse(data.val()) : [];
    } catch (error) {
      console.log(error);
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
  async createHistoryOrder(requestData = {}) {
    try {
      console.log(requestData);
      const data = await this.getHistoryOrdersList();
      data.push(requestData);
      await set(ref(getDatabase(), `/history/`), JSON.stringify(data));
    } catch (error) {
      console.log(error);
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
  async deleteHistoryOrder(requestData = {}) {
    try {
      let data = await this.getHistoryOrdersList(requestData);
      data = await data.filter((item) => item.time !== requestData.time);
      await set(
        ref(getDatabase(), `/history/${data}`),
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(error);
    }
  },
});
