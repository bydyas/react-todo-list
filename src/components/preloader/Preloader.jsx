import './Preloader.scss';

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="preloader__spinner">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Preloader;