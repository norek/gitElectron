import { IAppState } from './IAppState';
import { CommitDetails } from '../commit/commit.service';
import { REQUEST_COMMIT_DETAILS } from './commit.actions';


const initialState: IAppState = {
    commitDetails: new CommitDetails()
};

function requestCommitDetails(state, action): IAppState {
    return Object.assign({}, state,
        { commitDetails: new CommitDetails() });
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_COMMIT_DETAILS:
            return requestCommitDetails(state, action);
        default:
            return state;
    }
}
