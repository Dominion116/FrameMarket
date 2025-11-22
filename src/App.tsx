import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import MainLayout from './components/layout/MainLayout';
import { AppKitProvider } from './lib/appkit-config';

const App = () => {
  return (
    <AppKitProvider>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/nft/:id" element={<MainLayout />} />
        <Route path="/collection/:id" element={<MainLayout />} />
        <Route path="/profile" element={<MainLayout />} />
      </Routes>
      <Toaster />
    </AppKitProvider>
  );
};

export default App;