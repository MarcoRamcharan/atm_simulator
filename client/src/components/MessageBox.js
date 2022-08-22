const MessageBox = ({message, close}) => {
    return ( 
        <div className="messagebox">
            <p>{message}</p>
            <button onClick={close}>close</button>
        </div>
     );
}
 
export default MessageBox;