import ErrorGif from '../../resources/gif/error.gif';

const GotError = () => {
    return (
        <figure style={{'textAlign': 'center'}}>
            <img src={ErrorGif} alt="Error" />
        </figure>
    );
}

export default GotError;