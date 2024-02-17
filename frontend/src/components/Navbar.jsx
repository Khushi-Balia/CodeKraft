import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <header className='header'>
    <NavLink to="/" className="w-20 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
        <p className="blue-gradient_text"> CodeRed</p>
    </NavLink>
    <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/about' className={({ isActive }) => isActive ? "text-white" : "text-black" }>
          CodeGen
        </NavLink>
        <NavLink to='/projects' className={({ isActive }) => isActive ? "text-white" : "text-black"}>
          Performance
        </NavLink>
        <NavLink to='/login' className={({ isActive }) => isActive ? "text-white" : "text-black"}>
          Analyze
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar