import Link from "next/link";
import SignIn from "./SignInButton";

const Header = () => {
  return (
    <header className="bg-slate-500 shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="ml-2 text-xl font-semibold text-white">LGS Blogs</h1>
        </Link>

        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                href="/"
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blog/create"
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                Create
              </Link>
            </li>
            <SignIn />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
