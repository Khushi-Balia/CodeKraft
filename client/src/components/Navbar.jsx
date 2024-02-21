import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header">
      <NavLink
        to="/"
        className="w-20 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"
      >
        <p className="blue-gradient_text"> Home</p>
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/codegen"
          className={({ isActive }) =>
            isActive ? "text-blue-300" : "text-black"
          }
        >
          CodeGen
        </NavLink>
        <NavLink
          to="/analyze"
          className={({ isActive }) =>
            isActive ? "text-blue-300" : "text-black"
          }
        >
          Analyze
        </NavLink>
        <NavLink
          to="/validate"
          className={({ isActive }) =>
            isActive ? "text-blue-300" : "text-black"
          }
        >
          Validate
        </NavLink>
        
      </nav>
    </header>
  );
};

export default Navbar;
