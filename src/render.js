import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {addPost, updatePostText} from "./Redux/state";


export let rerenderTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addPost={addPost} updatePostText={updatePostText}/>
        </React.StrictMode>,
        document.getElementById('root')
    );

}