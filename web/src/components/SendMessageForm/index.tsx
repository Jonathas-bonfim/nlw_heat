import styles from './styles.module.scss';

import { useContext, useState, FormEvent } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { AuthContext } from '../../context/auth';

import { api } from '../../services/api';


export function SendMessageForm() {
  const { user, singOut } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  // cadastrando a mensagem
  async function HandleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    await api.post('messages', { message });
    setMessage('');
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={singOut} className={styles.singOutButton}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>

        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form onSubmit={HandleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={event => setMessage(event.target.value)}
          value={message}
        />

        <button type="submit">Enviar sua mensagem</button>
      </form>


    </div>
  )
}