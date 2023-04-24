import BookingPage from '../pages/booking/Booking.container'
import HomePage from '../pages/home/Home.container'
import LoginPage from '../pages/login/Login.container'
import ProductPage from '../pages/product/Product.container'
import ProductSearchPage from '../pages/productSearch/ProductSearch.container'
import RegisterPage from '../pages/register/Register.container'
import FavouritesPage from '../pages/favourites/Favourites.container'
import ProfilePage from '../pages/profile/Profile.container'
import AdminPage from '../pages/admin/Admin.container'
import Error from '../pages/result/Error'
import Succes from '../pages/result/Succes'
import MyBookingsPage from '../pages/bookings/MyBookings.container'
import AdminSuccess from '../pages/result/AdminSuccess'
import AdminError from '../pages/result/AdminError'
import VerificationPage from '../pages/verification/VerificationPage'

export const routes = [
    {   
        "type": "hidden",
        "key": "home",
        "label": "Home",
        "path": "/",
        "element": <HomePage />
    },
    {   
        "type": "route",
        "key": "register",
        "label": "Crear cuenta",
        "path": "/register",
        "element": <RegisterPage />
    },
    {   
        "type": "route",
        "key": "login",
        "label": "Iniciar sesión",
        "path": "/login",
        "element": <LoginPage />
    },
    {   
        "type": "hidden",
        "key": "result",
        "label": "",
        "path": "/product",
        "element": <ProductSearchPage />
    },
    {   
        "type": "hidden",
        "key": "product",
        "label": "",
        "path": "/product/filter",
        "element": <ProductSearchPage />
    },
    {   
        "type": "hidden",
        "key": "product",
        "label": "",
        "path": "/product/:id",
        "element": <ProductPage />
    },
    {   
        "type": "hidden",
        "key": "booking",
        "label": "",
        "path": "/product/:id/booking",
        "element": <BookingPage />
    },
    {   
        "type": "hidden",
        "key": "success",
        "label": "",
        "path": "/product/:id/booking/success",
        "element": <Succes />
    },
    {   
        "type": "hidden",
        "key": "error",
        "label": "",
        "path": "/product/:id/booking/error",
        "element": <Error />
    },
    {   
        "type": "hidden",
        "key": "adminSuccess",
        "label": "",
        "path": "/admin/success",
        "element": <AdminSuccess />
    },
    {   
        "type": "hidden",
        "key": "adminError",
        "label": "",
        "path": "/admin/error",
        "element": <AdminError />
    },
    {   
        "type": "route",
        "key": "profile",
        "label": "Perfil",
        "icon": "fa-solid fa-user",
        "path": "/profile",
        "element": <ProfilePage />
    },
    {   
        "type": "route",
        "key": "bookings",
        "label": "Reservas",
        "icon": "fa-solid fa-bookmark",
        "path": "/profile/bookings",
        "element": <MyBookingsPage />
    },
    {   
        "type": "route",
        "key": "favs",
        "label": "Favoritos",
        "icon": "fa-solid fa-heart",
        "path": "/favs",
        "element": <FavouritesPage />
    },
    {   
        "type": "admin",
        "key": "admin",
        "label": "Admin",
        "icon": "fa-solid fa-user-gear",
        "path": "/admin",
        "element": <AdminPage />
    },
    {   
        "type": "hidden",
        "key": "verification",
        "label": "",
        "icon": "",
        "path": "/user/verification/:code",
        "element": <VerificationPage />
    },
    {   
        "type": "hidden",
        "key": "notfound",
        "label": "",
        "path": "*",
        "element": <div>Not found</div>
    }
]