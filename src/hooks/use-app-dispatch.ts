import {useDispatch} from 'react-redux';
import type {Dispatch} from '../types/state/state';

export const useAppDispatch = () => useDispatch<Dispatch>();


