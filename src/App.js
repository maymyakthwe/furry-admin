import './App.css';
import AdminNav from './Components/Nav/AdminNav';
import Admin from './Pages/Admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManagePets from './Pages/ManagePets';
import Footer from './Components/Footer/Footer';
import Eachpet from './Components/EachPet/Eachpet';
import Adoptions from './Pages/Adoptions';
import Donations from './Pages/Donations';
import Signup from './Components/SignUp/Signup';
import Login from './Components/Login/Login';


function App() {

  const token = localStorage.getItem('auth-token');

  return (
    <div className="App">
      <BrowserRouter>
        <AdminNav />
        <Routes>
          <Route path='/home' element={token ? <Admin /> : <Login /> }/>
          <Route path='/pets' element={token? < ManagePets /> :<Login/>}/>
          <Route path='/adoptions' element={token ? <Adoptions /> : <Login />}/>
          <Route path='/donations' element={token ? <Donations /> : <Login />}/>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/pets/:petId' element={token ? <Eachpet /> : <Login />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
