import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
        return (
            <div className='home-container'>
                <div className='home-heading'>
                    <h2>Welcome to OneStore.</h2>
                    <h4>One stop solution to all storage need</h4>
                </div>
                <div className='services'>
                    <h3>Choose from below service</h3>
                    <button className="home-upload" onClick={() => navigate('/upload')}>Upload Files</button>
                    <button className="home-view" onClick={() => navigate('/myFiles')}>View Files</button>
                    <button className="home-delete" onClick={() => navigate('/myFiles')}>Delete Files</button>
                </div>
            </div>
        );
    };
export default HomePage;