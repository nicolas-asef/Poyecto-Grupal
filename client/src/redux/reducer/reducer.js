
import {
  PUT_WORKER,
  PUT_WORKER_PREMIUM,
  PAY,
  GET_WORKER_CONTRACTS,
  GET_USER_DETAIL,
  LOADING,
  GET_USERS_CONTRACTS,
  GET_WORKER_DETAIL,
  GET_WORKERS,
  GET_JOBS,
  GET_USERS,
  GET_USERNAME,
  POST_USER,
  GET_WORKERS_PREMIUM,
  LOGIN_SUCCES ,
  GET_WORKERS_SEARCH,
  ORDER_BY_RATING,
  FILTER,
  RESET,
  TEMPORAL_LOGOUT,
  PUT_USER,
  GET_USER_ID,
  GET_COUNTRIES,
  UPLOAD_IMAGE,
  CLEAN_DETAIL,
  AGREGAR_SOCKET,
  ADD_FAVORITE,
  DELETED_FAVORITE,
  GET_USER

} from '../actions/actions_vars'


const localStorageAuth = () => {
  const auth = localStorage.getItem("auth");
  if(JSON.parse(auth)) return JSON.parse(auth);
  return { isLoggedIn: false , user: { id : "", name : "",img: "", token: ""}}
}
//Probando

const storagedData = localStorageAuth();

const initialState = {
  workers: [],
  users: [],
  jobs: [],
  workersPremium: [],
  authState: storagedData,
  workerDetail: {},
  selectedContracts: [],
  isLoading: false,
  userDetail: {},
  user: {},
  allCountries: [],
  allWorkers: [],
  filtrado: [],
  uploadedImg: "",
  socket: null,
  popUps: []
}
const reducer = (state = initialState, action) => {
  switch(action.type) {

    case GET_USER:
      return{
        ...state,
        user:action.payload
      }

    case AGREGAR_SOCKET:
      return{
        ...state,
        socket:!state.socket? action.payload : state.socket
      }

    case GET_USER_DETAIL:
      return{
        ...state,
        userDetail: action.payload,
        isLoading:false
      }

    case LOADING:
      return{
        ...state,
        isLoading:true
      }
    case GET_USERS_CONTRACTS:
      return{
        ...state,
        selectedContracts:action.payload,
        isLoading:false
      }

    case GET_WORKER_CONTRACTS:
      return{
        ...state,
        selectedContracts:action.payload,
        isLoading:false
      }

    case GET_WORKER_DETAIL:
      return{
        ...state,
        workerDetail: action.payload,
        isLoading:false
      }
    case GET_USERS:
        return {
          ...state,            
          users: action.payload            
        }
    case GET_USERNAME:
      return {
        ...state,        
        users: action.payload
      }
    case POST_USER:
        return {
          ...state
        }
    case GET_JOBS: 
      return{ 
        ...state,
        jobs : action.payload
    }

    case GET_WORKERS:
      let workers = action.payload      
      var totalrating = 0
      let filteredByPremium = workers.filter((w) => w.premium === false)   //Cambiar a true cuando se pueda ser prermium
      for (let i = 0; i < workers.length; i++) {
        totalrating = 0
        workers[i].Contracts && workers[i].Contracts.map(contract => totalrating = totalrating + contract.rating_W)
        workers[i].rating = totalrating / workers[i].Contracts.length
      }
      return {
        ...state,
        workers: action.payload,
        allWorkers: action.payload,
        filtrado: action.payload,
        workersPremium: filteredByPremium
}
    case RESET: 
    return {
        ...state,
        workers: state.allWorkers
    }

    case LOGIN_SUCCES:
      const authState = {
        isLoggedIn: true,
        user: action.payload
      }

      localStorage.setItem('auth', JSON.stringify(authState));
      return {
        ...state,
        authState
      }

    case GET_WORKERS:
      return {
        ...state,
        users: action.payload 
      }
      case GET_WORKERS_SEARCH:
        let filtrado = state.workers.filter( (e) => e.User.name.toLowerCase().includes(action.payload.toLowerCase()))
        if(filtrado.length === 0) {
          filtrado = state.workers.filter( c => c.Jobs.some( j => j.name.toLowerCase().includes(action.payload.toLowerCase())));
        }
      return {
          ...state,
          workers: action.payload !== "" ? filtrado : state.allWorkers,
          filtrado: action.payload !== "" ? filtrado : state.allWorkers,
        }

      case ORDER_BY_RATING:{
        return {
          ...state,
          workers: action.payload
        }
      }

      case FILTER: {
        return {
          ...state,
          workers: action.payload
        }
      }

      case TEMPORAL_LOGOUT: {
        const authState = {
          isLoggedIn: false,
        }
  
        localStorage.setItem('auth', JSON.stringify(authState));
        return {
          ...state,
          authState
        }
      }

      case GET_USER_ID:
      return {
        ...state,
        users: action.payload 
      }
    case PUT_USER: {
      return{
        ...state
      }
    }
    case GET_COUNTRIES: {
      return{
        ...state,
        allCountries: action.payload
      }
    }
    case PAY:{
      return{
        ...state
      }
    }
    case PUT_WORKER_PREMIUM: {
      return{
        ...state
      }
    }
    case PUT_WORKER: {
      return {
        ...state
      }
    }
    case UPLOAD_IMAGE:{
      return{
        ...state, uploadedImg: action.payload

      }
    }
    case CLEAN_DETAIL: {
      return {
        ...state,
        userDetail: {},
        selectedContracts: []
      }
    }
    case ADD_FAVORITE: {
      return {
        ...state           
      }
    }
    case DELETED_FAVORITE: {
      return {
        ...state
      }
    }
    default:
      return state;
  }
}


export default reducer;
