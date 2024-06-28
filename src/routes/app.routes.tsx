import { createBottomTabNavigator, BottomTabNavigationProp }
  from '@react-navigation/bottom-tabs'
import { useTheme } from 'styled-components'
import { MaterialIcons } from '@expo/vector-icons'

import { Dashboard } from '../pages/Dashboard'
import { ListData } from '../pages/List'
import { SearchExpenses }
  from '../pages/Search'
import { Resume } from '../pages/Resume'

type AppRoutes = {
  dashboard: undefined;
  listData: undefined;
  searchExpenses: undefined;
  resume: undefined
}

export type AppNavigationRoutesProp =
  BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const theme = useTheme()

  return (
    <Navigator screenOptions={{
      headerShown: false,
      // tabBarShowLabel: false,
      tabBarLabelPosition: 'beside-icon',
      tabBarActiveTintColor: theme.colors.secondary,
      tabBarInactiveTintColor: theme.colors.text,
      tabBarStyle: {
        height: 88
      }
    }}>
      <Screen
        name='dashboard'
        component={Dashboard}
        options={{
          tabBarLabel: 'Incluir',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='add'
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen
        name='listData'
        component={ListData}
        options={{
          tabBarLabel: 'Listagem',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='list'
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen
        name='searchExpenses'
        component={SearchExpenses}
        options={{
          tabBarLabel: 'Pesquisa',
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='search'
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen 
      name='resume'
      component={Resume}
      options={{
        tabBarLabel: 'Resumo',
        tabBarIcon: (({size, color})=> 
        <MaterialIcons
          name='book'
          size={size}
          color={color}
        />
        )
        }}
      />

    </Navigator>
  )

}