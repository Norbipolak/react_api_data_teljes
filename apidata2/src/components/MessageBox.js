import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";

function MessageBox({ messages, buttons, show, setShow}) {
    /*
    vár prop-ként egy messages, buttons ... és ezt itt beillesztjük, ahova kell majd és meghivásnál pedig megadjuk neki, hogy mi lesz a 
    message meg az összes prop-ot, ezt meg a ProductsCkomponensben csinéljuk meg ezeket pl. ott lesz egy olyan, hogy messages useState-s 
    változó és onnan fogja prop-ként megkapni az értékét, itt meg megcsináljuk, hogy hol legyen a helye, hol fog majd megjelenni!!!! 
    pl. a buttons tömbön majd végimegyünk egy map-val és itt csinálunk egy button-t bele, ahol megadjuk a különböző dolgakat neki 
    ->
    {
    buttons.map((b, i) => 
        <button key={i} 
        onClick={b.cb}>
            {b.text}

            <FontAwesome icon={b.icon}/>
        </button>    
    )
    és az értékek amit meg bekérünk az innen van megcsinálva a ProductsC-ben!!! 
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
    és itt a ProductC-ben lesz megjelenítve is!!!!! 
    <MessageBox buttons={buttons} messages={[message]}
    show={show} setShow={setShow}/>
    ahol megadjuk a prop-ok értékeit neki, amit itt bekér ez a függvény!!!! 
    */ 
   const [grabbed, setGrabbed] = useState(false);
   /*
   Ennek az a lényege, hogyha megfogjuk a felső részét a MessageBox-nak, akkor ez a grab true értéket vesz fel!!! 
   és van is egy ilyen függvény, hogy grab, amiben a grabbed useState-nek az értékét beállítjuk true-ra!!! 
   const grab = ()=> {
        setGrabbed(true);
   }
   Ez azért szükséges, hogy tudjuk, hogy mikor nyomtuk le a az egének a gombját abban div-ben, aminek van egy message-box-header class-ja!!!
   -> 
   itt van a return-ben, van egy ilyen div aminek van egy message-box-header class-ja és ott van ez megadva egy onMouseDown-van 
   meg van egy message-box-body-s div is ahol meg ki lesz írva a message, amit meg kap prop-nak!!!! 
   <div className="message-box-header"
   onMouseDown={grab} onMouseUp={release} onMouseMove={move}>
        FontAwesomeIcon onClick={()=>setShow(false)} icon="fa-solid fa-circle-mark"/>
   </div>

   És akkor ott van az a kék rész a message-box-header és ha arra rákattintunk és akkor van egy olyan függvény is megadva neki, hogy 
   release = ()=> {
        setGrabbed(false); 
   }
    ahol a grabbed-nek az értéke meg false!!! és az meg egy onMouseUp-val van megadva, tehát ha felemeljük az egér gombját, akkor meg engedje el

    Ez azért fontos, mert csak akkor akarjuk, hogy kövesse a kurzor mozgását ez a box, hogyha le van nyomva az egér, ha pedig nincs, akkor ne 
    kövesse
    
    De itt nem is szükséges egy grab meg egy release függvény, mert ennek a useState-s grabbed-nek az értékét be tudjuk majd állítani a 
    return-ben is úgyhogy ott set-eljük az értékét!!!! 
    ->
    onMouseDown={()=>setGrabbed(true)} onMouseUp={()=>setGrabbed(false)}
    -> 
    <div className="message-box-header"
    onMouseDown={()=>setGrabbed(true)} onMouseUp={()=>setGrabbed(false)} onMouseMove={move}>
        FontAwesomeIcon onClick={()=>setShow(false)} icon="fa-solid fa-circle-mark"/>
    </div>
    ************
    Van egy move függvény, az akkor fog lefutni nekünk, amikor mozgatjuk a kurzort -> onMouseMove={move}
    Van ez az onMouseMove esemény és amikor mozgatjuk a kurzort, akkor történik valami, akkor hívódik meg a move metódus!!!! 
    const move = (e)=> {
        if(e.nativeEvent.offsetX <= 0
        || e.nativeEvent.offsetX >= 100
        || e.nativeEvent.offsetY <= 0
        || e.nativeEvent.offsetY >= 29) {
            setGrabbed(false);
        ->
        Itt meg azt mondjuk, hogy amikor kimegy a box-header-ből, akkor meg a setGrabbed(false) ez azért szükséges, mert hogyha ez nem lenne benne
        és véletlen kimegyünk a box-header-es div-ből, akkor furán fog müködni, pl. ha nem nyomjuk le az egeret, akkor is mozog  
        }
        if(!grabbed)
            return;

        és van egy position useState-s változó, aminek itt az értékeit set-eljük, hogy tudjuk, hogy hol van az egér a message-box-header-ben 
        itt ami meg az if-ben van ott az offsetX és Y-val megadtuk, hogy mennyit tudjon mozogni, hogy miért azok az értékek, mert olyan 
        magas illetve olyan széles a message-box-header és ha abból az értékből kimegyünk, akkor már ne tudjuk mozgatni, tehát ha az egér 
        nincs ebben a header-ben, akkor ne tudjuk mozgatni -> setGrabbed(false); 
        és ha nincsen benne, akkor ki is jövünk ebből a függvényből a return-vel 
        ->
        if(!grabbed)
            return;

        setPosition(p=>(
            {
                ...p, 
                x: p.x + e.nativeEvent.movementX,
                y: p.y + e.nativeEvent.movementY
            }    
        ));
        Van ez a nativeEvent.movementX meg Y, ami azt mutatja meg, hogy mennyit mozgot a kurzor a x és y tengelyen és ezt a mozgást fogjuk 
        követni, ez ahol rákattintunk onnan számolja, hogy az x meg y tengelyen mennyit mozgott 
        console.log(e.nativeEvent.movementX); -> lekattitunk jobbra megyünk, akkor 1,2,3 ha balra, akkor meg -1,-2.. viszonylag kis értékeket 
        mozog 
        és mindig ennyivel frissítjük a positon useState-s változónak az alapértékét 
    */
    const [position, setPosition] = useState({
        x: window.innerWidth / 2 - 150,
        y: window.innerHeight / 2 - 150
    })
    /*
    azért mert középre van helyezve ez a message-box-header és a magassága és a szélessége is 300px
    és akkor ennek az értékéhez adunk ennyit hozzá, amikor mozog valamennyit a set-vel
    x: p.x + e.nativeEvent.movementX,
    y: p.y + e.nativeEvent.movementY

    window.onresize = ()=> {
        setPosition({
            x: window.innerWidth / 2 - 150,
            y: window.innerHeight / 2 - 150
        })    
    }
    hogyha átálítanánk a window-nak a méretét, akkor is középen maradjon!!!! onresize!!!!!! 

    Csinálunk még egy függvényt a window-ra, hogy onmouseup 
    És ilyenkor is azt mondjuk, hogy a setGrabbed(false);
    és ilyenkor ha kimegyünk a box-header-ből, akkor is követni fogja és csak, akkor engedi el, hogyha felengedjük a gombot 
    akkor erre nem is lesz szükség 
        if(e.nativeEvent.offsetX <= 0
        || e.nativeEvent.offsetX >= 100
        || e.nativeEvent.offsetY <= 0
        || e.nativeEvent.offsetY >= 29) {
            setGrabbed(false);
    mert nem csak akkor akarjuk, hogy mozogjon, hogyha az egér benne van a box-header-ben hanem akkor is ha nincsen 
    de még egy van egy probléma, hogy a most a move függvény csak arra vonatkozik, amikor ezen a kis részen vagyunk
    ->
    <div className="message-box-header"
    onMouseDown={()=>setGrabbed(true)} onMouseUp={()=>setGrabbed(false)} onMouseMove={move}>
        FontAwesomeIcon onClick={()=>setShow(false)} icon="fa-solid fa-circle-mark"/>
    </div>

    csinálunk a window-ra egy onmousemove-ot és akkor bármerre mozgatjuk a window-ba a poziciót fogja nekünk frissíteni!!!! 
    és ha nincsen lenyomva, tehát nem grabbed akkor meg return!! 
    window.onmousemove = (e)=> {
        if(!grabbed)
            return;

        setPosition(p=>(
            {
                ...p, 
                x: p.x + e.nativeEvent.movementX,
                y: p.y + e.nativeEvent.movementY
            }    
        ));
    }
    itt meg az a probláma, hogy nem lesz nativeEvent, amivel tudjuk a movement-eket 
    de van olyan, hogy simán movementY meg movementX!!! 
    és akkor kicsit át kell alakítani!! 
    -> 
            setPosition(p=>(
            {
                ...p, 
                x: p.x + e.movementX,
                y: p.y + e.movementY
            }    
        ));
    és akkor hogyha grabbed-elve van, akkor a teljes window-ban tudjuk így mozgatni!!!! 

    és akkor tudjuk, hogy merre van a poziciója a box-nak a setPosition-ból és ha elengedjük, akkor ott marad!!!! 
    mert frissítva van a poziciója a position-nek!!!! 
    <div className="message-box"
        style={{
            display:!show ? "none" : "block",
            left: position.x,
            top: position.y
    }}></div>
    a return-ben meg is adjuk neki egy style-val!!!! 
    de nagyon fontos az, hogy tudnunk kell, hogy honnan indult!!! 
    ->
        const [position, setPosition] = useState({
        x: window.innerWidth / 2 - 150,
        y: window.innerHeight / 2 - 150
    })
    és akkor így nincs is szükség a move függvényre meg arra se, hogy meg legyen adva a box-header-es div-nek onmousemove-ra 
    mert ezt helyetesítettük azzal, hogy az egész window-ra van egy onmousemove!!!!!!! 
    */
    window.onresize = ()=> {
        setPosition({
            y: window.innerHeight / 2 - 150,
            x: window.innerWidth / 2 - 150
        });
    }

    window.onmouseup = ()=> {
        setGrabbed(false);
    }

    window.onmouseleave = (e)=> {
        if(!grabbed)
            return;

        setPosition(p=>(
            {
            ...p,
            x: p.x + e.movementX,
            y: p.y + e.movementY
            }
    ));
    }

    return(
        <div className="message-box"
        style={{
            display:!show ? "none" : "block",
            left: position.x,
            top: position.y
        }}>
            <div className="message-box-header"
            onMouseDown={()=>setGrabbed(true)} onmouseup={()=>setGrabbed(false)}>
                <FontAwesomeIcon onClick={()=>setShow(false)} icon="fa-solid fa-circle-x-mark" className="pointer"/>
            </div>
            <div className="message-box-body">
                {
                    messages.map((message, i)=> 
                        <h4 key={i}>{message}</h4>
                    )
                }
            </div>
            <div className="message-box-buttons">
                {
                    buttons.map((button, i)=> 
                        <button key={i} onClick={button.cb}>
                            {button.text}

                            <FontAwesomeIcon icon={button.icon} className="margin-left-5px"/>
                        </button>
                    )
                }
            </div>
        </div>
    )
}

