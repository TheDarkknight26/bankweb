import './App.css';
import HomePage from './components/HomePage/Home';
import { finalContext } from './Contexts/finalContext';
import { useState } from 'react';
import{BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Result from './components/result/results';
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import Fddata from './components/FDdata/fddata.jsx';
import AboutUsPage from './components/AboutUs/About.js';

function App() {
  const [final,setFinal] = useState({
    bankNames:[],
    date:"",
})
const [flexmonth,setFlexmonth] = useState({
  mindate:"",
  maxdate:"",

});

const client = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
    },
  },
});
  return (
    <>
    <QueryClientProvider client={client}>
    <finalContext.Provider value={{final,setFinal,flexmonth,setFlexmonth}}>
    <Router>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/result" element={<Result/>}/>
    <Route path="/fddata" element={<Fddata/>}/>
    <Route path='/about' element={<AboutUsPage/>}/>
    </Routes>
    </Router>
    </finalContext.Provider>
    </QueryClientProvider>
    </>
  );
}

export default App;
