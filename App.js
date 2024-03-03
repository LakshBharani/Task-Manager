import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import IconButton from "./components/ui/IconButton";
import { GlobalStyles } from "./constants/styles";
import AllTasks from "./screens/AllTasks";
import ManageTask from "./screens/ManageTask";
import TasksContextProvider from "./store/tasks-context";
import RecentTasks from "./screens/RecentTasks";
import { DarkModeProvider, useDarkMode } from "./store/darkmode-context";
import DarkModeSwitch from "./components/ui/DarkModeSwitch";
import StatusBarComponent from "./components/ui/StatusBar";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TasksOverview() {
  const { isDarkMode } = useDarkMode();

  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: isDarkMode
            ? GlobalStyles.darkColors.primary500
            : GlobalStyles.lightColors.white,
        },
        headerTintColor: isDarkMode
          ? GlobalStyles.darkColors.white
          : GlobalStyles.lightColors.textColor,
        tabBarStyle: {
          backgroundColor: isDarkMode
            ? GlobalStyles.darkColors.primary500
            : GlobalStyles.lightColors.white,
        },
        tabBarActiveTintColor: isDarkMode
          ? GlobalStyles.darkColors.accent500
          : GlobalStyles.lightColors.textColor,
        headerLeft: () => {
          return <DarkModeSwitch />;
        },
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              icon={"add"}
              color={tintColor}
              size={24}
              onPress={() => {
                navigation.navigate("ManageTask");
              }}
            />
          );
        },
      })}
    >
      <BottomTabs.Screen
        name="RecentTasks"
        component={RecentTasks}
        options={{
          title: "Recent Tasks",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllTasks"
        component={AllTasks}
        options={{
          title: "All Tasks",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <DarkModeProvider>
      <>
        <StatusBarComponent />
        <TasksContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="TasksOverview"
              screenOptions={{
                headerBackTitle: "Back",
                headerStyle: {
                  backgroundColor: GlobalStyles.darkColors.primary500,
                },
                headerTintColor: "white",
              }}
            >
              <Stack.Screen
                name="TasksOverview"
                component={TasksOverview}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ManageTask"
                component={ManageTask}
                options={{ presentation: "modal" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </TasksContextProvider>
      </>
    </DarkModeProvider>
  );
}

const styles = StyleSheet.create({});
