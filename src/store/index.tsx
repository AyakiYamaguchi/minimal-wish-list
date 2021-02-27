import React ,{ createContext, useReducer, FC } from 'react'

export type Memo = {
  text: string;
  createdAt: any;
  updatedAt: any;
}

export type fixedDate = {
  year: number;
  month: number;
  date: number;
}

export type WishList = {
  id: string;
  discardListId: string;
  data: {
    listName: string;
    iconId: string;
    priority: number;
    finished: boolean;
    fixedDate?: fixedDate;
    createdAt: Date;
    updatedAt: Date;
  }
  memos: Memo[];
}

export type DiscardList = {
  id: string;
  wishListId?: string;
  data: {
    listName: string;
    iconId: string;
    priority: number;
    finished: boolean;
    fixedDate?: fixedDate;
    createdAt: Date;
    updatedAt: Date;
  }
  memos: Memo[];
}


type State = {
  wishLists: WishList[];
  discardLists: DiscardList[];
}

// WishList
export const SET_WISH_LISTS = 'SET_WISH_LISTS';
export const CREATE_WISH_LIST = 'CREATE_WISH_LIST';
export const UPDATE_WISH_LIST = 'UPDATE_WISH_LIST';
export const DELETE_WISH_LIST = 'DELETE_WISH_LIST';
export const CHANGE_WISH_LIST_FINISHED = 'CHANGE_WISH_LIST_FINISHED';
export const ADD_WISH_LIST_MEMO = 'ADD_WISH_LIST_MEMO';

// DiscardList
export const SET_DISCARD_LISTS = 'SET_DISCARD_LISTS';
export const CRATE_DISCARD_LIST = 'CRATE_DISCARD_LIST';
export const UPDATE_DISCARD_LIST = 'UPDATE_DISCARD_LIST';
export const DELETE_DISCARD_LIST = 'DELETE_DISCARD_LIST';
export const CHANGE_DISCARD_LIST_FINISHED = 'CHANGE_DISCARD_LIST_FINISHED';
export const ADD_DISCARD_LIST_MEMO = 'ADD_DISCARD_LIST_MEMO';

type Action = 
{ type: 'SET_WISH_LISTS', payload: { wishLists: WishList[] }} |
{ type: 'CREATE_WISH_LIST', payload: { wishList: WishList }} |
{ type: 'UPDATE_WISH_LIST', payload: { wishList: WishList }} |
{ type: 'DELETE_WISH_LIST', payload: { wishListId: string }} |
{ type: 'SET_DISCARD_LISTS', payload: { discardLists: DiscardList[] }} |
{ type: 'CRATE_DISCARD_LIST', payload: { discardList: DiscardList }} |
{ type: 'UPDATE_DISCARD_LIST', payload: { discardList: DiscardList }} |
{ type: 'DELETE_DISCARD_LIST', payload: { discardListId: string }} |
{ type: 'CHANGE_WISH_LIST_FINISHED', payload: { wishListId: string }} |
{ type: 'CHANGE_DISCARD_LIST_FINISHED', payload: { discardListId: string }}|
{ type: 'ADD_WISH_LIST_MEMO', payload: { wishListId: string, memo: Memo }}|
{ type: 'ADD_DISCARD_LIST_MEMO', payload: { discardListId: string, memo: Memo }};

const initialState:State = {
  wishLists: [],
  discardLists: [],
}

const reducer = (state: State, action: Action ) => {
  switch(action.type){
    // WishList関連
    case SET_WISH_LISTS:
      const wishLists = action.payload.wishLists.sort((a,b)=>{
        if(a.data.priority < b.data.priority) return -1;
        if(a.data.priority > b.data.priority) return 1;
        return 0;
      })
      return { ...state, wishLists: wishLists }
    case UPDATE_WISH_LIST:
      const wishList = action.payload.wishList
      const updatedWishLists = state.wishLists.map((list)=>{
        if(list.id === wishList.id){
          return wishList
        }
        return list
      })
      updatedWishLists.sort((a,b)=>{
        if(a.data.priority < b.data.priority) return -1;
        if(a.data.priority > b.data.priority) return 1;
        return 0;
      })
      return { ...state, wishLists: updatedWishLists}
    case DELETE_WISH_LIST:
      const daletedWishLists = state.wishLists.filter(list=>
        list.id !== action.payload.wishListId
      )
      return { ...state, wishLists: daletedWishLists }
      case CHANGE_WISH_LIST_FINISHED:
      const changedFinishedWishList = state.wishLists.map(list=>{
        if(list.id === action.payload.wishListId){
          return {...list, data: {...list.data, finished: !list.data.finished} }
        }
        return list
      })
      return { ...state, wishLists: changedFinishedWishList }
    case ADD_WISH_LIST_MEMO: 
      return { ...state, wishLists: state.wishLists.map(list=>{
        if(list.id === action.payload.wishListId){
          list.memos?.push(action.payload.memo)
          return list
        }
        return list
      })}

    // DiscardList 関連
    case SET_DISCARD_LISTS:
      return { ...state, discardLists: action.payload.discardLists }
    case UPDATE_DISCARD_LIST:
      const discardList = action.payload.discardList
      const updatedDiscardLists = state.discardLists.map(list =>{
        if(list.id === discardList.id){
          return discardList
        }
        return list
      })
      return { ...state, discardLists: updatedDiscardLists}
    case DELETE_DISCARD_LIST:
      const daletedDiscardLists = state.discardLists.filter(list=>
        list.id !== action.payload.discardListId
      )
      return { ...state, discardLists: daletedDiscardLists }
    case CHANGE_DISCARD_LIST_FINISHED:
      const changedFinishedDiscardList = state.discardLists.map(list=>{
        if(list.id === action.payload.discardListId){
          return {...list, data: {...list.data, finished: !list.data.finished} }
        }
        return list
      })
      return { ...state, discardLists: changedFinishedDiscardList }
    case ADD_DISCARD_LIST_MEMO: 
      return { ...state, discardLists: state.discardLists.map(list=>{
        if(list.id === action.payload.discardListId){
          list.memos?.push(action.payload.memo)
          return list
        }
        return list
      })}
    default:
      return state
  }
}

type ContextType = {
  globalState: State,
  setGlobalState: React.Dispatch<Action>
}

export const StoreContext = createContext({} as ContextType)

export const StoreProvider:FC = ({children}) => {
  const [globalState, setGlobalState] = useReducer( reducer, initialState)
  return (
    <StoreContext.Provider value={{globalState, setGlobalState}}>
      { children }
    </StoreContext.Provider>
  )
}