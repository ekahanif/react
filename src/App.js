import logo from './logo.svg';
import './App.css';
import Customers from './pages/Customers';
import { Route, Routes } from 'react-router-dom';
import Detail from './pages/Detail';
import Edit from './pages/Edit';

function App() {
  return (
   <>
<Routes>
  <Route path="/" element={<Customers />} />
  <Route path="/detail/:userId" element={<Detail />} />
  <Route path="/edit/:userId" element={<Edit />} />
</Routes>
   </>
  );
}

export default App;
