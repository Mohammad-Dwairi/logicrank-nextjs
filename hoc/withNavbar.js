import AppNavbar from "../components/layout/AppNavbar";


export function withNavbar(Component) {
    return (
        <>
            <AppNavbar/>
            {Component}
        </>
    );
}