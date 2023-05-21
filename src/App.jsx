import './assets/css/style.css'
import './assets/css/bootstrap.min.css'
import {useState} from "react";
import {Link, Route, Routes, useLocation} from "react-router-dom";
import Instance from "./http/Instance";
import Main from "./components/Main";
import Register from "./components/Register";
import Login from "./components/Login";
import Orders from "./components/Orders";
import Cart from "./components/Cart";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const logout = async () => {
    await Instance('logout')
    localStorage.removeItem('token')
    setToken(null)
  }

  const { pathname } = useLocation()

  const routers = {
    '/': 'Каталог товаров',
    '/register': 'Регистрация',
    '/login': 'Авторизация',
    '/cart': 'Корзина',
    '/orders': 'Ваши заказы'
  }

  return (
    <div className="container py-3">
      <header>
        <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
            <span className="fs-4">«MyShop»</span>
          </a>

          <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
            {
              token ?
                  <>
                    <Link className="me-3 py-2 text-dark text-decoration-none" to='/orders'>Мои заказы</Link>
                    <Link className="me-3 py-2 text-dark text-decoration-none" to='/cart'>Корзина</Link>
                    <Link onClick={() => logout()} className="me-3 py-2 text-dark text-decoration-none" to='/'>Выйти</Link>
                  </>
                  :
                  <>
                    <Link className="me-3 py-2 text-dark text-decoration-none" to="/register">Регистрация</Link>
                    <Link className="me-3 py-2 text-dark text-decoration-none" to="/login">Авторизация</Link>
                  </>
            }
          </nav>
        </div>

        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 className="display-4 fw-normal">{routers[pathname]}</h1>
        </div>
      </header>
      <Routes>
        <Route index element={<Main token={token} />}/>
        <Route path={"register"} element={<Register />}/>
        <Route path={"login"} element={<Login setToken={setToken}/>}/>
        <Route path={"orders"} element={<Orders />}/>
        <Route path={"cart"} element={<Cart />}/>
      </Routes>
      <footer className="pt-4 my-md-5 pt-md-5 border-top">
        <div className="row">
          <div className="col-12 col-md">
            <small className="d-block mb-3 text-muted">&copy; 2017–2021</small>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
