import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    },
    onError: () => {
      dispatch({
        type: 'ERROR',
        payload: 'anecdote must have a length of five or more'
      });
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes:0 });
    dispatch({
      type: 'NOTIFY',
      payload: `new anecdote "${content}" created.`
    });

    setTimeout(() => dispatch({
      type: 'HIDE'
    }), 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate} autoComplete='off'>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  );
};



export default AnecdoteForm;