import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type State = {
  showHiddenFiles: boolean;
};

const initialState: State = {
  showHiddenFiles: false,
};

export const Store = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    toggleHiddenFiles: () =>
      patchState(store, (state) => ({
        ...state,
        showHiddenFiles: !state.showHiddenFiles,
      })),
  })),
);
