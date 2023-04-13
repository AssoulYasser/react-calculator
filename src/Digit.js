import {ACTION} from './App'

function Digit({digit, dispatch}) {

    const click = () => {
        dispatch({ type: ACTION.onDIGIT, payload: digit });
      };

    return (
        <button onClick={click}>
            {digit}
        </button>
    )
}

export default Digit