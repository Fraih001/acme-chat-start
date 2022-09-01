import React from 'react'
import {connect} from 'react-redux'
import {createMessage} from '../store'

/**
 * COMPONENT
 */
export const Chat = ({ messages, onlineUsers, postMessage })=> {
  const [txt, setTxt ] = React.useState('');
  const [toId, setToId] = React.useState('');
  return (
    <div>
      <form onSubmit = {(ev)=> {
        ev.preventDefault();
        postMessage({toId, txt});
      }}>
        <select size={ onlineUsers.length + 1} value={ toId} onChange={ ev => setToId(ev.target.value)}>
          <option value=''>--- everyone ---</option>
        </select>
        <input onChange={ ev => setTxt(ev.target.value)}/>
        <button>Create</button>
      </form>
      <h3>Messages {messages.length}</h3>
      <ul>
        {
          messages.map( message => {
            return (
              <li key={ message.id }>
                To { message.to ? message.to.username : 'everyone' } "{ message.txt }" from { message.from.username }
              </li>
            );
          })
        }
      </ul>
    </div>
  )
}


export default connect(
  state => state,
  dispatch => {
    return {
      postMessage: (msg)=> dispatch(createMessage(msg))
    }
  }
)(Chat)
