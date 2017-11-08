import { IAppState } from './IAppState';
import { CommitDetails } from '../commit/commit.service';


const initialState: IAppState = {
    commitDetails: new CommitDetails()
};

export function reducer(state = initialState, action) {
    return state;
}
