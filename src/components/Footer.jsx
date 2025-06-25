import React from 'react';

const SocialLink = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
        {children}
    </a>
);

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-400">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <p className="font-semibold text-slate-200 text-lg">Heart Rate Anomaly Detection</p>
          <p className="mt-2 text-sm">An academic research project by Chawin Hansasuta, Chulalongkorn University.</p>
        </div>
        <div className="mt-6 flex justify-center space-x-6">
            <SocialLink href="https://www.linkedin.com/in/chawin-hansasuta/">LinkedIn</SocialLink>
            <SocialLink href="https://chawin.netlify.app/">Personal Site</SocialLink>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}