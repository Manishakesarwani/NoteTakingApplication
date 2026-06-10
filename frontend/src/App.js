import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { useUserAuthenticateContext } from './hooks/useUserAuthenticateContext';
import AuthenticationPage from "./pages/AuthenticationPage";
import SetNewPassword from "./pages/SetNewPassword";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import UpdateNotes from './pages/UpdateNotes';

function App() {

  const {user} = useUserAuthenticateContext();

  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to="/authenticate" />}></Route>
          <Route path="/authenticate" element={!user ? <AuthenticationPage /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={!user ? <SetNewPassword /> : <Navigate to="/" />} />
          <Route path='/update/:nid' element={user ? <UpdateNotes /> : <Navigate to="/authenticate" />}/>
        </Routes>
        <Footer />
      </BrowserRouter> 
      <ToastContainer position='top-center' autoClose={3000} />
    </div>
  );
}

export default App;
