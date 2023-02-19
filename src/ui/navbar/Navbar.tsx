import {Navbar_ApiState} from "./Navbar_ApiState";

export const Navbar = function () {
    return {
        view: () => (

            <nav id="navbar" className="navbar fixed-top">
                <div className="navbar-brand text-center">
                    SQL - Podstawy języka
                </div>

                <Navbar_ApiState/>
            </nav>

        )
    }
}