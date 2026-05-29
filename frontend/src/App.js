import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/' element={<Home />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter> 
    </div>
  );
}

export default App;
