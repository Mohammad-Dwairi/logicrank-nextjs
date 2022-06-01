import classes from './styles.module.scss';
import Image from 'next/image';
import FileType from "../files-shared/FileType";

const PostCard = props => {

    const {post, onEdit, onDelete} = props;
    const {attachment} = post;

    return (
        <div className={classes.postCard}>
            <div className={classes.postHeader}>
                <Image src={require('../../public/profile.jpeg')} />
                <div>
                    <div>{post.userName}</div>
                    <div>{new Date(post.datePosted).toDateString()}</div>
                </div>
            </div>
            <div className={classes.postBody}>
                <p>{post.text}</p>
                {attachment && <div>
                    {<FileType type={attachment.type} name={attachment.name} link={attachment.link} iconSize={50}/>}
                </div>}
            </div>

            <div className={classes.postFooter}></div>
        </div>
    );
};

export default PostCard;