function ErrorMessage({ error }) {
    return (
      <p className="status-text error">
        Error: {error?.message || 'Something went wrong.'}
      </p>
    );
  }
  
  export default ErrorMessage;
  