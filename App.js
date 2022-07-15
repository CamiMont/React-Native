import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ActivityIndicator, FlatList} from 'react-native';

 const movieURL= "https://reactnative.dev/movies.json"

 function App() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    fetch(movieURL)
    .then((response)=>response.json())
    .then((json) => {
      setData(json.movies);
      setTitle(json.title);
      setDescription(json.description);
    }
    )
    .catch((error)=>alert(error))
    .finally(()=>setLoading(false));
  },[])

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ?(<ActivityIndicator/>) :
       (
       <View>
          <Text style={styles.title}>{title}</Text>
          <View style={{borderBottomWidth:1, marginBottom:12}}></View>
          <FlatList
            data={data}
            keyExtractor={({id}, index)=> id }
            renderItem={({item}) => { return (
              <View style={{paddingBottom: 10}}>
                <Text style={styles.movieText}>
                  {item.id}.
                  {item.title},
                  {item.releaseYear}
                </Text>
              </View>
              )
              }}
          />
        <Text style={styles.description}>{description}</Text>
      </View>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 48
  },
  movieText:{
    fontSize: 26,
    fontWeight:"200"
  },
  subtitle:{
    fontSize: 18,
    flex: 1,
    flexDirection:"column"
  },
  title:{
    fontSize: 32,
    fontWeight:"bold"
  },
  description:{
    textAlign:"center",
    marginBottom: 18,
    fontSize: 18,
    color:"blue",
    fontWeight:"200"
}
});
export default App;
