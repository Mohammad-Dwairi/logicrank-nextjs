import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "../context/AuthContext";
import PersistState from "../hoc/PersistState";

function MyApp({Component, pageProps}) {

    return (
        <AuthProvider>
            {/*<PersistState>*/}
                <Component {...pageProps} />
            {/*</PersistState>*/}
        </AuthProvider>
    );
}

export default MyApp;
