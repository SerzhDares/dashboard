import {HeroUIProvider} from "@heroui/react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './store';
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <Provider store={store}>
        <main className="text-foreground bg-background">
          <App />
        </main>
      </Provider>
    </HeroUIProvider>
  </StrictMode>,
);
