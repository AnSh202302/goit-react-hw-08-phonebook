import AuthForm from 'components/Form/AuthForm';
import { useDispatch } from 'react-redux';
import { logIn } from 'store/auth/auth-operations';

export default function LoginPage() {
  const dispatch = useDispatch();

  const handleLogin = values => {
    return dispatch(logIn(values)).unwrap();
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
