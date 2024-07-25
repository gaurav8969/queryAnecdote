import { useNotificationValue } from '../NotificationContext';

const Notification = () => {

  const base = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const notificationStyle = {
    ...base,
    color: 'green'
  };

  const errorStyle = {
    ...base,
    color: 'red'
  };

  const { success, error } = useNotificationValue();

  if(!success && !error)return;

  if(success){
    return (
      <div style={notificationStyle}>
        {success}
      </div>
    );
  }

  if(error){
    return (
      <div style={errorStyle}>
        {error}
      </div>
    );
  }

};

export default Notification;
