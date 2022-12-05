// Import Methods
import Auth from '@/api/auth'
import Categories from '@/api/categories'
import Products from '@/api/products'
import History from '@/api/history'

export default {
    install: (app, { firebase }) => {
        const api = {
            auth: Auth(firebase),
            categories: Categories(firebase),
            products: Products(firebase),
            history: History(firebase)
        }
        app.prototype.$api = api
    }
}