import { Link, useLocation } from "react-router-dom";

const BreadCrumb = ({ product }) => {
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="w-[85%] mx-auto my-10 font-2xl font-semibold flex gap-2">
      <Link to="/" className="text-gray-500 text-xl">
        Home
      </Link>
      {pathNames.length > 0 && <span className="text-gray-500 text-xl">/</span>}

      {pathNames.map((name, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathNames.length - 1;
        // if path == id of products ==> name = product.title
        if (product && name === String(product.id)) {
          name = product.title;
        }

        return isLast ? (
          <span key={index} className="text-xl">
            {name}
          </span>
        ) : (
          <div key={index} className="flex gap-2">
            <Link to={routeTo} className="text-gray-500 text-xl">
              {name}
            </Link>
            <span className="text-gray-500 text-xl">/</span>
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
