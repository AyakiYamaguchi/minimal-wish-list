import React, { FC } from 'react';
import ListItem from '../../molecules/ListItem';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Style from './DraggableLists.module.scss';

type Props = {
  listType: 'wish-lists' | 'discard-lists'
  lists: any[];
  reorderList: Function;
  updateFirestoreList: Function;
}

const DraggableLists:FC<Props> = ({listType, lists, reorderList, updateFirestoreList}) => {

  // const onDragUpdate = (result: any) => {
  //   if(!result.destination){
  //     return;
  //   }
  //   // 並び替え前後で順番が変わっていない場合
  //   if (result.destination.index === result.source.index) {
  //     return;
  //   }
  //   const items = Array.from(lists);
  //   const [reorderedItems] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItems)

  //   reorderList(items)
  // }

  const onDragEnd = (result:any) => {
    console.log('-----並び替え前-----',result)
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
    updateFirestoreList(items)
  }
  return (
    <div>
      { lists.length === 0 ? 
        <div className={Style.empty_area}>
          <p className={Style.empty_message}>まだリストが登録されていません。</p>
          <p className={Style.empty_message}>+ボタンからリストを追加しましょう。</p>
        </div> :
      
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
                                finished={list.data.finished}
                                fixedDate={list.data.fixedDate}
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
      }
    </div>
  )
}

export default DraggableLists
