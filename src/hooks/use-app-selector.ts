import {TypedUseSelectorHook, useSelector} from 'react-redux';
import type {State} from '../types/state/state';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
