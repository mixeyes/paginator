import './App.css';
import { UniProvider } from './context/uniContext';
import { UniPage } from './pages/UniPage';

export const App = () => (
  <UniProvider>
    <UniPage />
  </UniProvider>
);
