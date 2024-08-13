import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import { AppMain } from "./components/AppMain/AppMain";
import "./App.css";
import React from "react";
import { CardListProvider } from "./components/Context/CardListProvider";

const App = () => {
  return (
    <AppLayout>
      <CardListProvider>
        <AppHeader />
        <AppMain />
      </CardListProvider>
    </AppLayout>
  );
};

export { App };
