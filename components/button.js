import styles from '../styles/button.module.css';

export default function Button({ severity, text, onClick }) {
    let buttonStyle = styles.button + ' ';
    if (severity === 'success') {
        buttonStyle = buttonStyle + styles.success;
    }
    else {
        buttonStyle = buttonStyle + styles.error;
    }

    return (
        <div className={buttonStyle} onClick={onClick}>
            <p className={styles.buttonText}>{text}</p>
        </div>
    )
}