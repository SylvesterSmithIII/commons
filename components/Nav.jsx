export default function Nav() {
  return (
    <nav className="fixed top-0 z-50 w-full py-4 text-3xl text-white font-semibold">
      <div className="flex justify-between mx-24">
        <a href="#home" className="flex items-center gap-2">
          <p id="home" className="gray-link opacity-0 translate-y-6">HOME</p>
        </a>

        <ul className="flex flex-col items-end gap-2">
          <li><a className="gray-link nav-link opacity-0 translate-y-6" href="#about">CONTACT</a></li>
          <li><a className="gray-link nav-link opacity-0 translate-y-6" href="#learn">ABOUT</a></li>
          <li><a className="gray-link nav-link opacity-0 translate-y-6" href="#learn">LEARN</a></li>
        </ul>
      </div>
    </nav>
  );
}
