import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center px-6 sm:px-48 py-4 bg-white drop-shadow-[0px_-3px_6px_rgba(0,0,0,0.15)]">
      <Logo />
      <div className="text-gray-500 hover:text-violet-800 transition duration-300 ease-in-out text-center sm:text-left mt-4 sm:mt-0">
        <a href="https://www.instagram.com/" className="block">
          Написати нам
        </a>
      </div>
    </footer>
  );
};

export default Footer;