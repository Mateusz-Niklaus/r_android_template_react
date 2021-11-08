import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Image, View, Button, Alert, Modal } from "react-native";
import { DATA } from "./data/data";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <View>
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          <Text style={[styles.boldText, textColor]}>Estate number {item.estateNo} </Text>
          <Text style={[styles.normalText, textColor]}> Land {item.land}</Text> 
        </View>
        <Image style={styles.tinyLogo} source={{uri: 'https://icons.iconarchive.com/icons/icons8/android/24/Maps-Map-icon.png',}} />
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>       
          <Text style={[styles.boldText, textColor]}>Area {(item.area).toFixed(2)} ha </Text>
          <Text style={[styles.normalText, textColor]}> District {item.district}</Text>
        </View>
    </TouchableOpacity>
    </View>
);

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 5000);
  };
  const renderItem = ({ item }) => {
    const color = item.estateNo === selectedId ? 'black' : 'black';
      
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.estateNo)}
        textColor={{ color }}
      />
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
        <View style={styles.popUpView}>
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.popUp}>
          <Text style={styles.popUpText}>
            {selectedId}
          </Text>
        </View>
      </Modal>
      </View>
       <Button title="Show estate number" onPress={() => {showModal();}}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  boldText: {
    fontSize: 10,
    fontWeight: "bold",
    paddingLeft: 30
  },
  normalText : {
    fontSize: 10,
    fontWeight: "normal",
    position: "absolute",
    right: 0
  },
  tinyLogo: {
    width: 25,
    height: 25,
  },
  popUpView: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popUp:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00ACFA',
    justifyContent: 'center',
    margin: 50,
    marginTop: 250,
    marginBottom: 250,
  },
  popUpText: {
    fontSize: 16, 
    color: 'white'
  },
});

export default App;