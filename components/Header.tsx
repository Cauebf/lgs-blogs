import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-slate-500 shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="ml-2 text-xl font-semibold text-white">LGS Blogs</h1>
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/create" className="text-white">
                Create New Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
