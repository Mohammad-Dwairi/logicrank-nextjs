import AuthPageLayout from "../../components/layout/AuthPageLayout";
import RegistrationForm from "../../components/registration-page/RegistrationForm";


const RegistrationPage = () => {


    return (
       <AuthPageLayout headerTitle='Registration' headerText='We build thinking!'>
           <RegistrationForm />
       </AuthPageLayout>
    );
};


export default RegistrationPage;