/////////////////////////////////////////////
// Megan Krenbrink - App Dev 2  Assignment //
/////////////////////////////////////////////

// SCREEN 02 - LOCAL NEWS

import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Linking } from 'react-native';
import { ThemeProvider, Button, Text, Image, Card, Input } from 'react-native-elements';
import { newsTheme } from '../themes/newsTheme';

export default function Screen02() {

  const [search, setSearch] = useState(displayDataContainer(null, true, {"articles": []}));
  const [text, setText] = useState('');

  return (
    <ThemeProvider theme={newsTheme}>
      <View style={styles.container}>
        <View style={styles.input}>
        <Text style={styles.h1}>
          Search Stories
        </Text>
        <Input 
          placeholder=' Enter a keyword'
          onChangeText={newText => setText(newText)}
          defaultValue={text}
        />
        <Button

          title='Search'
          onPress={() => {
            setSearch(displayDataContainer(null, false, null));
            let thing = "https://newsapi.org/v2/everything?q=" + text + "&pageSize=15&sortBy=relevancy&language=en&apiKey=fce21855a3f943ed99b6b04db274cf09";
            fetch(thing)
              .then(res => res.json())
              .then(
                (result) => {
                  setSearch(displayDataContainer(null, true, result));
                },
                (error) => {
                  setSearch(displayDataContainer(error, true, result));
                }
              );
            }}
          />
          </View>
        {search}
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
          style={styles.btnPrimary}
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
        <Text style={styles.activityText}>Loading results...</Text>
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
        keyExtractor={item => item.publishedAt}
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
  input: {
    marginBottom: 20,
  },
  h1: {
    fontFamily: 'Arvin-Bold',
    fontSize: 40,
    color: '#2B2D42',
    margin: 20,
  },
  h3: {
    fontFamily: 'Arvin-Bold',
    fontSize: 22,
    marginBottom: 10,
  },
  h4: {
    fontFamily: 'Arvin',
    marginLeft: 20,
    fontSize: 20
  },
  alink: {
    fontSize: 16,
    fontFamily: 'Arvin'
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  newsArticle: {
    marginTop: 40,
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

