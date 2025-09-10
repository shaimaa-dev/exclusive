import { Link, useLocation } from "react-router-dom"

const BreadCrumb = () => {
    const location = useLocation();
    const pathNames = location.pathname.split("/").filter(x => x);
    const showingSlash = (name) => {
        return pathNames.length <= 1 ? <div className="flex gap-2"><span> /</span > <span>{name}</span></div> : <span>{name}</span>
    }
    return (
        <div className="w-[85%] mx-auto font-2xl font-semibold flex gap-3">
            <Link to={"/"}>Home</Link>
            {pathNames.map((name, index) => {
                const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathNames.length - 1;
                return (
                    <span key={index}>
                        {isLast ? showingSlash(name) :
                            <div className="flex gap-2">
                                <Link to={routeTo} >{name}</Link>
                                <span>/</span>
                            </div>
                        }
                    </span>
                )
            })}
        </div >
    )
}

export default BreadCrumb
