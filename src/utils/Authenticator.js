import { useAuthentication } from '../hooks';

const Authenticator = ({ children }) => {
    const isAuthenticated = useAuthentication();

    if (!isAuthenticated) return null;

    return children;
};

export default Authenticator;