import { Link } from 'react-router-dom';

const NavLink = ({ label, route, type }) => {
  return (
    <li>
      <Link to={route}>
        <span
          className={`block py-2 pr-4 pl-3 ${
            type === 'dropdown' ? 'text-[#FFFFFF]' : 'text-[#F5F5F5]'
          } rounded bg-transparent md:p-0`}
          aria-current="page"
          style={{
            textTransform: 'capitalize',
          }}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};

export default NavLink;
