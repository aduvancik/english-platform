import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center px-48 py-4 bg-white drop-shadow-[0px_-3px_6px_rgba(0,0,0,0.15)] ">
      <Logo />
      <div className="text-gray-500 hover:text-violet-800 transition duration-300 ease-in-out">
        <p></p>
        <a href="https://www.instagram.com/">Написати нам</a>
      </div>
    </footer>
  );
};

export default Footer;
