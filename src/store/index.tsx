import React ,{ createContext, useReducer, FC } from 'react'

export type WishList = {
  id: string;
  discardListId: string;
  data: {
    listName: string;
    iconId: string;
    priority: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

export type DiscardList = {
  id: string;
  wishListId?: string;
  data: {
    listName: string;
    iconId: string;
    priority: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

type State = {
  wishLists: WishList[];
  discardLists: DiscardList[];
}

export const SET_WISH_LISTS = 'SET_WISH_LISTS';
export const CREATE_WISH_LIST = 'CREATE_WISH_LIST';
export const UPDATE_WISH_LIST = 'UPDATE_WISH_LIST';
export const DELETE_WISH_LIST = 'DELETE_WISH_LIST';
export const SET_DISCARD_LISTS = 'SET_DISCARD_LISTS';
export const CRATE_DISCARD_LIST = 'CRATE_DISCARD_LIST';
export const UPDATE_DISCARD_LIST = 'UPDATE_DISCARD_LIST';
export const DELETE_DISCARD_LIST = 'DELETE_DISCARD_LIST';

type Action = 
{ type: 'SET_WISH_LISTS', payload: { wishLists: WishList[] }} |
{ type: 'CREATE_WISH_LIST', payload: { wishList: WishList }} |
{ type: 'UPDATE_WISH_LIST', payload: { wishList: WishList }} |
{ type: 'DELETE_WISH_LIST', payload: { wishListId: string }} |
{ type: 'SET_DISCARD_LISTS', payload: { discardLists: DiscardList[] }} |
{ type: 'CRATE_DISCARD_LIST', payload: { discardList: DiscardList }} |
{ type: 'UPDATE_DISCARD_LIST', payload: { discardList: DiscardList }} |
{ type: 'DELETE_DISCARD_LIST', payload: { discardList: DiscardList }};

const initialState:State = {
  wishLists: [],
  discardLists: [],
}

const reducer = (state: State, action: Action ) => {
  switch(action.type){
    case 'SET_WISH_LISTS':
      return { ...state, wishLists: action.payload.wishLists }
    case 'UPDATE_WISH_LIST':
      const wishList = action.payload.wishList
      const updatedWishLists = state.wishLists.map((list)=>{
        if(list.id === wishList.id){
          return wishList
        }
        return list
      })
      return { ...state, wishLists: updatedWishLists}
    case 'SET_DISCARD_LISTS':
      return { ...state, discardLists: action.payload.discardLists }
    case 'UPDATE_DISCARD_LIST':
      const discardList = action.payload.discardList
      const updatedDiscardLists = state.discardLists.map(list =>{
        if(list.id === discardList.id){
          return discardList
        }
        return list
      })
      return { ...state, discardLists: updatedDiscardLists}
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