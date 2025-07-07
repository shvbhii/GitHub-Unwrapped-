
export default function SocialLink({ Icon, href, text }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
    >
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </a>
  );
}