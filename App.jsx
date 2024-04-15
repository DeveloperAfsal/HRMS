import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from "react-native";
import AppNav from "./Components/AppNav/AppNav";
import { Provider } from "react-redux";
import store from "./store";


const App = () => {
  return (

    <Provider store={store}>
      <StatusBar backgroundColor="#e5e8ff" barStyle="dark-content" />
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </Provider>

  );
};

export default App;