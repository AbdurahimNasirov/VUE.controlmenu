import { getDatabase, ref, get, set, remove } from "firebase/database";

export default () => ({
  /**
   * Get Categories List
   */
  async getCategoriesList(userUid) {
    try {
      const data = await get(ref(getDatabase(), `users/${userUid}/categories`));
      return (await data.exists()) ? JSON.parse(data.val()) : [];
    } catch (error) {
      return error
    }
  },

  /**
   * Create Category Item
   * 
   * @param {Object} requestData 
   * @param {String} requestData.title 
   * @param {String} requestData.category_name 
   */
  async createCategory(requestData = {}, userUid) {
    try {
      const data = await this.getCategoriesList();
      data.push(requestData);
      await set(ref(getDatabase(), `users/${userUid}/categories/`), JSON.stringify(data));
    } catch (error) {
      return error
    }
  },

  /**
   * Delete Category Item
   * 
   * @param {Object} requestData 
   * @param {String} requestData.title 
   * @param {String} requestData.category_name
   */
  async deleteCategory(requestData = {}, userUid) {
    try {
      let data = await this.getCategoriesList(userUid);
      data = await data.filter(
        (item) => item.category_name !== requestData.category_name
      );
      await set(ref(getDatabase(), `users/${userUid}/categories/`), JSON.stringify(data));
      await remove(
        ref(getDatabase(), `users/${userUid}/products/${requestData.category_name}`)
      );
    } catch (error) {
      return error
    }
  },
});
