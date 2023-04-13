import { useReducer } from "react";
import "./App.css";
import "./style.css";
import Digit from "./Digit";
import Operator from "./Operator";


const initState = {
    operation: "",
    operator: "",
    input: "0",
    count: 0
};

export const ACTION = {
    onDIGIT: "digit",
    onOPERATION: "opeartion",
    onCLEAR: "clear",
    onNEGATION: "neagtive",
    onCALCULATE: "calculate"
};

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTION.onDIGIT:
            if (payload == "." && state.input.includes(".")) return state;

            if (payload == "DEL") return { ...state, input: "0" };

            if (state.input.length >= 10) return state;

            if (payload == 0 && (state.operator == '/' || state.operator == '%') ) {
                alert("YOU CAN'T DEVIDE ON 0")
                return initState
            }

            return {
            ...state,
            input:
            (state.input == "0" || state.input == "(-0)")
            ? payload == "."
            ? `${state.input}${payload}`
            : `${payload}`
            : `${state.input}${payload}`,
            };

        case ACTION.onOPERATION:

            if(state.input == '0') return {...state, operator: payload}
            
            return {...state
                , operator: payload    
                , count: state.count+1
                , operation: state.count > 0 ? `${state.operation}${state.operator}${state.input}`:`${state.input}`
                , input: '0'}


        case ACTION.onCLEAR:
            return initState

        
        case ACTION.onNEGATION:
            return {...state, input:state.input[0] == '-'? state.input.slice(2,-1) : `(-${state.input})`}


        case ACTION.onCALCULATE:
            if(state.count == 0 || state.input == '0')  return {...state}

            return {...state, input:calculate(state), operation:`${state.operation}${state.operator}${state.input}=`, operator:'', count:0}

        default:
            return initState;
    }
}

function calculate(state){
    let operationList = []
    let operatorList = []
    let start = 0

    for(let i=0 ; i<state.operation.length ; i++){
        if(state.operation[i] == '+' || (state.operation[i] == '-' && state.operation[i-1] != '(') || state.operation[i] == '*' || state.operation[i] == '/' || state.operation[i] == '%'){
            state.operation.slice(start, i).includes('(') ? operationList.push(parseFloat(state.operation.slice(start+1, i-1))) : operationList.push(parseFloat(state.operation.slice(start, i)))
            start = i+1
            operatorList.push(state.operation[i])
        }
    }
    state.operation.slice(start, state.operation.length).includes('(') ? operationList.push(parseFloat(state.operation.slice(start+1, state.operation.length-1))) : operationList.push(parseFloat(state.operation.slice(start, state.operation.length)))
    state.input.includes('(') ? operationList.push(parseFloat(state.input.slice(1,state.input.length-1))) : operationList.push(parseFloat(state.input))
    operatorList.push(state.operator)


    for (let i = 0 ; i < operatorList.length ; i++){
        switch(operatorList[i]){
            case '*':
                operationList[i] *= operationList[i+1]
                operationList.splice(i+1,1)
                operatorList.splice(i,1)
                break
            case '/':
                operationList[i] /= operationList[i+1]
                operationList.splice(i+1,1)
                operatorList.splice(i,1)
                break
            case '%':
                operationList[i] %= operationList[i+1]
                operationList.splice(i+1,1)
                operatorList.splice(i,1)
                break
        }
    }

    while(operatorList.length != 0){
        switch(operatorList[0]){
            case '+':
                operationList[0] += operationList[1]
                operationList.splice(1,1)
                operatorList.splice(0,1)
                break
            case '-':
                operationList[0] -= operationList[1]
                operationList.splice(1,1)
                operatorList.splice(0,1)
                break
        }
    }




    return operationList[0].toString()
}


function App() {
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <div className="Calculator">
            <div className="output">
                <div className="operation">{state.operation}</div>
                <div className="result">{state.input}</div>
            </div>

            <button className="top" onClick={() => dispatch({type:ACTION.onCLEAR})}>C</button>
            <button className="top" onClick={() => dispatch({type:ACTION.onNEGATION})}>+/-</button>
            <button className="top" onClick={() => dispatch({type:ACTION.onOPERATION, payload:"%"})}>%</button>
            <Operator operator="/" dispatch={dispatch} />
            <Digit digit="7" dispatch={dispatch} />
            <Digit digit="8" dispatch={dispatch} />
            <Digit digit="9" dispatch={dispatch} />
            <Operator operator="*" dispatch={dispatch} />
            <Digit digit="4" dispatch={dispatch} />
            <Digit digit="5" dispatch={dispatch} />
            <Digit digit="6" dispatch={dispatch} />
            <Operator operator="-" dispatch={dispatch} />
            <Digit digit="1" dispatch={dispatch} />
            <Digit digit="2" dispatch={dispatch} />
            <Digit digit="3" dispatch={dispatch} />
            <Operator operator="+" dispatch={dispatch} />
            <Digit digit="." dispatch={dispatch} />
            <Digit digit="0" dispatch={dispatch} />
            <Digit digit="DEL" dispatch={dispatch} />
            <button className="operator" onClick={() => dispatch({type:ACTION.onCALCULATE, payload:"="})}>=</button>
            

        </div>
    );
}

export default App;
