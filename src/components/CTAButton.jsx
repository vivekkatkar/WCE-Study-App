import { Link } from "react-router-dom";

const CTAButton = ({ children, active, linkTo }) => {
  return (
    <div>
      <Link to={linkTo}>
        <div className="text-center text-[13px] px-6 py-3 rounded font-bold text-white">
          {children}
        </div>
      </Link>
    </div>
  );
};

export default CTAButton;
