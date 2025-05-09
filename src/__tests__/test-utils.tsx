import type React from "react";
import type { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";

import { setupStore } from "../store/store";
import type { IRootState, AppStore } from "../store/store";
import { MemoryRouter } from "react-router-dom";
import { initialMenu } from "../data/initialMenu";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<IRootState>;
  store?: AppStore;
}

// Default preloaded state
const defaultPreloadedState: Partial<IRootState> = {
  myCart: [],
  menu: initialMenu(),
  orderHistory: [],
};

let store: AppStore = setupStore(defaultPreloadedState);

// Function to reset the store to its initial state
export function resetMockStore(): void {
  store = setupStore(defaultPreloadedState);
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    store: customStore = store,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={customStore}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
