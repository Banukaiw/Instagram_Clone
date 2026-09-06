import { useNavigate } from 'react-router-dom';
import './More.css';

function More({ onClose }) {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove login information
        localStorage.removeItem('token');

        // If you store other login information, remove them too
        localStorage.removeItem('user');

        // Close popup
        onClose();

        // Go to login page
        navigate('/login', { replace: true });
    };

    return (
        <div className="more-menu">

            <div className="more-menu-items">

                <div className="more-menu-item">
                    <i className="bi bi-gear"></i>
                    <span>Settings</span>
                </div>

                <div className="more-menu-item">
                    <i className="bi bi-activity"></i>
                    <span>Your activity</span>
                </div>

                <div className="more-menu-item">
                    <i className="bi bi-bookmark"></i>
                    <span>Saved</span>
                </div>

                <div className="more-menu-item">
                    <i className="bi bi-moon"></i>
                    <span>Switch appearance</span>
                </div>

                <div className="more-menu-item">
                    <i className="bi bi-exclamation-square"></i>
                    <span>Report a problem</span>
                </div>

            </div>

            <div className="more-divider"></div>

            <div className="more-menu-item">
                <span>Switch accounts</span>
            </div>

            <div className="more-divider"></div>

            <div
                className="more-menu-item logout-item"
                onClick={handleLogout}
            >
                <span>Log out</span>
            </div>

        </div>
    );
}

export default More;