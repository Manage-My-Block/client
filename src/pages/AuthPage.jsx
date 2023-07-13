
import LoginForm from '../components/LoginForm'
import NewBuildingForm from '../components/NewBuildingForm';
import RegisterForm from '../components/RegisterForm'

// eslint-disable-next-line react/prop-types
export default function AuthPage({ authType }) {

    return (
        <div className='w-full h-screen flex justify-center'>
            <div className='m-auto'>
                {authType === 'login' && <LoginForm />}
                {authType === 'register' && <RegisterForm />}
                {authType === 'create building' && <NewBuildingForm />}
            </div>
        </div>
    )
}
