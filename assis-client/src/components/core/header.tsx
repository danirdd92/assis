import { Link } from "react-router-dom";

export const Header = () => (
  <header className="flex justify-between items-center p-4 w-full h-12">
    <div>
      <Link className="link" to="/">
        Logo
      </Link>
    </div>
    <nav>
      <ul className="flex items-center justify-between gap-4">
        <li>
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="/signin">
            Signin
          </Link>
        </li>
        <li>
          <Link className="link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);
