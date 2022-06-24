import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NewPostInput from "../shared/NewPostInput";
import Container from "react-bootstrap/Container";
import Post from "./Post";
import {fbUploadBlobToStorage} from "../../firebase/functions/firebase-storage-functions";
import {useAuth} from "../../context/AuthContext";
import {useRouter} from "next/router";
import {addDoc, collection, limit, orderBy, query, where} from "firebase/firestore";
import {POSTS_COLLECTION, ROOMS_DETAILS_COLLECTION, USERS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import {db} from "../../firebase/firebase";
import {useCallback, useEffect, useState} from "react";
import LoadingView from "../../hoc/LoadingView";
import {fbQueryDocs} from "../../firebase/functions/firestore-docs-functions";
import Image from "next/image";


const renderPosts = posts => Object.keys(posts).map(postId => <Post post={posts[postId]} key={postId}/>);

const NewsFeedPage = () => {

    const {currentUser, userInfo} = useAuth();
    const {rid} = useRouter().query;
    const [isLoading, setIsLoading] = useState(false);

    const [posts, setPosts] = useState(null);

    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        const postsColRef = collection(db, ROOMS_DETAILS_COLLECTION, rid, POSTS_COLLECTION);
        const q = query(postsColRef, orderBy("datePosted", "desc"), limit(100));
        const fetchedPosts = await fbQueryDocs(q);

        // fetch users who owns the posts
        const userIds = Object.values(fetchedPosts).map(post => post.userId);

        if (userIds && userIds.length > 0) {
            const usersQuery = query(collection(db, USERS_COLLECTION), where("__name__", 'in', userIds));
            const fetchedUsers = await fbQueryDocs(usersQuery);

            // set each user in the post object
            for (let postId of Object.keys(fetchedPosts)) {
                fetchedPosts[postId]['user'] = fetchedUsers[fetchedPosts[postId].userId];
            }

            setPosts(fetchedPosts);
        }

    }, [rid]);

    useEffect(() => {
        fetchPosts().then(() => setIsLoading(false));
    }, [fetchPosts]);

    const buildPostObject = async (text, attachmentFile) => {
        const post = {
            text: text,
            datePosted: +new Date(),
            userId: currentUser.uid,
            userName: userInfo.fullName
        }

        if (attachmentFile) {
            post['attachment'] = {
                link: await fbUploadBlobToStorage(`${rid}/posts`, attachmentFile),
                type: attachmentFile.type,
                size: attachmentFile.size,
                name: attachmentFile.name
            };
        }
        return post;
    };

    const onPostSubmit = async (value, attachmentFile) => {
        setIsLoading(true);
        const post = await buildPostObject(value, attachmentFile);
        const roomDetailsColRef = collection(db, ROOMS_DETAILS_COLLECTION, rid, POSTS_COLLECTION);
        await addDoc(roomDetailsColRef, post);
        fetchPosts().then(() => setIsLoading(false));
    };

    const renderEmptyPlaceholder = () => {
        return (
            <div className='mt-5 d-flex flex-column justify-content-center'>
                <Image src={require('../../public/no-data.svg')} width={250} height={250}/>
                <p className='text-center mt-3 fw-bold '>No Posts yet</p>
            </div>
        );
    };

    if (isLoading) return <LoadingView/>;

    return (
        <Container>
            <Row className='d-flex justify-content-center'>
                <Col xl={7}>
                    <div className='mt-4 bg-light py-4'>
                        <NewPostInput onSubmit={onPostSubmit}/>
                    </div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col xl={7}>
                    {posts ? renderPosts(posts) : renderEmptyPlaceholder()}
                </Col>
            </Row>
        </Container>
    );
};

export default NewsFeedPage;