import Navbar from '../features/auth/components/Navbar'

const Layout = ({ children }) => {
    return (
        <div className='layout'>
            <Navbar />
            <div className='layout__content'>
                {children}
            </div>
        </div>
    )
}

export default Layout