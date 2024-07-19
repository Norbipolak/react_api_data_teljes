/*
Itt lesz majd pagination 
Mi kell hozzá
useState-s változó  
1. page -> 1 lesz a kezdőértéke és majd a pagination-nál ha megcsináltuk a kikötéséket, hogy mikor ne lehessen visszafele menni ha a page kisebb 
mint 1 és mikor ne lehessen továbbmenni, ha a page nagyobb, mint amennyi termékünk van, ez majd a total useState-s változó lesz 
na az a lényeg, hogy a pagination az bekér egy addition(ami lehet kivonás is) és attól függően, hogy melyik gombot nyomjuk meg majd megadjuk, hogy 
plusz egy legyen vagy minusz egy, itt a pagination-nél meg a page értékét fogjuk set-elni azzal!!!!! tehát -1 vagy +1-vel

2. Total 
ez lesz, hogy mennyi termék jött le összesen, ezt megszerezzük majd a json.total-ból és ezt elosztjuk azzal, hogy mennyi terméket mutatunk 
egyszerre, mert ez változni fog, mint egy weboldal-on, ki tudjuk választani, hogy mennyit mutasson egyszerre 
ez egy select option-ös lesz és innen majd kiszedjük az értéket ez lesz a limit, ami szintén egy useState-s változó lesz, mert az értéke 
változni fog!!!!! 
fontos, hogy a total-t, mindig felfele kell kerekíteni, mert ha a json.total az mondjuk 100 és a limit 32, akkor ennek négynek kell lennie!!! 
mert így a negyedik oldalon is lesz majd 4 termék!!!!

3. Limit ezt majd bekérjük a select option-ből az értékét 
<select value={limit}
onChange={e=>setLimit(parseInt(e.target.value))}>
    <option value={16}>16</option>
    <option value={24}>24</option>

És nagyon fontos, mert ennek az értéke majd total useState-s is befolyásolja!!!!!!!

4. q, mint query, ez egy keresési kifejezés lesz, amit majd ha akarunk, akkor be tudunk írni egy input type="text"-be 
és fontos, hogy ez is majd része lesz az url-nek!!!!! 
<h4>Keresési kifejezés</h4>
    <input type="text" onChange={e=>setQ(e.target.value)}/>
</div>

5. products ez meg egy tömb lesz és ide lesz elmentve ebbe a tömbbe, amit majd leszedünk az api megszólítsással!!!! 

Ami még fontos
Azt a beckend-en hastározák meg, hogy mi kell ahhoz, hogy pagination-val tudjuk majd leszedni a termékeket
hogy mit kell majd megszólítani!!!!! 
const response = await fetch(`https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${q}`);
és itt lesz egy skip is -> const skip = (page-1) * limit;, hogy mennyi terméket hagyunk majd ki!!!!! 
ami meg mindig a page-1 * limit lesz, hiszen az első page-en még nem hagyunk ki, másodikon viszont, már annyit hagyunk ki, mint amennyi a limit 
limit -> amennyi terméket megjelenítünk egyszer az oldalon!!!! 
tehát a limit mindig ugyanannyi, (ha csak ezt en nem állítjuk) és akkor a másodikon oldalon a ?limit=12&skip=12, lapozunk egyet 
a ?limit=12&skip=24
query mindig egy ?-jel-vel kezdődik és ha több dolgot szeretnénk a query-ben összefüzni azt meg egy &-vel!!!!!!!! 

useNavigate(); ezzel tudjuk meghatározni, hogy milyen url-re navigáljon minket
navigate(`/?page=${page}&limit=${limit}&q=${q}`;

tehát itt rögtön, ahogy leszedtük a termékeket, csináltunk egy navigate-t és akkor az az url lesz 
attól függően, hogy éppen mennyi a page, limit, q-nak az értéke!!!!
fontos, hogy useNavigate-t már felül meg kell csinálni!!! -> const navigate = useNavigate();
és innentől kezdve a navigate-t tudjuk használni!!! 

fontos, hogy amikor lejöttek a termékek, akkor meg kell hívni ezt a függvényt, amivel leszedjük őket egy useEffect-ben 
de fontos, hogy akkor is meg kell hívni őket, amikor a page-nek az értéke változik és akkor más termékek fognak majd lejönni!!!!! 
*/

import { useEffect, useState } from "react";
import ProductC from "./ProductC";
import { useNavigate } from "react-router-dom";
import GetUrlVariable from "../functions/GetUrlVariable";

