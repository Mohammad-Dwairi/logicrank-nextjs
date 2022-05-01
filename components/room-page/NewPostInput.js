import classes from './styles.module.scss';

const NewPostInput = props => {

    return (
        <div className={classes.newPostInput}>
            <textarea placeholder="What's on your mind?" className={classes.textAreaControl}/>
        </div>
    );
};

export default  NewPostInput;