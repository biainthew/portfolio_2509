
import {Route, Routes} from "react-router-dom";
import {ProjectDetail} from "./components/ProjectDetail.tsx";
import {Main} from "./components/Main.tsx";
import {NotFound} from "./components/404.tsx";
import {LanguageProvider} from "./contexts/LanguageContext.tsx";
function App() {
    return (
        <LanguageProvider>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </LanguageProvider>
    )
}
 export default App