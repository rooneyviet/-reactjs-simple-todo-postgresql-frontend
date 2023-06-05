import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import routes from "./routes/routes";
import PageWrapper from './components/PageWrapper';
function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout/>}>
            {routes.map((route, index) => (
                  route.index ? (
                    <Route 
                      index
                      key={index}
                      element={route.state ? (
                        <PageWrapper states={route.state} children={route.element}/>
                      ) : route.element}
                    />
                  ) : (
                    <Route 
                        path={route.path}
                        key={index}
                        element={route.state ? (
                          <PageWrapper states={route.state} children={route.element}/>
                        ) : route.element}
                        />
                  )
                ))}
                
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
