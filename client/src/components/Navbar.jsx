import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
      <NavLink to="/" className="flex items-center justify-center font-bold">
        <img
          src="https://res.cloudinary.com/dyxnmjtrg/image/upload/v1709061376/c22-removebg-preview_aidim6.png"
          width="170px"
          height="32px"
          className="mr-2"
        />{" "}
        {/* Codekraft */}
      </NavLink>

      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-300 underline" : "text-black"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/codegen"
          className={({ isActive }) =>
            isActive ? "text-blue-300 underline" : "text-black"
          }
        >
          CodeGen
        </NavLink>
        <NavLink
          to="/analyze"
          className={({ isActive }) =>
            isActive ? "text-blue-300 underline" : "text-black"
          }
        >
          Analyze
        </NavLink>
        <NavLink
          to="/validate"
          className={({ isActive }) =>
            isActive ? "text-blue-300 underline" : "text-black"
          }
        >
          Validate
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
