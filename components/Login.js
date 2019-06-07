import { useFirebaseAuth, AuthProvider } from '@use-firebase/auth';
 
const NonAuthenticatedApp = () => {
  const [message, setMesage] = useState('');
  const { signIn, createAuthProvider } = useFirebaseAuth();
 
  const signInWithRedirect = authProvider => {
    setMesage('');
    const provider = createAuthProvider(authProvider);
    signIn(provider).catch(error => {
      setMesage(error.message);
    });
  };
 
  return (
    <div>
      <h1>Please Sign In</h1>
      <p>
        <button onClick={() => signInWithRedirect(AuthProvider.GOOGLE)}>
          Sign In with Google
        </button>
      </p>
      {message && <div className="error-message">{message}</div>}
    </div>
  );
};