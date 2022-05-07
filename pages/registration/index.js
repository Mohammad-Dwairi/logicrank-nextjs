import AuthPageLayout from "../../components/layout/AuthPageLayout";
import RegistrationForm from "../../components/registration-page/RegistrationForm";
import {withPublic} from "../../hoc/RouteAuth";


const RegistrationPage = () => {


    return (
       <AuthPageLayout headerTitle='Registration' headerText='We build thinking!'>
           <RegistrationForm />
       </AuthPageLayout>
    );
};


export default withPublic(RegistrationPage);