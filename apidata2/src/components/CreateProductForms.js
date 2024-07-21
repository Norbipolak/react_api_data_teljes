/*
Elmagyarázás 
pErrors az egy objektum, amikben majd kiírjuk a hibákat és attól függően, hogy hol van hiba oda kiírjuk, fontos, hogy a return-ben 
is ott jelenítsük meg ahol hiba van és oda, mondjuk egy input mező alá vagy felé attól függ, hogy hol jelenítjük meg kiírja a hibát 
const pErrors = useState({});
****
const pData = {
    category: "", 
    brand: "",
    title: "",
    stock: 0
}
Ezek az adott terméknek az adatai, amit felviszünk majd az API-ba!!!!!! 
és ezt majd beírjuk egy input-ba az értékét mindegyinek és azt kiszedjük onnan és megadjuk ennek a tömbnek!!!! 
*******
const categories = useState([]);
úgy hozzuk le a termék kategoriákat amik léteznek, hogy megjelenik egy legördölű menü-ben!!!! 
és azt ide lementjük és fontos, hogy majd ha fel akarunk vinni egy új terméket, akkor csak ezekből a kategóriákbó,l lehessen választani!!!!!! 
nehogy az is egy input legyen és akkor egyszer parfümöt írunk, másszor meg illetszer vagy bármi helyesírási hiba elkerülési miatt!!!!! 
******
const {id} = useParams()
ez az id meg onnan származik, pont olyan url paraméter mint a szótárnál volt 
*******
függvények 
A kategóriákat fogja majd leszedni!!!! 
getCategories = async ()=> {
    const response = await fetch("https://dummyjson.com/products/categories");
    const json = await response.json();
    setCategories(json);
    ez lesz majd itt lementve és megjelenítjük egy select-option-ösben!!! 
}
***********
const getProductByID = async ()=> {
    if(id === undefined) 
        return;
    
    const response = await fetch("https://dummyjson.com/products" + id);
    
    const json = await response.json();

    setPData = {
        category: json.category,
        brand: json.brand,
        title: json.title,
        stock: json.stock
    }
}
->
Az id alapján megszólítja a API endpoint-ot és termékadatokat lekérdezi!!! 
csak fetch-elünk egyet az id alapján és ha az id undefined, akkor meg return-ölünk!!!!! 

Itt pont az a lényeg, hogy egyben van az update meg a felvitel 
és hogyha update, akkor lehozza az adatokat, hogy lássuk, hogy mik voltak az eredetiek!!!! 
->
    setPData = {
        category: json.category,
        brand: json.brand,
        title: json.title,
        stock: json.stock
    }

ha meg nem update, akkor meg nem hozzuk le az adatokat, hanem azt mondjuk, hogy return!!!!!!!! 
********
UseEffect-ben meghívjuk ezt a két függvényt!!!! 
********
execute függvény ez az érdekes függvény 
elöször a hibákat fogjuk ellenőrizni, hogy lesz elöször egy üres objektum 
const errors = {};


és ennek csinálunk itt kulcsokat és beletesszük a értékként a hibaüzenetet 
if(pData.category.length === 0) 
    errors.category = "Nem választottad ki a kategóriát";

if(pData.brand.length === 0)
    errors.brand = "Nem adtad meg a márkát";

és ezt a title-re meg a stock-ra is ugyanígy, stock-ra kicsit másképp, mert ott ellenőizzük, hogy nem NaN és utána, hogy nem nulla-e 
if(!isNaN(pData.stock) || pData.stock === 0)
    ....
itt akkor is isNaN lesz ha üresen hagytuk ugye!!!! 

itt set-eljük majd a pErrors az errors objektum-ra amit itt csináltunk 
->
setPErrors(errors);

megnézzük, hogyha az error keys-ei-nek a length-je nem egyenlő nullával, akkor return-ölünk hiszen van valami hibánk 
if(Object.keys(errors).length !== 0)
    return;

és a akkor a return-ben a pErrors.category === undefined ? "" : <label className=error-label>{pErrors.category}</label>
ha van itt a pErrors.category === undefined, akkor az jelenti, hogy nem volt hibánk, nincsen ilyen kulcsa a pErrors tömbnek 
de ha nem undefined akkor volt és azt meg is jelenítjük!!!!! 
és ezt mindegyik catergory, stock, title-s input vagy select felé csinálunk egy ilyet, hogyha ott van a hiba, akkor felé írja ki!!!

Ha nem volt hiba, akkor eldüntjük, hogy ez egy PUT metódus vagy egy POST , amit kivülről kapunk majd meg, mert ez a function vár egy endpoint-ot 
meg egy method-ot amit itt a const response-nál felhasználunk!!!!! 

függvény 
const response = await fetch(url, {
    method: method,
    headers: {"content-type":"application/json"},
    body: JSON.stringify(pData)
})

és ez az egész function vár egy url-t meg egy method-ot, amit majd megadunk ott, amikor App.js-en behívjuk ezt a függvényt valamilyen router-nak 
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
PUT metódus abban az esetben ha felülírunk, ha megnyitottunk valamilyen terméket, ha meg nem megnyítottuk, akkor egyszerűen csak a POST 
metódus és itt az url is fog változni, van egy endpoint-unk, azt is prop-on keresztül kaptuk meg és az endpoint-hoz hozzáfüzzük az id-t 
abban az esetben hogyha az id nem undefined, tehát hogyha megnyitottunk valamit 
->
const url = id === undefined ? endpoint : endpoint + "/" + id; 

const {id} = useParams() 
Ez úgy müködik, hogyha nincsen id, akkor ez undefined lesz!!!!! 
És onnan tudjuk, hogy felül akarunk-e írni vagy újat felvinni, hogy az id undefined-e vagy sem 
Egyébként meg elküldjük a const response-ban a megfelelő content-type-ot meg header-t a szervernek!!!!!!!! 
*/

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//ezzel tudjuk majd, hogy melyik id-ű termékről van szó, ha a PUT metódus kell majd 

