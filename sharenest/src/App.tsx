import type React from 'react';
import { createContext, useContext, useState } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
// Page imports (placeholders)
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ListingList from './pages/ListingList';
import ListingForm from './pages/ListingForm';
import ListingDetail from './pages/ListingDetail';
import SearchPage from './pages/SearchPage';
import BookingPage from './pages/BookingPage';
import ChatPage from './pages/ChatPage';
import ReviewsPage from './pages/ReviewsPage';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer/Footer';

// Authentication context
const AuthContext = createContext<any>(null);
export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(() => {
    // For demo, keep user signed in by sessionStorage (useEffect not needed for simple version)
    try {
      return JSON.parse(window.sessionStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  });
  const login = (userObj: any) => {
    setUser(userObj);
    window.sessionStorage.setItem('user', JSON.stringify(userObj));
  };
  const logout = () => {
    setUser(null);
    window.sessionStorage.removeItem('user');
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
// HOC to require authentication on private pages
function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Updated Navbar
function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav style={{ background: '#910A67', color: '#fff', padding: '1rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <Link to="/" style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '2px', color: '#fff', textDecoration: 'none' }}>
        ShareNest
      </Link>
      <Link to="/listings" style={{ color: '#fff', textDecoration: 'none' }}>Browse</Link>
      <Link to="/search" style={{ color: '#fff', textDecoration: 'none' }}>Search</Link>
      {user && <Link to="/listings/new" style={{ color: '#fff', textDecoration: 'none' }}>Lend/Donate</Link>}
      {user && <Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>}
      {user && <Link to="/chat" style={{ color: '#fff', textDecoration: 'none' }}>Chat</Link>}
      {user && <Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Admin</Link>}
      <div style={{ marginLeft: 'auto' }}>
        {!user && <Link to="/login" style={{ color: '#fff', textDecoration: 'none', marginRight: '1rem' }}>Login</Link>}
        {!user && <Link to="/signup" style={{ color: '#fff', textDecoration: 'none' }}>Sign up</Link>}
        {user && <button onClick={logout} style={{ color: '#fff', background: 'transparent', border: 'none', marginLeft: '2rem', fontWeight: 600, cursor: 'pointer' }}>Logout</button>}
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#030637' }}>
        <Navbar />
        <main style={{ flex: 1, padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Protected routes */}
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/listings" element={<ListingList />} />
            <Route path="/listings/new" element={<RequireAuth><ListingForm /></RequireAuth>} />
            <Route path="/listings/:id" element={<ListingDetail />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/booking" element={<RequireAuth><BookingPage /></RequireAuth>} />
            <Route path="/chat" element={<RequireAuth><ChatPage /></RequireAuth>} />
            <Route path="/reviews" element={<RequireAuth><ReviewsPage /></RequireAuth>} />
            <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
