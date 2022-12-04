import { getDatabase, ref, get, set, remove } from "firebase/database";

export default () => ({
  /**
   * Get Categories List
   */
  async getCategoriesList() {
    try {
      const data = await get(ref(getDatabase(), "/categories"));
      return (await data.exists()) ? JSON.parse(data.val()) : [];
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Create Category Item
   * 
   * @param {Object} requestData 
   * @param {String} requestData.title 
   * @param {String} requestData.category_name 
   */
  async createCategory(requestData = {}) {
    try {
      const data = await this.getCategoriesList();
      data.push(requestData);
      await set(ref(getDatabase(), "/categories/"), JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Delete Category Item
   * 
   * @param {Object} requestData 
   * @param {String} requestData.title 
   * @param {String} requestData.category_name
   */
  async deleteCategory(requestData = {}) {
    try {
      let data = await this.getCategoriesList();
      data = await data.filter(
        (item) => item.category_name !== requestData.category_name
      );
      await set(ref(getDatabase(), "/categories/"), JSON.stringify(data));
      await remove(
        ref(getDatabase(), `/products/${requestData.category_name}`)
      );
    } catch (error) {
      console.log(error);
    }
  },
});
