interface ErrorMessageProps {
    message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div>
            <p>{message}</p>
        </div>
    )
}

export default ErrorMessage;