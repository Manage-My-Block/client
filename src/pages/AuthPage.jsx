
import LoginForm from '../components/LoginForm'
import NewBuildingForm from '../components/NewBuildingForm';
import RegisterForm from '../components/RegisterForm'

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