function CreateProductForm({endpoint, method}) {
    const [pErrors, setPErrors] = useState({});
    /*
    ebbe gyüjtjük majd az error-okat ez majd egy objektum lesz és lesznek olyan kulcsai, amilyen select meg input mezőink vannak (catergory stb.)
    megcsináljuk lokálisan, létrehozunk egy objektumot, minden kulcsra csinálunk egy hibaüzenetet és majd azzal set-eljük ezt a useState-st 
    */
    const [pData, setPData] = useState({
        category: "",
        brand: "",
        title: "",
        stock: 0
    });
    /*
    itt lesznek majd az adatok, amiket fel akarunk majd vinni ez megadjuk egy POST vagy egy PUT-nak body-ként!!!!! 
    */
    const [categories, setCategories] = useState([]);
    /*
    ide gyüjtjük majd a kategoriákat, amit leszedünk majd a getCategories függvénnyel és majd megjelenítjük ezeket egy select-ben, hogy 
    onnan tudjunk majd PUT vagy POST-nál választani ne be kelljen írni egy input-ba!!!! 
    */
    const {id} = useParams();
    /*
    megszerezzük az id-t és ha PUT van, akkor majd ez kell, mert tudnunk kell, hogy melyik idú terméket akarjuk majd felülírni
    */

    const getCategories = async ()=> {
        const response = await fetch("https://dummyjson.com/products/categories");
        const json = await response.json();
        setCategories(json);
    };

    /*
    megszerezzük minden product-ot id alapján, ha pedig nem létezik az id, akkor return!!!!!
    */ 
    const getProductByID = async ()=> {
        const response = await fetch("https://dummyjson.com/products" + id);
        const json = await response.json();

        /*
        fontos, hogyha van id, akkor tudjuk, hogy ez egy PUT lesz majd, ahol felülírunk dolgokat és meg akarjuk jeleníteni az eredeti 
        értékeket, amik vannak és akkor majd ezeket lehet kitörölni és felvinni egy újat!!!!! 
        */
        setPData({
            title: json.title,
            brand: json.brand,
            category: json.category,
            stock: json.stock
        })
    };

    /*
    meghívjuk ezeket a függvényeket, hogy már az elején meg legyenek
    */ 
    useEffect(()=> {
        getCategories();
        getProductByID();
    }, []);

    /*
    execute-ban megcsináljuk az error-okat és megadjuk, a method-ot meg az endpoint-ot, amit vár ez a függvény 
    CreateProductForm({endpoint, method}) 
    fontos, hogy kell a preventDefault() is, mert ez egy form-ban van a return-ben!!!! 
    */
    const execute = async (e)=> {
        e.preventDefault();
        const errors = {};

        if(pData.category.length === 0)
            errors.category = "Nem választottad ki a kategóriát!";

        if(pData.brand.length === 0)
            errors.brand = "Nem adtad meg a terméket!";

        if(pData.title.length === 0)
            errors.title = "Nem adtad meg a termék elnevezését!";

        if(isNaN(pData.stock) || pData.stock === 0)
            errors.stock = "Helytelenül állítottad be a készletinformációt!";

        setPErrors(errors);

        /*
        Ha van hibánk akkor nem megyünk tovább, return, ezt úgy nézzük meg, hogy objektum-nak a kulcsai-nak a length-je nem nulla 
        */
        if(Object.keys(errors).length !== 0) {
            return;
        }

        //hogyha van id, akkor endpoint + id kell, ha viszont nincs akkor elég az endpoint, ezt meg az App.js-en megadjuk neki 
        const url = id === undefined ? endpoint : endpoint + "/" + id;

        /*
        itt felülírjuk vagy megcsináljuk a terméket, attól függően, hogy mi a method és ezt itt várja is majd!!! 
        */
       const response = await fetch(url, {
            method: method,
            headers: {"content-type":"application/json"},
            body: JSON.stringify(pData) 
       })
    };

    return(
        <div className="container text-center">
            <form>
                <div className="product-page-grid">
                    <div className="product-data-box">
                        <h3>Kategória</h3>
                        
                        {
                            pErrors.category === undefined ?
                            "" : 
                            <label className="error-label">
                                {pErrors.category}
                            </label>
                        }

                        <select onChange={(e)=>setPData(p=>({...p, category:e.target.value}))}
                        className="w-80" value={pData.category}>
                            <option value={""}>Válassz kategóriát!</option>
                            {
                                categories.map((c, i)=>
                                    <option key={i}>
                                        {c}
                                    </option>
                                )
                            }
                        </select>

                        <h3>Márka</h3>
                        {
                            pErrors.brand === undefined ?
                            "" : 
                            <label className="error-label">
                                {pErrors.brand}
                            </label>
                        }
                        <input onChange={(e)=>setPData(p=>({...p, brand:e.target.value}))}
                        className="w-80" type="text" value={pData.brand}/>
                    </div>
                    <div className="product-data-box">
                        <h3>Megnevezés</h3>
                        {
                            pErrors.title === undefined ? "" :
                            <label className="error-label">{pErrors.title}</label>
                        }
                        <input onChange={e=>setPData(p=>({...p, title:e.target.value}))}
                        className="w-80" type="text" value={pData.title}/>

                        <h3>Készlet</h3>
                        {
                            pErrors.stock === undefined ? "" :
                            <label className="error-label">{pErrors.stock}</label>
                        }
                        <input onChange={e=>setPData(p=>({...p, stock:parseInt(e.target.value)}))}
                        className="w-80" type="number" value={!isNaN(pData.stock) ? pData.stock : ""}/>
                    </div>
                </div>

                <button onClick={execute}>Mentés</button>
            </form>
        </div>
    )
}

export default CreateProductForm;

/*
fontos, hogy a useState-s változó egy objektum, aminek egyes mezeit akarjuk majd bekérni egy select-vel vagy egy input-val 
akkor ki kell majd nyitni az objektumot és ott e.target.value-val az a mezőt amit akarunk frissítneni 
<input onChange={e=>setPData(p=>({...p, stock:parseInt(e.target.value)}))}

fontos a isNaN, ha azt akarjuk ellenőrizni, hogy nem írt be semmit egy olyan helyre ahonnan number-t várunk!!! 
->
value={!isNaN(pData.stock) ? pData.stock : ""}
if(isNaN(pData.stock) || pData.stock === 0)
*/