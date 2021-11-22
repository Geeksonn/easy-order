import styles from '../styles/button.module.css';

export default function Button({ severity, text, onClick }) {
    let buttonStyle = styles.button + ' ';
    if (severity === 'success') {
        buttonStyle = buttonStyle + styles.success;
    }
    else if (severity === 'error') {
        buttonStyle = buttonStyle + styles.error;
    }
    else {
        buttonStyle = buttonStyle + styles.normal;
    }

    return (
        <div className={buttonStyle} onClick={onClick}>
            <p className={styles.buttonText}>{text}</p>
        </div>
    )
}