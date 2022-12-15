import React, { useState, useEffect } from "react";
import { StatusBar, SafeAreaView, Text, FlatList, StyleSheet, Image, View} from "react-native";

export default function SenacCoin() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const resp = await fetch("http://academico3.rj.senac.br:8080/api/SenacCoin/");
    const data = await resp.json();
    setData(data);
  };

  
  useEffect(() => {
    fetchData();
  }, []);
  
  const renderItem = 
    ({ item }) => (
    <View style={styles.listItem}>
      <View style={{flex:1}}>
        <Text style={{textAlign:"center", fontWeight:"bold", fontSize:20, paddingBottom: 10}}>{item.usuario.apelido}</Text>
        <Text style={{textAlign:"center"}}>Nome: {item.usuario.nomeCompleto}</Text>
        <Text style={{textAlign:"center"}}>Matricula: {item.id}</Text>
        <Text style={{textAlign:"center"}}>Saldo SC$: {item.saldo}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <Image
        style={styles.tinyLogo}
        source={require('./assets/senac.png')}/>
          <FlatList
            data={data}
            renderItem={renderItem}
          />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        marginTop:60
      },
      listItem:{
        margin:10,
        padding:10,
        backgroundColor:"#FFF",
        width:"80%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:5
      },
      tinyLogo: {
        flex:1,
        alignSelf:"center",
        resizeMode: "contain",
        width:"25%"
      },
  });