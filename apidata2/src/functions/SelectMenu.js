import { useLocation } from "react-router-dom";

function SelectMenu(menu) {
    const location = useLocation();
    /*ezzel tudjuk, hogy melyik location-on vagyunk és vannak olyan property-jei, amiket csináltunk az UrlData.js-ben!!!! 
    pathname, hostname, port, protocol!!!! -> window.location 
    de react-ben jobb ha useLocation-t használjuk, mint simán a window.location-t 
    -> 
    useLocation provides a reactive way to track location changes. When the URL changes, 
    components that use useLocation will automatically re-render, keeping the UI in sync with the current route....
    */
    //itt a return-ben adjuk meg, hogy milyen class-t kap majd az lia nav-ban ha ez a meghívásnál true lesz!!!!! 
    if(location.pathname === menu) 
        return "selected-menu";
    return "";
    /*
    tehát a nav az összes oldalon ott lesz majd és a useLocation()-vel ki tudjuk olvasni, hogy melyik url-en vagyunk!!!! 
    pathname fogja ezt megmutatni, hogy ../products, tehát ha ez a location.pathname egyenlő a menu-vel 
    amit majd csak oda beírunk, megadunk neki attól függően, hogy a Link to={}-val hova fog minket vinni!!!!! 
    */
    
}

/*
és akkor az a lényege ennek, hogy a useLocation() miatt tudjuk majd, hogy melyik pathname-n vagyunk és ha ez megegyzik azzal
amit a nav-nál megadtunk a Link-nek a to={}-val akkor az li-nek megadunk egy class-t, amit csináltunk és itt a return-ben visszaadtunk 
ha location.pathname meg a menu, amit bekérünk az ugyanaz <li className={SelectMenu("/")}>!!!!!!! 
amugy meg nem kap class-t csak egy üres string-et adunk majd vissza!!!!! 
->
            <nav>
                <ul>
                    <li className={SelectMenu("/")}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={SelectMenu("/create-product")}>
                        <Link to="/create-product">Create Product</Link>
                    </li>
                    <li className={SelectMenu("/contact")}>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>    
            </nav>
*/

export default SelectMenu;