import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center my-8">
      <p>
        &copy; {new Date().getFullYear()} Event Tickets App. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
