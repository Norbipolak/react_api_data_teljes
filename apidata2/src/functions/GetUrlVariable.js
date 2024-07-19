function GetUrlVariable(name, defValue) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name) !== null ? params.get(name) : defValue;
}

export default GetUrlVariable;

/*
Miért csináltuk ezt a urlVariable-t, mert ilyenkor amikor meg akarunk szerezni valamit get-elni, akkor nem kell mindig külön megcsinálni a 
kérést, hanem csak ezt a függvényt meghívni!!!!!!!!! 

van ez a segédfüggvényünk vár egy nevet, legyen ez mondjuk egy id valami szám, most a defValue-t kihagyjuk (de az azért van, mert az egy olyan
érték amiről biztosan tudjuk, hogy létezik és akkor azokat hozza le, ha nincs olyan amit megadtunk a name-nek)

meghívjuk ott ezt a segédfüggvényt, ahol leszedjük a dolgokat 
kell egy useState-s változó, amit megadunk neki -> productId és akkor GetUrlVariable(productId)
de ez a productId majd változni fog, mert azt szeretnénk, hogy mindig más dolgokat get-eljünk 
és akkor az egész get kérést egy useEffect-ben kell megcsinálni, ami a [ProductId] változását nézi és ha ez változik, akkor másokat fogunk 
get-elni megszerezni!!!!! 

mondjuk valami ilyesmi 

const ProductDetails = ({ productId }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const productUrl = `https://dummyjson.com/products/${productId}`;
            const productData = await fetchData(productUrl);
            setProduct(productData);
        };

        fetchProduct();
    }, [productId]);

itt meg tudjuk változtatni az értékét!!!!!! 
->
const App = () => {
    const [productId, setProductId] = useState(1);

    return (
        <div>
            <button onClick={() => setProductId(productId - 1)}>Previous</button>
            <button onClick={() => setProductId(productId + 1)}>Next</button>
            <ProductDetails productId={productId} />
        </div>
    );
};

Dynamic URL Fetching

1. State Updates: When the user clicks "Previous" or "Next", the productId state changes.
2. Effect Hook: The useEffect hook in ProductDetails triggers a fetch whenever productId changes.
3. Dynamic URL: The URL used in fetchData is dynamically constructed using the current productId.
*/