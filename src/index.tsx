import './index.css'
import App from "./App"
import { BrowserRouter } from 'react-router-dom'
import {createRoot} from "react-dom/client";
import {StrictMode} from "react";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
        </BrowserRouter>
    </StrictMode>,
)