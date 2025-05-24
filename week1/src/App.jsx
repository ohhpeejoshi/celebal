//Fields required: First Name, Last Name, Username, E-mail, password (show/hide), PhoneNo. (country code ____ number), country (dropdown), city (dropdown), Pan No. & Aadhar No.

import FormPage from "./pages/FormPage.jsx"
import SuccessPage from "./pages/SuccessPage.jsx"
import { Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<FormPage />} />
                <Route path="/success" element={<SuccessPage />} />
            </Routes>
        </>
    )
}

export default App;
