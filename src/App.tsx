import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'pages/Home';
import SignInPage from 'pages/SignInPage'
import SignUpPage from 'pages/SignUpPage';
import AdminPage from 'pages/AdminPage';
import FeedsPage from 'pages/FeedsPage';
import PostPage from 'pages/PostPage/PostPage';
import PinnedPage from 'pages/PinnedPage';
import NewsPage from 'pages/NewsPage';
import BoardPage from 'pages/BoardPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<SignInPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/admin' element={<AdminPage/>}/>
          <Route path='/' element={<Home/>}>
            <Route path="/feeds" element={<FeedsPage/>}/>
            <Route path="/news/:id" element={<NewsPage />}/>
            <Route path="/pinned" element={<PinnedPage/>}/>
            <Route path="/board" element={<BoardPage/>}/>
            <Route path="/board/:id" element={<PostPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
