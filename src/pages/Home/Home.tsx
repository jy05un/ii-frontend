import React from 'react';
import { Outlet } from 'react-router';

export default function Home() {
  return (
    <div className="Home">
      <Outlet />
    </div>
  );
}
