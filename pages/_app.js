import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from "../components/layout/AppNavbar";
import {AuthProvider} from "../context/AuthContext";
import PersistState from "../hoc/PersistState";
import {wrapper} from "../store/store";

function MyApp({Component, pageProps}) {


    return (
        <AuthProvider>
            <PersistState>
                <AppNavbar/>
                <Component {...pageProps} />
            </PersistState>
        </AuthProvider>
    );
}

export default wrapper.withRedux(MyApp);
