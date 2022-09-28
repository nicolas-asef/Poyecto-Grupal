import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Form,Home,LandingPage,NavBar,Footer } from './components'
import Worker from './components/Worker/Worker';

function App() {
  return (
    <div>
      <NavBar/>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/home' element={<Home />} />
      <Route path = '/worker/:id' element = {<Worker/>}/>
      <Route path='/users/login' element={ <Form /> }/>
      <Route path='/users/register' element={ <Form /> }/>
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;
