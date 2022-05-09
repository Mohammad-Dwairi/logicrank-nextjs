import classes from './styles.module.scss';
import LabeledSeparator from "../layout/LabeledSeparator";

const AboutSection = props => {


    return (
        <>
            <LabeledSeparator label='about'/>
            <div className={classes.aboutSection}>
                <table className={classes.infoTable}>
                    <thead>
                        <th colSpan={2}>Contact Information</th>
                    </thead>
                    <tbody>
                    <tr>
                        <th>Phone</th>
                        <td>+96254356574</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>Jordan, Irbid</td>
                    </tr>
                    <tr>
                        <th>E-mail</th>
                        <td>mdwairy@gmail.com</td>
                    </tr>
                    <tr>
                        <th>Codeforces Handle</th>
                        <td>Mohamamd_Dwairi</td>
                    </tr>
                    </tbody>
                </table>
                <table className={classes.infoTable}>
                    <thead>
                    <th colSpan={2}>Basic Information</th>
                    </thead>
                    <tbody>
                    <tr>
                        <th>Birthday</th>
                        <td>June 5, 1992</td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>Male</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AboutSection;