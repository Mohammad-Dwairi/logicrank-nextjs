import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "../store/AuthContext";
import AppNavbar from "../components/layout/AppNavbar";
import {UserProvider} from "../store/UserContext";

function MyApp({Component, pageProps}) {
    return (
        <AuthProvider>
            <UserProvider>
                <AppNavbar />
                <Component {...pageProps} />
            </UserProvider>
        </AuthProvider>
    );
}

export default MyApp
