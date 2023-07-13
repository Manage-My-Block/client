import AuthForm from '../components/AuthForm'

export default function AuthPage({ authType }) {
    return (
        <div className='w-full h-screen flex justify-center'>
            <div className='m-auto'>
                <AuthForm authType={authType} />
            </div>
        </div>
    )
}
