import { Link } from "react-router-dom";
import { baseUrl } from "../functions/UrlData";
/*
amit csináltunk itt baseUrl-t azt majd hozzáfüzzük valamihez és oda megyünk egy Link to={}-val 
->
<Link to={baseUrl + `/update-product/${p.id}`}>
*/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageBox from "./MessageBox";
import { useState } from "react";

function ProductC({p}) {
    const [show, setShow] = useState(false);
    /*
    mutatjuk-e a message-t vagy nem, az akkor lesz true ha a user rákantitott a törlés ikonra 
    ilyenkor feljön egy message, hogy biztosan ki akarja-e törölni, ha igen akkor lefut a deleteProduct függvény 
    ha meg nem, akkor a show false lesz, tehát nem mutatjuk ezt a message-t és marad a product!!!!!!! 
    */
    const [message, setMessage] = 
    useState(`Biztosan le akarod törölni a következő terméket: ${p.title}`);
    /*
    ez lesz alapból ebbe kiírva, de viszont ha nem sikerült a törlés, akkor kiírjuk benne, hogy nem sikerült!!! 
    */
    const [showProduct, setShowProduct] = useState(true);
    /*
    ha ez true, akkor megjelenítjük a terméket, ha viszont false, akkor meg nem 
    ->
    <div style={{display:showProduct ? "block" : "none"}}
    tehát jelenleg true és mutatjuk a terméket, mert display: block!!!!!!!!! 
    ez majd azért kell, mert lesz egy deleteProduct és ha sikeres volt a törlés, akkor nem mutatjuk!!!!! 
    de itt nem fog kitörlödni, mert a szerver-ről is ki kellene majd törölni 
    */
    
    const deleteProduct = async ()=> {
        //fontos, hogy itt kell id!!!!!! 
        const response = await fetch("https://dummyjson.com/products/" + p.id, {
            method: "DELETE"
        });
        /*
        ha törlés sikeres, akkor ne mutassuk se a terméket 
        se a message-t, hogy biztos ki akarjuk törölni a terméket 
        */
        if(response.ok) {
            setShow(false);
            setShowProduct(false);
        } else {
            setMessage("A törlés nem sikerült, kérem próbálja meg késöbb!")
        }
    };

    const buttons = [
        {
            cb:()=>setShow(false),
            text: "Mégse",
            icon:""
        },
        {
            cb:deleteProduct,
            text: "törlés",
            icon:"fa solid fa-trash-can"
        }
    ];

    return(
        <>
            <MessageBox buttons={buttons} messages={[message]}
            show={show} setShow={setShow}/>
            <div style={{display:showProduct ? "block" : "none"}}
            className="product">
                <h4>{p.title}</h4>
                <div className="product-img">
                    <img src={p.thumbnail} />
                </div>
                <div className="product-data">
                    <div className="white-box">
                        <b>Ár:</b> <br />
                        {p.price}$
                    </div>
                    <div className="white-box">
                        <b>Kategória</b> <br />
                        {p.category}
                    </div>

                    <div className="white-box">
                        <b>Márka:</b> <br />
                        {p.brand}$
                    </div>
                    <div className="white-box">
                        <b>Készlet</b> <br />
                        {p.stock} db.
                    </div>
                    <div className="white-box">
                        <Link to={baseUrl + `/update-product/${p.id}`}>
                            <FontAwesomeIcon icon="fa-solid fa-up-right-from-square" />
                        </Link>
                    </div>
                    <div className="white-box">
                        <FontAwesomeIcon onClick={()=>setShow(true)}
                        icon="fa-solid fa-trash-can" className="delete-trash-can"/>
                    </div>
                </div>
            </div>
        </>
    );



/*
Explanation of State Variables

1. show:
    Purpose: Controls the visibility of the confirmation dialog (MessageBox) that asks the user if they are sure they want to delete the product.
    Usage: Set to true when the user clicks the delete icon, triggering the confirmation dialog. Set to false to hide the dialog.

2. showProduct:
    Purpose: Controls the visibility of the product in the UI.
    Usage: Set to false to remove the product from the UI once the deletion is confirmed and successfully processed.


Flow of Operations

1. User Initiates Deletion:
    The user clicks the delete icon (<FontAwesomeIcon> with onClick={()=>setShow(true)}).
    This action sets show to true, making the confirmation dialog (MessageBox) visible.

2. Confirmation Dialog Appears:
    The MessageBox component is rendered because show is true.
    
3. User Confirms or Cancels Deletion:
    If the user cancels (cb:()=>setShow(false)), show is set to false, hiding the dialog.   
    If the user confirms (cb:deleteProduct), the deleteProduct function is called.

4. Product Deletion:
    The deleteProduct function sends a DELETE request to the server.
    If the deletion is successful (response.ok), showProduct is set to false, removing the product from the UI, 
    and show is set to false, hiding the dialog.
    If the deletion fails, an error message is set in message.
*******************
Innen jön a ProductsP-ről 
ProductC meg a product komponens 
->
    {
        products.map((p, i) =>
            <ProductC key={i} p={p} />
        )
    }
És azért csináltunk külön komponens-t, hogy majd legyen ott egy delete product-unk!!!!! 
meghogy megjelenítsük itt a dolgokat

Akkor itt ugye megkapja a p nevű prop-ot, ami ProductsP-ből jön és a termék adat, mert ott leszedjük a termék adatokat, ami ott fent van a 
products-on végigmegyünk egy map-val és ami onnan jön p azt megkapja ez a function egy prop-ban és kiírjuk
Közben meg definiálunk egy deleteProduct-ot, az meg úgy müködik, hogy megszólitjuk a megfelelő endpoint-ot 
-> 
("https://dummyjson.com/products/" + p.id,..
a metódust DELETE-re állítjuk, mert ha POST lenne, akkor megpróbálna felvinni egy terméket (CreateProductsForm)-nál azért néztük meg, hogy van 
-e id, mert a POST-nál nem kell, ott majd automatikusan kap egy id-t, a PUT-val meg megpróbálunk felülírni egy terméket és ott viszont kell egy 
id, mert tudnunk kell, hogy melyik (id-ú) létező terméket akarjuk majd felülírni!!!! 

és ha minden rendben van, akkor a setAShowProduct meg a setShow 
if(response.ok) {
    setShow(false);
    SetShowProduct(false);

A setShowProduct az eltünteti nekünk a terméket, a setShow meg a MessageBox-hoz tartozik 
és akkor itt eltüntetjük, mert a message az az, hogy biztosan le akarjuk törölni a következő terméket: ${p.title} 
const [message, setMessage] = 
useState(`Biztosan le akarod törölni a következő terméket: ${p.title}`);
és ha ott rányumtunk arra hogy törlés a MessageBox-nál, akkor eltünteti a MessageBox-ot meg magát a terméket is!!!!! 

Mert valójában nem tünik el az adatbázisukból, csak mi imitáljuk ezt, hogy ez így müködik 
Való életben letörli az adatbázisból és a következő frissítésre nem tud megjelenni, mert nem létezik az a termék többet az adatbázisukban!!! 
vagy azért nem jelenik meg, mert nem törli hanem csak arhiválja, sok rendszer müködik úgy, hogy van egy olyan mező az adatbázisukban, hogy 
arhivált és elöször nem törli le, csak 30 napig arhivált státuszban lesz és egy automatizmus letörli azokat az arhivált bármiket, mondjuk 
terméket, amelyek régebbiek, mint 30 nap, tehát vagy arhiválja vagy törli vagy létezhet külön arhiválás és törlés funkció 

const buttons = [
    {   
        cb:()=>setShow(false),
        text: "Mégsem",
        icon: "fa-solid fa-circle-chevron-left"
    }, 
        {   
        cb: deleteProduct,
        text: "Törlés",
        icon: "fa-solid fa-trash-can"
    }
]

Ez a MessageBox-hoz tartozik, tehát a MessageBox-nál kapunk 4 darab prop-ot { messages, buttons, show, setShow} 
1. 
messages arra szolgál, hogy azokat a message-eket megjenítsük ebben a message box-ban, amit szeretnénk, ezt kivülről fogja megkapni
2. 
buttons az azért érdekes, mert ehhez meghatároztuk egy adatszerkezetet 
a cb (callback function), tehát mit hívjon meg abban az esetben, hogyha megnyomjuk az adott gombot
text, hogy mi legyen a gombnak a felírata 
icon, mi legyen az ikon-ja fontAwesome

ezt pedig majd a MessageBox-on így kapja meg majd a két button!!!
{
    buttons.map((b, i) => 
        <button key={i} 
        onClick={b.cb}>
            {b.text}

            <FontAwesome icon={b.icon}/>
        </button>    
    )
}
Tehát végigmegyünk a buttons-ön és a onClick lesz a cb, a text lesz ami ki van írva, az ikon meg a text mellett lesz megjelenítve 
1. onClick={b.cb}>
2. {b.text}
3. <FontAwesome icon={b.icon}/>

de viszont a text meg az ikon túlságosan egymás mellett van, ezért csinálunk egy margin-left-es class-t 
.margin-left-5px {
    margin-left: 5px;
}

és ezt megadjuk a fontAwesome-os ikonnak!!! 
->
<FontAwesome className="margin-left-5px" icon={b.icon}/>
*/
}