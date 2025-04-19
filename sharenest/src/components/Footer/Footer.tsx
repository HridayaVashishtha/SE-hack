import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: '#3C0753', color: '#fff', padding: '1rem', textAlign: 'center' }}>
      ShareNest © {new Date().getFullYear()}
    </footer>
  );
}

// Assuming the App component is defined here as well
function App() {
  return (
    <div>
      {/* Other components and content */}
      <Footer />
    </div>
  );
}
