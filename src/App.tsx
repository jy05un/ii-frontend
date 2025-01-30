import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from 'pages/Home';
import SignInPage from 'pages/SignInPage'
import SignUpPage from 'pages/SignUpPage';
import AdminPage from 'pages/AdminPage';
import FeedsPage from 'pages/FeedsPage';
import PostPage from 'pages/PostPage/PostPage';
import PinnedPage from 'pages/PinnedPage';
import NewsPage from 'pages/NewsPage';
import BoardPage from 'pages/BoardPage';
import ProfilePage from 'pages/ProfilePage';

function App() {
  const preloadImage = (url: string) => {
    const img = new Image();
    img.src = url;
  };
  preloadImage("/public/icon/instagram_white.svg");
  preloadImage("/public/icon/instagram.svg");


  return (
    <div id='app-root'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<SignInPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/admin' element={<AdminPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/> 
          <Route path='/profile/:id' element={<ProfilePage/>}/> 
          <Route path='/' element={<Home/>}>
            <Route path="/feeds" element={<FeedsPage/>}/>
            <Route path="/news/:id" element={<NewsPage />}/>
            <Route path="/pinned" element={<PinnedPage/>}/>
            <Route path="/board" element={<BoardPage/>}/>
            <Route path="/board/:id" element={<PostPage/>}/>
            <Route index element={<Navigate to="/feeds" replace/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/feeds" replace/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
