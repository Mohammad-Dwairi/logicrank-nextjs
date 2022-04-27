import classes from "./styles.module.scss";
import Link from "next/link";
import {navs} from "../../utils/sideNavbar-config";


const renderNavs = navs => (
    navs.map((nav, i) => (
        <Link href={nav.link} key={i}>
            <a>
                {nav.icon}
                {nav.label}
            </a>
        </Link>
    ))
);

const AppSideNavbar = props => {

    return (
        <div>
            <nav className={classes.sideNav}>
                {renderNavs(navs)}
            </nav>
        </div>

    );
};

export default AppSideNavbar;