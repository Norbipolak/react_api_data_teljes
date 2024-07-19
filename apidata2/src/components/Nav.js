import { Link, Outlet } from "react-router-dom";
import SelectMenu from "../functions/SelectMenu";

function Nav() {
    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/" className={SelectMenu("/")}>Home</Link>
                    </li>
                    <li>
                        <Link to="/create-product" className={SelectMenu("/create-product")}>Create Product</Link>
                    </li>
                    <li>
                        <Link to="/contact" className={SelectMenu("contact")}>Contact</Link>
                    </li>
                </ul>
            </nav>

            <Outlet/>
        </>
    );
}

export default Nav;