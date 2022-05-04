/////////////////////////////////////////////
// Megan Krenbrink - App Dev 2  Assignment //
/////////////////////////////////////////////

// SCREEN 03 - SECTIONS

import { StyleSheet, View, FlatList } from 'react-native';
import { ThemeProvider, Text, Icon, Button } from 'react-native-elements';
import { newsTheme } from '../themes/newsTheme';
import { SECTIONS } from '../data/sections-data';

export default function Screen03() {

  const renderItem = ({ item }) => (
    <View style={styles.list}>
      <Text style={styles.listItem}>
        {item.label}
      </Text>
      <Icon
        name='rightcircle'
        type='antdesign'
        color='#8D99AE'
        size={30}
      />
    </View>
  );

  return (
    <ThemeProvider theme={newsTheme}>
      <View style={styles.container}>
        <View>
          <Text style={styles.h1}>
            Sections
          </Text>
        </View>
        <View>
          <FlatList
            data={SECTIONS}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
  },
  h1: {
    fontFamily: 'Arvin-Bold',
    fontSize: 40,
    color: '#2B2D42',
    paddingBottom: 25,
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    margin: 5,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  listItem: {
    fontSize: 22,
    lineHeight: 33,
  },  
  activity: {
    justifyContent: 'center',
    marginTop: 100,
  },
  activityText: {
    textAlign: 'center',
  }
});