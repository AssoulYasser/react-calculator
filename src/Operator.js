import {ACTION} from './App'

function Operator({operator, dispatch}) {

    const click = () => {
        dispatch({ type: ACTION.onOPERATION, payload: operator });
      };

    return (
        <button className='operator' onClick={click}>
            {operator}
        </button>
    )
}

export default Operator