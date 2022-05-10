import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "../store/AuthContext";
import AppNavbar from "../components/layout/AppNavbar";

function MyApp({Component, pageProps}) {
    return (
        <AuthProvider>
            <AppNavbar />
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp
