import AuthForm from '../components/AuthForm'

export default function AuthPage({ authType }) {
    return (
        <div>
            <AuthForm authType={authType} />
        </div>
    )
}
