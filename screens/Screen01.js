/////////////////////////////////////////////
// Megan Krenbrink - App Dev 2 - Assign 02 //
/////////////////////////////////////////////

// SCREEN 01 - HOME / TOP NEWS

import { useState, useEffect } from 'react';

import { StyleSheet, View, ActivityIndicator, FlatList, Linking } from 'react-native';
import { ThemeProvider, Button, Text, Image, Card } from 'react-native-elements';

import { newsTheme } from '../themes/newsTheme';

export default function Screen01() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataResult, setDataResult] = useState([]);

  // useEffect for the fetch process
  useEffect(() => {
    fetch('https://newsapi.org/v2/everything?q=keyword&pageSize=15&sortBy=popularity&language=en&apiKey=fce21855a3f943ed99b6b04db274cf09')
      .then(res => res.json())
      .then(
        (result) => {
          // successful load
          setIsLoaded(true);
          setDataResult(result);
        },
        (error) => {
          // error result
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  return (
    <ThemeProvider theme={newsTheme}>
      <View style={styles.container}>
        <View>
          <Text style={styles.h2}>
            Welcome to Megan's News App
          </Text>
          <Text style={styles.h1}>
            Top Stories
          </Text>
        </View>
        {displayDataContainer(error, isLoaded, dataResult)}
      </View>
    </ThemeProvider>
  );
}

function displayDataContainer(error, isLoaded, dataResult) {

  const renderItem = ({ item }) => (
    <View>
      <Card style={styles.newsArticle}>
        <Image
          style={styles.articleImage}
          source={{ uri: item.urlToImage }}
        />
        <Text key={item} style={styles.h3}>
          {item.title}
        </Text>
        <Text>{item.description}</Text>
        <Text>Date: {item.publishedAt}</Text>
        <Button
          title='Read More'
          onPress={() => {
            Linking.openURL(item.url);
          }}
        />
      </Card>
    </View>
  );

  if (error) {
    // show an error message    
    return (
      <View style={styles.activity}>
        <Text style={styles.activityText}>Error: {error.message}</Text>
      </View>
    );
  }
  else if (!isLoaded) {
    // indicate page is loading and set activity indicator
    return (
      <View style={styles.activity}>
        <Text style={styles.activityText}>Page Loading...</Text>
        <ActivityIndicator size="large" color="#D90429" />
      </View>
    );
  }
  else if (dataResult.articles === undefined) {
    // message for no results
    return (
      <View style={styles.activity}>
        <Text style={styles.activityText}>No results :(</Text>
      </View>
    );
  }
  else {
    return (
      <FlatList
        data={dataResult.articles}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  h2: {
    fontSize: 24,
    fontFamily: 'Arvin-Bold',
    margin: 20,
    marginBottom: 0,
    color: '#8D99AE',
  },
  h1: {
    fontFamily: 'Arvin-Bold',
    fontSize: 40,
    color: '#2B2D42',
    margin: 20,
  },
  newsArticle: {
    marginTop: 40,
  },
  h3: {
    fontFamily: 'Arvin-Bold',
    fontSize: 22,
    marginBottom: 10,
  },
  articleImage: {
    width: "100%",
    height: 220,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  activity: {
    justifyContent: 'center',
    marginTop: 100,
  },
  activityText: {
    textAlign: 'center',
  }
});