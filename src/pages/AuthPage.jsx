import LoginForm from '../components/Login/LoginForm'
import NewBuildingForm from '../components/Login/NewBuildingForm';
import RegisterForm from '../components/Login/RegisterForm'

// eslint-disable-next-line react/prop-types
export default function AuthPage({ authType }) {

    return (
        <div className='h-screen grid place-items-center'>

            <div className='w-full md:max-w-md text-center'>
                {authType === 'login' && <LoginForm />}
                {authType === 'register' && <RegisterForm />}
                {authType === 'create building' && <NewBuildingForm />}
            </div>

        </div>
    )
}
