import classes from './styles.module.scss';
import LabeledSeparator from "../layout/LabeledSeparator";
import EditableText from "../shared/EditableText";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {useDispatch} from "react-redux";
import {updateUserInfo} from "../../store/actions/user-actions";
import {useRouter} from "next/router";

const initState = (val) => val ? val : '';

const AboutSection = ({userInfo}) => {

    const {currentUser} = useAuth();
    const {uid} = currentUser;
    const {uid: routerUID} = useRouter().query;

    const readOnly = uid !== routerUID;

    const [phone, setPhone] = useState(initState(userInfo.phoneNumber));
    const [nationality, setNationality] = useState(initState(userInfo.nationality));
    const [email, setEmail] = useState(initState(currentUser.email));
    const [handle, setHandle] = useState(initState(userInfo.codeforcesHandle));
    const [birthday, setBirthday] = useState(initState(userInfo.birthday));

    const dispatch = useDispatch();

    return (
        <>
            <LabeledSeparator label='about'/>
            <div className={classes.aboutSection}>
                <table className={classes.infoTable}>
                    <thead>
                    <tr>
                        <th colSpan={2}>Contact Information</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>Phone</th>
                        <td>
                            <EditableText
                                readOnly={readOnly}
                                type='number'
                                value={phone}
                                placeholder='Add phone number'
                                onChange={text => setPhone(text)}
                                onFinish={() => dispatch(updateUserInfo(uid, {phoneNumber: phone}))}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>From</th>
                        <td>
                            <EditableText
                                readOnly={readOnly}
                                value={nationality}
                                placeholder='Add nationality'
                                onChange={text => setNationality(text)}
                                onFinish={() => dispatch(updateUserInfo(uid, {nationality}))}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>E-mail</th>
                        <td>
                            <EditableText
                                readOnly
                                type='email'
                                value={email}
                                placeholder='Add email'
                                onChange={text => setEmail(text)}
                                onFinish={() => dispatch(updateUserInfo(uid, {email}))}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Codeforces Handle</th>
                        <td>
                            <EditableText
                                readOnly={readOnly}
                                value={handle}
                                placeholder='Add Codeforces Handle'
                                onChange={text => setHandle(text)}
                                onFinish={() => dispatch(updateUserInfo(uid, {codeforcesHandle: handle}))}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table className={classes.infoTable}>
                    <thead>
                    <tr>
                        <th colSpan={2}>Basic Information</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>Birthday</th>
                        <td>
                            <EditableText
                                readOnly={readOnly}
                                value={birthday}
                                type='date'
                                placeholder='Add Birthday'
                                onChange={text => setBirthday(text)}
                                onFinish={() => dispatch(updateUserInfo(uid, {birthday}))}
                            />
                        </td>
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