import React from "react";
import { createRoot } from "react-dom/client";
import Admin from "./Layout/Admin";
import Homes from "./Pages/Homes";
import {
    BrowserRouter,
    Link,
    NavLink,
    Outlet,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import CategoryIndex from "./Admin/Category/Index";
import CategoryCreate from "./Admin/Category/Create";
import MenuIndex from "./Admin/Menu/Index";
import MenuCreate from "./Admin/Menu/Create";
import MenuEdit from "./Admin/Menu/Edit";
import TableIndex from "./Admin/Table/Index";
import TableCreate from "./Admin/Table/Create";
import TableEdit from './Admin/Table/Edit';
import ReservationCreate from "./Admin/Reservation/Create";
import ReservationIndex from "./Admin/Reservation/Index";
import CategoryEdit from './Admin/Category/Edit';
import StatusIndex from "./Admin/Status/Index";
import StatusCreate from "./Admin/Status/Create";
import StatusEdit from "./Admin/Status/Edit";
import Guest from "./Layout/Guest";
import FontReservationIndex from "./Front/Reservation/Index";
import Thank from './Front/Home/Thank'
import ReservationEdit from "./Front/Reservation/Edit";
import Welcome from "./Front/Welcome/Welcome";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

export default function Hume() {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="admin" element={<Admin />}>
                <Route path="/admin/categories" element={<CategoryIndex />}></Route>
                <Route path="/admin/categories/create" element={<CategoryCreate />}></Route>
                <Route path="/admin/categories/edit/:id" element={<CategoryEdit />}></Route>
            </Route>
            <Route path="admin" element={<Admin />}>
                <Route path="/admin/menu" element={<MenuIndex/>}></Route>
                <Route path="/admin/menu/create" element={<MenuCreate />}></Route>
                <Route path="/admin/menu/edit/:id" element={<MenuEdit />}></Route>
            </Route>
            <Route path="admin" element={<Admin />}>
                <Route path="/admin/table" element={<TableIndex/>}></Route>
                <Route path="/admin/table/create" element={<TableCreate />}></Route>
                <Route path="/admin/table/edit/:id" element={<TableEdit />}></Route>
            </Route>
            <Route path="admin" element={<Admin />}>
                <Route path="/admin/status" element={<StatusIndex/>}></Route>
                <Route path="/admin/status/create" element={<StatusCreate />}></Route>
                <Route path="/admin/status/edit/:id" element={<StatusEdit />}></Route>
            </Route>
            <Route path="admin" element={<Admin />}>
                <Route path="/admin/reservation" element={<ReservationIndex/>}></Route>
                <Route path="/admin/reservation/create" element={<ReservationCreate />}></Route>
                <Route path="/admin/reservation/edit/:id" element={<ReservationEdit/>}></Route>

            </Route>
            <Route element={<Guest />}>
                <Route path="/reservation" element={<FontReservationIndex/>}></Route>
            </Route>
            {/* <Route path="/" element={<Guest />}>
                <Route path="/thankyou" element={<Thank/>}></Route>
            </Route> */}
            <Route path="/" element={<Guest />}>
                <Route path="/" element={<Welcome/>}></Route>
                <Route path="/thankyou" element={<Thank/>}></Route>
            </Route>
            <Route path="login" element={<Guest />}>
                <Route index element={<Login />}></Route>
            </Route>
            <Route path="register" element={<Guest />}>
                <Route index element={<Register />}></Route>
            </Route>
            </Routes>
        </BrowserRouter>
    );
}

if (document.getElementById("app")) {
    createRoot(document.getElementById("app")).render(<Hume />);
}
