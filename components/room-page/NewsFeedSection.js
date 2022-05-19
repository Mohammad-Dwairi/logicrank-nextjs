import classes from './styles.module.scss';
import Post from "./Post";
import {useEffect, useState} from "react";
import {loadDocs, loadDocsByQuery} from "../../store/actions/firestore-docs-actions";
import {useRouter} from "next/router";
import {collection, getDocs, query, orderBy, limit} from "firebase/firestore";
import {db} from "../../firebase";

const renderPosts = posts => Object.keys(posts).map(postUID => <Post post={posts[postUID]} key={postUID}/>);

const NewsFeedSection = () => {

    const [posts, setPosts] = useState({});
    const router = useRouter();
    const {rid} = router.query;

    useEffect(() => {
        const handle = async () => {
            const postsColRef = collection(db, 'roomsDetails', rid, 'posts');
            const q = query(postsColRef, orderBy("datePosted", "desc"), limit(100));
            const querySnapshot = await getDocs(q);
            const fetchedPosts = {};
            querySnapshot.forEach(doc => {
                fetchedPosts[doc.id] = doc.data();
            });
            setPosts(fetchedPosts);
        };
        handle();
    }, []);


    return (
        <section className={classes.newsFeed}>
            {renderPosts(posts)}
        </section>
    );
};

export default NewsFeedSection;