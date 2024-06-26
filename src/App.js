import './App.css';
import Loginn from './views/Loginn';
import Registerr from './views/Register';
import getProduct from './views/getProduct';
import Nav from './components/Navbar1';
import Shopping from './views/shopping';
import myfavourit from './views/myfavourit';
// import cart from './views/cart';
import NotFound from './components/NotFound';
import { CartProvider } from './views/cartContext';
import ShoppingCart from './views/cart';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className='container'>
          <Switch>
            <Route component={Loginn} path="/Login" exact/>
            <Route component={Shopping} path="/" exact/>
            <Route component={Shopping} path="/shop" exact/>
            <Route component={Registerr} path="/Register" exact/>
            <Route component={getProduct} path="/getProduct/:id" exact/>
          {/* <CartProvider>
      <ShoppingCart />
    </CartProvider> */}
            <Route component={myfavourit} path="/myfavourit/" exact/>
            {/* <Route component={cart} path="/cart/" exact/> */}
              <CartProvider>
      {/* <ShoppingCar  t /> */}
            <Route component={ShoppingCart} path="/cart/" exact/>
    </CartProvider>
            <Route component={NotFound} path="*" />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
