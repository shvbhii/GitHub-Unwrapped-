

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import SocialLink from './SocialLink';

export default function Footer() {
  
  const GITHUB_URL = "https://github.com/shvbhii/GitHub-Unwrapped-.git";
  const LINKEDIN_URL = "https://linkedin.com/in/shvbhi";
 

  return (
    <footer className="w-full max-w-4xl text-center text-gray-500 py-8 mt-6">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-4">
        <SocialLink 
          Icon={FaGithub} 
          href={GITHUB_URL} 
          text="View Source on GitHub" 
        />
        <SocialLink
          Icon={FaLinkedin}
          href={LINKEDIN_URL}
          text="Connect via LinkedIn"
        />
      </div>
      <p>Made by Shubhi Sharma</p>
    </footer>
  );
}