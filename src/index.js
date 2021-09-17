import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Test from './pages/previewBooks'
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
const appElement = document.getElementById('root');

ReactDOM.render(
        <BrowserRouter>
            <Switch>
                <Switch>
                    <Route path="/home" render={(props) => <App {...props} />} />
                    <Route path="/test" render={(props) => <Test {...props} />} />
                    <Redirect to="/home" />
                    <Redirect from="/" to="/home" />
                </Switch>
            </Switch>
        </BrowserRouter>
    ,appElement

)
