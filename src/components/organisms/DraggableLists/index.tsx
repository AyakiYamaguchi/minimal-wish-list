import React, { FC } from 'react';
import ListItem from '../../molecules/ListItem';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { WishList } from '../../../store/index';

type Props = {
  listType: 'wish-lists' | 'discard-lists'
  lists: any[];
  reorderList: Function;
}

const DraggableLists:FC<Props> = ({listType, lists, reorderList}) => {

  const onDragEnd = (result:any) => {
    console.log('-----並び替え前-----')
    console.log(result)
    // 並び替えされていない場合
    if(!result.destination){
      return;
    }
    // 並び替え前後で順番が変わっていない場合
    if (result.destination.index === result.source.index) {
      return;
    }
    const items = Array.from(lists);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems)

    reorderList(items)
  }
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists">
          {
            (provided)=> (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {
                  lists.map((list,index)=>{
                    
                    return(
                      <Draggable key={list.id} draggableId={list.id} index={index}>
                        {(provided)=>(
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <ListItem 
                              listType={listType}
                              listName={list.data.listName}
                              iconId={list.data.iconId}
                              listId={list.id}
                            />
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