/*
Ami fontos, hogy van egy grabbed változó (boolean), ennek az értékét módosítjuk aszerint, hogy azt szeretnénk, hogy tudjuk mozgatni-e 
a box-ot vagy nem!!!! 
onmouseup-re azt szeretnénk, hogy nem, ezért a grabbed értéke az false lesz!!!
onmousedown-ra meg azt szeretnénk, hogy igen, ezért grabbed értéke az true lesz!! 
fontos, hogy az onmouseleave-nél szeretnénk lehelyezni a box-ot 
!!!!!!!!!!!!! 
kezdésnél van egy értéke ami a position 
    const [position, setPosition] = useState({
        x: window.innerWidth / 2 - 150,
        y: window.innerHeight / 2 - 150
    })
mivel a box teljesen középen van és 300px magas és széles ez lesz a box-nak a közepe 
de ha viszont megváltozik a képernyő, akkor a resize-val megadjuk neki ugyanezeket az értékeket és akkor a useState-s position-ban 
már més értékek fognak szerepelni, mert a innerWidth meg az innerHeight az megváltozott!!!! 

fontos visszatérve a onmouseleave-re, hogy ott akarjuk letenni a box-ot, ahol felengedtük az egér gombját!!!! 
Ezért nekünk a movementX-vel frissíteni kell a x-et, hozzáadni az eredeti értékéhez, hogy mennyit mentünk el és ugyanezt az y-val is!!!! 
és akkor tudjuk, hogy mennyit mentünk el!!!! 
        <div className="message-box"
        style={{
            display:!show ? "none" : "block",
            left: position.x,
            top: position.y
        }}>
style-ban meg a left-nek megadjuk az position-ben eltárolt x értéket a top-nak meg a y-t 
és akkor ott fog megjelenni ahol leraktuk onmousedown-val!!!!! 

és itt még van egy display is, mert a box-on van egy x gomb és azt akarjuk, hogyha azt megnyomjuk, akkor ne látszodjon!!! 
<FontAwesomeIcon onClick={()=>setShow(false)} icon="fa-solid fa-circle-x-mark" className="pointer"/>
*/

export default MessageBox;