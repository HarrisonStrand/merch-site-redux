import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
// access to redux store and reducer in entry point file
import { createStore } from 'redux';
import reducer from './reducers/item-list-reducer';
// Provider component will give all child components access to the connect() function which is needed to connect to the Redux store
import { Provider } from 'react-redux';

// instantiating the store and passing in reducer
// store constant is a redux store that knows how to handle the actions that are defined in our reducer
const store = createStore(reducer);

//confirms that our updated method in ItemControl is functioning
// we dont normally use subscribe or getState in production but it's great for testing.
// great way to keep an eye on the current state of the store.
store.subscribe(() =>
  console.log(store.getState())
);

ReactDOM.render(
  // App component is now a child of the Provider component.
  // We pass the Redux store in as a prop to Provider.
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
