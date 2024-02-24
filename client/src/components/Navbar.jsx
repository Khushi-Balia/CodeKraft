import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
      <NavLink
        to="/"
        className="w-20 h-10 rounded-lg items-center justify-center flex font-bold"
      >
        
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
      <NavLink
        to="/" className={({ isActive }) =>
        isActive ? "text-blue-300 underline" : "text-black"
      }>Home</NavLink>
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
