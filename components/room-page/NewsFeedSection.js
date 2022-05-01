import classes from './styles.module.scss';
import Post from "./Post";

const renderPosts = posts => posts.map((post, i) => <Post post={post} key={i}/>);

const NewsFeedSection = props => {

    return (
        <section className={classes.newsFeed}>
            {renderPosts(DUMMY_POSTS)}
        </section>
    );
};

const DUMMY_POSTS = [
    {
        userName: 'Mohammad Dwairi',
        timePosted: '2',
        likes: '3',
        comments: [],
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque doloremque eligendi laudantium obcaecati sapiente. Dicta eaque facere fugiat, ipsam nam natus omnis possimus quaerat quibusdam saepe sapiente tempora tenetur veniam?',
        imageURL: 'https://lifesupportscounselling.com.au/wp-content/uploads/2017/01/problem-solving-anger-management.png'
    },
    {
        userName: 'Mohammad Dwairi',
        timePosted: '2',
        likes: '3',
        comments: [],
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque doloremque eligendi laudantium obcaecati sapiente. Dicta eaque facere fugiat, ipsam nam natus omnis possimus quaerat quibusdam saepe sapiente tempora tenetur veniam?'
    },
    {
        userName: 'Mohammad Dwairi',
        timePosted: '2',
        likes: '3',
        comments: [],
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque doloremque eligendi laudantium obcaecati sapiente. Dicta eaque facere fugiat, ipsam nam natus omnis possimus quaerat quibusdam saepe sapiente tempora tenetur veniam?'
    },

];

export default NewsFeedSection;