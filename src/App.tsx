import { Toaster } from 'react-hot-toast';
import { Navbar } from '@/components/layout/Navbar';
import { StatusBar } from '@/components/layout/StatusBar';
import { MapPage } from '@/pages/MapPage';

export default function App() {
  return (
    <div className="flex flex-col" style={{ height: '100dvh', width: '100vw', overflow: 'hidden', background: 'var(--bg-app)' }}>
      <Navbar />
      <MapPage />
      <StatusBar />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-surface)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            fontSize: 13,
            borderRadius: 10,
          },
        }}
      />
    </div>
  );
}
