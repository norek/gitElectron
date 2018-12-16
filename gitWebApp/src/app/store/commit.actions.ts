// import { Injectable } from '@angular/core';
// import { Action } from 'redux';

// @Injectable()
// export class CommitActions {

//     static REQUEST_COMMIT_DETAILS = 'REQUEST_COMMIT_DETAILS';

//     constructor() { }


// }
export const REQUEST_COMMIT_DETAILS = 'REQUEST_COMMIT_DETAILS';

export function requestDetails(commitSha: string) {
    return {
        type: REQUEST_COMMIT_DETAILS,
        payload: {
            commitSha
        }
    };
}
