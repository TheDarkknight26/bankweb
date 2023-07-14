import './App.css';
import HomePage from './components/HomePage/Home';
import { finalContext } from './Contexts/finalContext';
import { useState } from 'react';
import{BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Result from './components/result/results';
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";


function App() {
  const [final,setFinal] = useState({
    bankNames:[],
    date:"",
})

const client = new QueryClient();
  return (
    <>
    <QueryClientProvider client={client}>
    <finalContext.Provider value={{final,setFinal}}>
    <Router>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/result" element={<Result/>}/>
    </Routes>
    </Router>
    </finalContext.Provider>
    </QueryClientProvider>
    </>
  );
}

export default App;