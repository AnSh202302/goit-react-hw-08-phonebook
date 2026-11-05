import { useDispatch } from 'react-redux';
import { register } from 'store/auth/auth-operations';
import AuthForm from 'components/Form/AuthForm';

export default function RegistrationsPage() {
  const dispatch = useDispatch();

  const handleRegister = values => {
    return dispatch(register(values)).unwrap();
  };

  return <AuthForm mode="register" onSubmit={handleRegister} />;
}
