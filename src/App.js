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
  return (
    <div className="App">
      <BrowserRouter>
        <AdminNav />
        <Routes>
          <Route path='/' element={<Admin />}/>
          <Route path='/pets' element={<ManagePets />}/>
          <Route path='/adoptions' element={<Adoptions />}/>
          <Route path='/donations' element={<Donations />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/pets/:petId' element={<Eachpet />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
