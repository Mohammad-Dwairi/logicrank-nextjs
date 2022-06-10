import classes from './styles.module.scss';
import UserMessageCard from "./UserMessageCard";


const renderMessagedUsers = messagedUsers => messagedUsers.map(user => (
    <UserMessageCard key={user.id} user={user}/>
));

const UsersMessagesList = props => {

    const {messagedUsers} = props;

    return (
        <section className={classes.messagesListContainer}>
            <header>
                <h1>Chat</h1>
            </header>
            <main>
                {renderMessagedUsers(messagedUsers)}
            </main>
        </section>
    );
};

export default UsersMessagesList;