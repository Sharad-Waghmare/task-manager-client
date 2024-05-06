import { legacy_createStore as createStore , applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./redux/rootReducer";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));

export default store;