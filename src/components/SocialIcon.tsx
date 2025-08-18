import React from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone,
  ExternalLink 
} from 'lucide-react';

interface SocialIconProps {
  icon: string;
  className?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, className = "w-6 h-6" }) => {
  const IconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail,
    phone: Phone,
    default: ExternalLink,
  };

  const IconComponent = IconMap[icon as keyof typeof IconMap] || IconMap.default;

  return <IconComponent className={className} />;
};

export default SocialIcon;
