import {followApi, usersApi} from "../Api/Api";
import {objectHelpers} from "../Components/utils/objectHelpers";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./reduxStore";
import {Dispatch} from "redux";


const FOLLOW = 'usersReducer/FOLLOW';
const UN_FOLLOW = 'usersReducer/UN_FOLLOW';
const SET_USERS = 'usersReducer/SET_USERS';
const SET_TOTAL_USERS_COUNT = 'usersReducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'usersReducer/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'usersReducer/TOGGLE_IS_FOLLOWING_PROGRESS';


type InitialStateType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: boolean,
}
type FollowSuccessType = {
    type: typeof FOLLOW,
    userId: number
}
type UnFollowSuccessType = {
    type: typeof UN_FOLLOW,
    userId: number
}
type SetUsersType = {
    type: typeof SET_USERS,
    users: UserType[]
}
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
type ToggleIsFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean
}
type ActionType = FollowSuccessType | UnFollowSuccessType | SetUsersType |
    SetTotalUsersCountType | ToggleIsFetchingType | ToggleIsFollowingProgressType
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>


const initialState: InitialStateType = {
    users: [],
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: false,
};


const usersReducer = (state = initialState, action: ActionType): InitialStateType => {

    switch (action.type) {
    case FOLLOW:
        return { ...state,
            users: objectHelpers(state.users, action.userId, "id", {followed:true})};

    case UN_FOLLOW:
        return { ...state,
            users: objectHelpers(state.users, action.userId, "id", {followed:false})};

    case SET_USERS:
        return {...state, users: [...action.users]};

    case SET_TOTAL_USERS_COUNT:
        return {...state, totalUsersCount: action.totalUsersCount};

    case TOGGLE_IS_FETCHING:
        return {...state, isFetching: action.isFetching};

    case TOGGLE_IS_FOLLOWING_PROGRESS:
        return {...state, followingInProgress: action.isFetching};

    default: return state;
    }
};


export const followSuccess = (userId: number): FollowSuccessType =>
    ({type: FOLLOW, userId});
export const unFollowSuccess = (userId: number): UnFollowSuccessType =>
    ({type: UN_FOLLOW, userId});
export const setUsers = (users: UserType[]): SetUsersType =>
    ({type: SET_USERS, users});
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType =>
    ({type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType =>
    ({type: TOGGLE_IS_FETCHING, isFetching });
export const toggleIsFollowingProgress = (isFetching: boolean): ToggleIsFollowingProgressType =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching});


export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async dispatch => {
    dispatch(toggleIsFetching(true));

    const data = await usersApi.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
};

const _followUnFollowFlow = async (dispatch: Dispatch<ActionType>,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => FollowSuccessType | UnFollowSuccessType) => {
    dispatch(toggleIsFollowingProgress(true));
    const data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleIsFollowingProgress(false));
};

export const follow = (userId: number): ThunkType => dispatch => {
    _followUnFollowFlow(dispatch, userId, followApi.getFollow.bind(followApi), followSuccess);
};

export const unFollow = (userId: number): ThunkType => dispatch => {
    _followUnFollowFlow(dispatch, userId, followApi.getUnFollow.bind(followApi), unFollowSuccess);
};


export default usersReducer;