const UserOnlineStatus = ({isOnline, noLabel}) => {

    const style = {
        width: '.6rem',
        height: '.6rem',
        backgroundColor: isOnline ? 'green' : 'crimson',
        borderRadius: '1rem',
        display: 'inline-block',
        marginRight: '.5rem'
    }
    return (
        <div>
            <div style={style}/>
            {!noLabel && <span style={{fontSize: '.9rem'}}>{isOnline ? 'Online' : 'Offline'}</span>}
        </div>
    )

};

export default UserOnlineStatus;