function ProductsP() {
    const [products, setProducts] = useState([]);
    //ide mentjük le az összes terméket, ami majd lejön! 
    const [limit, setLimit] = useState(parseInt("limit", 16));
    //hogy alapból is lejöjjön valamennyi termék azért kell a 16, amugy meg a limit, hogy mennyi termék legyen egy oldalon 
    const [page, setPage] = useState(1);
    //oldal ennek az értékét fogjuk változtatni a pagination függvénnyel, meg az url-ben is benne lesz 
    //fontos, hogy ennek a változására is legyen egy useEffect, amiben majd meg kell hívni a getProducts()-ot!!! 
    const [total, setTotal] = useState(0);
    //ez majd a json.total, hogy mennyi termék van összesen és per a limit setTotal(Math.ceil(json.total/limit));
    const [q, setQ] = useState("");
    //keresési kifejezés, benne kell, hogy legyen az url-ben meg egy input-ból kiszedjük majd az értékét 
    //<input type="text" onChange={e=>setQ(e.target.value)}/>, de egyenlőre egy üres string
    //és akkor mindig csak azok a termékek jönnek le aminek az url-jében benne van, amit mi beírtunk az input-ba!!!!!!! 
    const navigate = useNavigate();
    /*
    a komponens mindig frissíti önmagát, hogyha 
    a komponensváltozó értéke módosul!!!!!!!!!! 

    tehát más jön le ha ennek az értéke módosul, pl. q-nál ha beírunk valamit, akkor ez jól megfigyelhető!!!!!!! 
    */
    const getProducts = async () => {
        const skip = (page - 1) / limit;
        //mert kell az url-hez amit majd megszólitunk!!!!!! 
        const response = await fetch(`https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${q}`);
        //fontos, hogy itt összeállítunk egy url-t, hogy és hol jelenjenek meg a termékek
        //fontos, hogy a limit ugyanaz legyen meg a q is!!!!!!!!!!!!!! 
        navigate(`/?page=${page}&limit=${limit}&q=${q}`);
        /*
        total-t majd mindig frissítjük, mert a limit-től függ (ami változik) és azt meg tudjuk frissíteni ott egy onChenge-vel a select-nél 
        de ezt itt nem ezért kell itt a függvényben set-elni
        */
        setTotal(Math.ceil(json.total / limit));
        //beletesszül a lejött termékeket egy itteni useState-s tömbbe, frissítjük vele!!! 
        setProducts(json.products);
    }
    /*
    és ha valami változás van, akkor ez egész komponens render, frissül! ezért fontos a setProducts, meg a setTotal, mert mindig kell, hogy 
    frissüljön, amikor változás van pl. a limit-et megváltoztatjuk, mert méshogy jönnek le a termékek, más számban!!! 
    */
    /*
    pagination 
    ez vár egy addition-t(ami lehet kivonás is, attól függően, hogy melyik gombot, nyomjuk meg majd és mindegyiknél meghívjuk a függvényt!!)
     <div className="pagination">
         <button disabled={page <= 1}
         onClick={()=>pagination(-1)}>Előző</button>
         <h4>{page}/{total}</h4>
         <button disabled={page >= total}
         onClick={()=>pagination(1)}>Következő</button>
 
     itt nagyon jó attributum a disabled!!!!!! hogy letiltsuk a gombot
     <button disabled={page >= total}
 
     onClick={()=>pagination(-1)
     onClick={()=>pagination(1)
     tehát azért nem tudjuk ennek az értékét belül itt set-elni, mert a page-nek, mert lehet minusz egy vagy plusz egy 
     és ezért kell, hogy tudjuk az onClick-vel, hogy melyik és azt megkapja ez a függvény és azzal fogjuk set-elni a useState-s page-t
    */
    const pagination = (addition) => {
        //meghatározzuk, hogy melyik esetek nem jók 
        const dNext = addition === 1 && page >= total;
        //hogyha előre megyünk, akkor az utolsó oldalról ne lehessen továbbmenni a total jelzi, hogy hány page van összesen
        const dPrev = addition === -1 && page <= 1;
        //ha az első page-n vagyunk, akkor ne lehessen visszafele menni 

        /*
        és ha ezeknek az értéke false, akkor tudunk majd egyet előre vagy hátra menni, attól függ, hogy melyik gomb lett megnyomva 
        */
        if (!dNext && !dPrev)
            setPage(p => p + addition);
    }

    useEffect(() => {
        getProducts();
    }, []);

    //akkor is meg kell hívni, ha megváltozik a page, hogy lejöjjenek a termékek!!!!! 
    useEffect(() => {
        getProducts();
    }, [page]);

    return (
        <div className="container">
            <div className="search-bar">
                <div>
                    <h4>Keresési kifejezés</h4>
                    <input type="text" onClick={(e) => setQ(e.target.value)} />
                </div>
                <div>
                    <h4>Termékszám</h4>
                    <select onChange={(e) => parseInt(e.target.value)} value={limit}>
                        <option value={16}>16</option>
                        <option value={24}>24</option>
                        <option value={32}>32</option>
                    </select>
                </div>
                <div>
                    <h4>Keresés</h4>
                    <button onClick={getProducts}></button>
                </div>
            </div>
            <div className="products-grid">
                {
                    products.map((p, i) =>
                        <ProductC key={i} p={p} />
                    )
                }
            </div>
            <div className="pagination">
                <button disabled={page <= 1}
                    onClick={() => pagination(-1)}>Előző</button>
                <h4>{page}/{total}</h4>
                <button disabled={page >= total}
                    onClick={() => pagination(+1)}>Következő</button>
            </div>
        </div>
    );

    /*
    onChange={(e)=>parseInt(e.target.value)}
    fontos, hogyha szám az értéke a option-öknek és meg akarjuk őket szerezni number-ként, akkor kell a parseInt!!!!!!!! 
    */

    const PaginatedProducts = () => {
        const [products, setProducts] = useState([]);
        const [total, setTotal] = useState(0);
        const [page, setPage] = useState(1);
        const [limit, setLimit] = useState(10);  // Default limit
        const [q, setQ] = useState('');
        
        const location = useLocation();
        const navigate = useNavigate();
    
        useEffect(() => {
            // Parse query parameters
            const queryParams = new URLSearchParams(location.search);
            const pageParam = parseInt(queryParams.get('page') || '1');
            const limitParam = parseInt(queryParams.get('limit') || '10');
            const qParam = queryParams.get('q') || '';
    
            setPage(pageParam);
            setLimit(limitParam);
            setQ(qParam);
        }, [location.search]);
    
        const getProducts = async () => {
            const skip = (page - 1) * limit;
            const response = await fetch(`https://dummyjson.com/products/search?limit=${limit}&skip=${skip}&q=${q}`);
            const json = await response.json();
            setTotal(Math.ceil(json.total / limit));
            setProducts(json.products);
            
            // Update URL with query parameters
            navigate(`/?page=${page}&limit=${limit}&q=${q}`, { replace: true });
        };
    
        const pagination = (addition) => {
            const newPage = page + addition;
            if (newPage > 0 && newPage <= total) {
                setPage(newPage);
            }
        };
    
        useEffect(() => {
            getProducts();
        }, [page, limit, q]);
    
        return (
            <div>
                <input 
                    type="text" 
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search products..."
                />
                <ul>
                    {products.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
                <div className="pagination-controls">
                    <button
                        onClick={() => pagination(-1)}
                        disabled={page <= 1}
                    >
                        Previous
                    </button>
                    <span>Page {page} of {total}</span>
                    <button
                        onClick={() => pagination(1)}
                        disabled={page >= total}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };
    
    export default PaginatedProducts;
    
    /*
    1. Fetch products based on query parameters (limit, skip, and q).
    2. Update the URL to reflect the current state.

Explanation

1. State Management:
    products: Stores the list of products.
    total: Stores the total number of pages.
    page: Stores the current page number.
    limit: Stores the number of items per page.
    q: Stores the search query.

2. useLocation and useNavigate:
    useLocation: To read the current URL and parse query parameters.
    useNavigate: To update the URL when the page or search query changes.

3. useEffect:
    The first useEffect parses the query parameters from the URL and updates the state variables (page, limit, q).
    The second useEffect fetches products whenever page, limit, or q changes.

4. getProducts Function:
    Fetches products from the API using page, limit, and q.
    Updates the total number of pages.
    Sets the fetched products to the state.
    Updates the URL to reflect the current page, limit, and query.

5. Pagination Function:
    Adjusts the page state based on the user's navigation.
    Ensures the page number remains within valid bounds.

6. Search Input:
    Allows users to search products, updating the q state.
*/
}