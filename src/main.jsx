import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from 'react-auth-kit'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <AuthProvider
        authType={'cookie'}
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={false}>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App />
                {/* <ReactQueryDevtools /> */}
            </QueryClientProvider>
        </BrowserRouter>
    </AuthProvider>
    // </React.StrictMode>
)
