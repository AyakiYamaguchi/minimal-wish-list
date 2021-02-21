import React, { FC, useContext}from 'react'
import { Emoji } from 'emoji-mart';
import Style from './ListItem.module.scss';
import { AuthContext } from '../../../store/Auth';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { chengeWishListFinished } from '../../../apis/FirebaseWishList';
import { changeDidcardListFinished } from '../../../apis/FirebaseDiscardList';
import { StoreContext, CHANGE_WISH_LIST_FINISHED, CHANGE_DISCARD_LIST_FINISHED} from '../../../store/index';

type Props = {
  listType: string;
  listName: string;
  iconId: string;
  listId: string;
  finished: boolean;
}

const ListItem:FC<Props> = ({listType, listName, iconId, listId , finished}) => {
  const { AuthState } = useContext(AuthContext);
  const { setGlobalState } = useContext(StoreContext);
  const uid = AuthState.user.uid

  const chengeFinished = () => {
    if (listType === 'wish-lists'){
      chengeWishListFinished(uid, listId, !finished).then(()=>{
        setGlobalState({type: CHANGE_WISH_LIST_FINISHED, payload: {wishListId: listId}})
      }).catch(error=>{
        alert(error)
      })
    } else if (listType === 'discard-lists') {
      changeDidcardListFinished(uid, listId, !finished).then(()=>{
        setGlobalState({type: CHANGE_DISCARD_LIST_FINISHED, payload: { discardListId: listId}})
      }).catch(error=>{
        alert(error)
      })
    }
  }
  return (
    <div className={Style.content_wrapper}>
      <Link to={'/'+ listType + '/'+ listId}>
        <div className={Style.list_wrapper}>
          { iconId ? 
            <Emoji emoji={iconId} size={24} key={listId}/> :
              listType === 'wish-lists' ? 
                <FontAwesomeIcon icon={faFire} className={Style.icon}/> :
                <FontAwesomeIcon icon={faTrashAlt} className={Style.icon}/>
          }
          <div className={Style.list_name}>{listName}</div>
          
        </div>
      </Link>
      <div 
        className={`${Style.finish_icon} ${finished && Style.finished_icon}`}
        onClick={chengeFinished}
      >
        <FontAwesomeIcon icon={faCheck}/>
      </div>
    </div>
  )
}

export default ListItem
