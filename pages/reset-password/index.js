import AuthPageLayout from "../../components/layout/AuthPageLayout";
import ResetPasswordForm from "../../components/reset-password-page/ResetPasswordForm";
import AppFooter from "../../components/layout/AppFooter";
import {withPublic} from "../../hoc/RouteAuth";


const ResetPasswordPage = () => {


    return (
        <>
            <AuthPageLayout isResetPage>
                <ResetPasswordForm/>
            </AuthPageLayout>
            <AppFooter/>
        </>

    );
};

export default withPublic(ResetPasswordPage);