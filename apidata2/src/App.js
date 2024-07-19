import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductsP from './components/ProductsP';
import Nav from './components/Nav';
import Contact from './components/Contact';
import CreateProductForm from './components/CreateProductForm';
import { faCircleXmark, faTrashCan, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faCircleXmark, faUpRightFromSquare, faTrashCan);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Nav/>}>
                    <Route index element={<ProductsP/>}/>
                    <Route path="/create-product" 
                    element={<CreateProductForm endpoint={"https://dummyjson.com/products/add"} method="POST"/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/update-product/:id" 
                    element={<CreateProductForm endpoint={"https://dummyjson.com/products"} method={"PUT"}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

/*
Ezek az oldalaink lesznek
1. ProductsP -> itt megjelenítjük az összes terméket 
2. lesz majd egy oldal, ahol csinálni tudunk egy teljesen új terméket és azt felrakni!!!! 
<Route path="/create-product" 
element={<CreateProductForm endpoint={"https://dummyjson.com/products/add"} method="POST"/>}/>
3. lesz egy hasonló, ahol csak valami változtatást csinálunk rajta 
<Route path="/update-product/:id" 
element={<CreateProductForm endpoint={"https://dummyjson.com/products"} method={"PUT"}/>}/>
fontos, hogy itt kell majd id, mert az alapján tudunk majd hozzáférni az adott id-jú termékhez, amin a változtatást akarjuk majd csinálni!!!! 
a termékfelvételnél meg csak az add-ot kell megszólítani!!!!!! 
4. contact 

fontos dinamikusan változó id (:) -> <Route path="/update-product/:id"
*/ 
