import { createStore } from 'redux';
import { IAppState } from './IAppState';
import { reducer } from './reducer';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore<IAppState>(reducer, composeWithDevTools(
    applyMiddleware()
));
