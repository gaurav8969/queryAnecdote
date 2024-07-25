import { createContext, useReducer, useContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return { error: '', success: action.payload };
    case 'ERROR':
      return { success: '', error: action.payload };
    case 'HIDE':
      return { error: '', success: '' };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [state, dispatch] = useReducer(notificationReducer, { success: '', error: '' });

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

export const useNotificationValue = () => {
  const { state } = useContext(NotificationContext);
  return state;
};

export const useNotificationDispatch = () => {
  const { dispatch } = useContext(NotificationContext);
  return dispatch;
};