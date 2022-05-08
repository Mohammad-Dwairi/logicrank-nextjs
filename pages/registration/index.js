import AuthPageLayout from "../../components/layout/AuthPageLayout";
import RegistrationForm from "../../components/registration-page/RegistrationForm";
import {withPublic} from "../../hoc/RouteAuth";
import AppFooter from "../../components/layout/AppFooter";


const RegistrationPage = () => {


    return (
        <>
            <AuthPageLayout headerTitle='Registration' headerText='We build thinking!'>
                <RegistrationForm />
            </AuthPageLayout>
            <AppFooter />
        </>

    );
};


export default withPublic(RegistrationPage);