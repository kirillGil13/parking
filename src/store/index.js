import {createStore} from 'vuex'


const store = createStore({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        packageVersion: process.env.PACKAGE_VERSION
    },
    getters: {
        appVersion: state => {
            return state.packageVersion;
        }
    },
});
export default store;