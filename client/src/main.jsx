import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' 
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './store/auth';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <BrowserRouter>
            <ToastContainer
                position="bottom-left"
                autoClose={3300}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition: flip
                bodyClassName="toastBody"
            />
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </AuthProvider>
)
