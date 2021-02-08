import React, { FC, useContext, useState } from 'react';
import ListItem from '../../molecules/ListItem';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { StoreContext, WishList, UPDATE_WISH_LIST } from '../../../store/index';
import { AuthContext } from '../../../store/Auth';
import { updateWishList } from '../../../apis/FirebaseWishList';

type Props = {
  wishLists: WishList[]
}

const DraggableLists:FC<Props> = ({wishLists}) => {
  const {setGlobalState} = useContext(StoreContext);
  const [DraggableWishLists, setDraggableWishLists] = useState(wishLists);
  const {AuthState} = useContext(AuthContext);
  const onDragEnd = (result:any) => {
    console.log(result)
    // 並び替えされていない場合
    if(!result.destination){
      return;
    }
    // 並び替え前後で順番が変わっていない場合
    if (result.destination.index === result.source.index) {
      return;
    }
    const items = Array.from(DraggableWishLists);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems)

    items.map((list, index)=>{
      const currentPriority = index + 1
      if(list.data.priority !== currentPriority){
        updateWishList(AuthState.user.uid, list.id, currentPriority)
          .then(()=>{
            setGlobalState({type: UPDATE_WISH_LIST, payload:{wishList: list}})
          }).catch((error)=>{
            alert(error)
          })
      }
    })
    setDraggableWishLists(items)
    console.log(items)
  }
  
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists">
          {
            (provided)=> (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {
                  DraggableWishLists.map((list,index)=>{
                    
                    return(
                      <Draggable key={list.id} draggableId={list.id} index={index}>
                        {(provided)=>(
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <ListItem listName={list.data.listName} iconId={list.data.iconId} listId={list.id}/>
                          </li>
                        )}
                      </Draggable>
                    )
                  })
                }
              </ul>
            )
          }
          
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default DraggableLists