import { AppBar } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <header>
      <AppBar />
      <main>
        <Outlet />
      </main>
    </header>
  );
}
