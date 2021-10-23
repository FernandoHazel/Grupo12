import React from 'react';
import image from '../assets/images/logo-DH.png';
import ContentWrapper from './ContentWrapper';
import CategoriesInDb from './CategoriesInDb';
import LastProductInDb from './LastProductInDb';
import SimplePanels from './SimplePanels';
import ChartListProducts from './ChartListProducts';
import ChartListUsers from './ChartListUsers';
import NotFound from './NotFound';
import {Link, Route, Switch} from 'react-router-dom';
import ProductDetail from './ProductDetail';
import UserDetail from './UserDetail';

function SideBar(){
    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src={image} alt="Digital House"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Tablero - Tecnoshop</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>

                {/*<!-- Nav Item - Categorias -->*/}
                <li className="nav-item">
                <Link className="nav-link" to="/CategoriesInDb">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Categorias</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Último producto agregado -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/LastProductInDb">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Último producto agregado</span></Link>
                </li>

                {/*<!-- Nav Item - Estadísticas -->*/}
                <li className="nav-item nav-link">
                <Link className="nav-link" to="/SimplePanels">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Estadísticas</span></Link>
                </li>

                {/*<!-- Nav Item - Tabla de Productos -->
                <li className="nav-item nav-link">
                <Link className="nav-link" to="/ChartListProducts">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tabla de Productos</span></Link>
                </li>

                {/*<!-- Nav Item - Tabla de Usuarios -->*/}
                <li className="nav-item nav-link">
                <Link className="nav-link" to="/ChartListUsers">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Lista de usuarios</span></Link>
                </li>

                <li className="nav-item nav-link">
                <Link className="nav-link" to="/productList">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Lista de productos</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}

            {/*<!-- Microdesafio 1 -->*/}
            {/*<!--<Route exact path="/">
                <ContentWrapper />
            </Route>
            <Route path="/GenresInDb">
                <GenresInDb />
            </Route>
            <Route path="/LastMovieInDb">
                <LastMovieInDb />
            </Route>
            <Route path="/ContentRowMovies">
                <ContentRowMovies />
            </Route>*/}
            {/*<!-- End Microdesafio 1 -->*/}

            {/*<!-- End Microdesafio 2 -->*/}
            <Switch>
                <Route exact path="/">
                    <ContentWrapper />
                </Route>
                <Route path="/CategoriesInDb">
                    <CategoriesInDb />
                </Route>
                <Route path="/LastProductInDb">
                    <LastProductInDb />
                </Route>
                <Route path="/SimplePanels">
                    <SimplePanels />
                </Route>
                <Route exact path="/productList">
                    <ChartListProducts/>
                </Route>
                <Route path="/product/detail/:id" component={ProductDetail}/>
                <Route path="/users/detail/:id" component={UserDetail}/>
                <Route path="/ChartListUsers">
                    <ChartListUsers />
                </Route>
                
                <Route component={NotFound} />
            </Switch>
            {/*<!-- End Microdesafio 2 -->*/}
        </React.Fragment>
    )
}
export default SideBar;