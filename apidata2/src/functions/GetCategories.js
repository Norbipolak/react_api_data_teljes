const GetCategories = async ()=> {
    const response = await fetch("https://dummyjson.com/products/categories");
    const json = await response.json();
    return json;
}

export default GetCategories;

/*
Ez csak egy sima get kérés egy asnyc függvénnyel és itt leszedjük a categories-okat és majd ahol ezt felhasználjuk ott meg lesznek 
a kategoriák!!!! 

Itt vannak a többi lehetőségek, hogy lehet egy get request-et csinálni 
*/
 
//1. Axiom-val, fontos, hogy az axios a require-ve legyen!!!! 
//meg, hogy installálva legyen -> npm i axios!!!!! 

const axios = require("axios");

const GetCategories2 = async ()=> {
    try {
        const response = await axios.get("https://dummyjson.com/products/categories");
        return response.data;

    } catch(error) {
        console.log("Error fetching categories:", error)
    }
}

/*
fontos különbségek 
1. kell csinálni egy axios változót, ahol require-ve van az axios -> const axios = require("axios");
2. axios-nak van egy olyan beépített metódusa, hogy get és azzal szerezzük meg a dolgokat, nem a fetch-vel!!!!! 
3. itt nem kell json()-olni és azt visszaadni, hanem a response.data-t visszaadni!!!!!!!! 
**********************************************
*/

//2. error handling-val ez nagyon hasonló csak ha valami nem jó akkor csinálunk, throw-olunk egy error-t, amit majd elkapunk a catch-ágban!!!!!
const GetCategories3 = async ()=> {
    try {
        const response = await fetch("https://dummyjson.com/products/categories");
        if(!response.ok) {
            throw new Error(`HTTP error! status:${response.status}`);
        }
        const json = await response.json();
    } catch(error) {
        console.log("Error fetching categories:", error);
    }
}

/*
Ez nagyon hasonló, mint az elöbb, csak amikor megkapjuk a response objektumot, akkor van egy olyanja property-je, hogy ok
ez egy boolean érték, tehát true vagy false és ezt vizsgáljuk -> if(!response.ok)
Tehát ha ez false, akkor valami hiba volt és throw-olunk egy hibát, csinálunk egy new Error-t, amiben megadjuk a 
response.status-t, ez is a response objektum-nak egy property-je és megmondja, hogy mi a status, ha pl. 404, akkor tudjuk, hogy client hiba van

Hibakódok 
1-es kezdődőek -> information (continue, switching protocols, processing stb.)
2-es kezdődőek -> successful (200 - OK, 201 - Created, 202 - Accepted stb.)
3-as kezdődőek -> redirects (moved permanently, temporarly redirect stb.)
4-es kezdődőek -> client errors (bad request, 403 - forbidden, 404  not found stb.)
5-es kezdődőek -> server errors (bad gateway, insufficient storage, service inavailable stb. )
*********************************************************************
*/

//3. amikor a then és a catch-et használjuk az async/await helyett!!!!!
const GetCategories4 = ()=> {
    return fetch("https://dummyjson.com/products/categories")
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();

    })
    .then(json=>json)
    .catch(error => {
        console.log("Error fetching categories", error);
    })
}

/*
itt rögtön az elején csinálunk egy fetch-kérést, majd utána egy then, amiben van egy cb a response-ra 
ez visszaadja a response.json()-t 
majd kell csinálni még egy then-t ágat és végén a catch-nél az error is egy cb-vel lesz!!!!!!!!!!!!!! 
********************************************************************************************************
*/

//4. lehet, hogy csinálunk egy függvény, ami vár egy url-t és ezt majd meg fogjuk hívni a második-ban, ahol megadjuk neki ezt 
const fetchCategories = async (url)=> {

        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
}

//itt fogjuk majd meghívni 
const GetCategories5 = async ()=> {
    try {
        const categories = await fetchCategories("https://dummyjson.com/products/categories");
        return categories;
    } catch(error) {
        console.log("Error fetching categories", error);
    }
}
/*****************************************************************************************************************************************/

//amikor egy ? -val vizsgáljuk meg, hogy létezik-e a response és csak, akkor megyünk tovább ha igen 
const GetCategories6 = async () => {
    try {
        const response = await fetch("https://dummyjson.com/products/categories");
        if (!response?.ok) {
            throw new Error(`HTTP error! status: ${response?.status}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

//vagy egyszerübben 
const GetCategories7 = async () => {
    try {
        const response = await fetch("https://dummyjson.com/products/categories");
        const json = await response?.json();
        return json;
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

/*
Itt a kérdőjel azt nézi meg, hogy a response az létezik-e, mielőtt meghívnánk a json()-t, tehát ha nem létezik, a response értéke null vagy 
undefined, akkor nem is próbálja meghívni rá a json()-t!!!!!! 
const json = await response?.json()
*/


