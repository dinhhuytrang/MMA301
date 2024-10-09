import React, { useState } from "react";
import {  View,Text,TextInput,TouchableOpacity,StyleSheet,} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
const AddAddressScreen = ({ navigation }) => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleSave = () => {
    // Implement save functionality here
    console.log("Address Saved:", { street, city, state, zipCode });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.profilebutton}>
         <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Ionicons name="chevron-back-outline" size={30} />
      </TouchableOpacity>
      </View>
     

      <Text style={styles.title}>Add Address</Text>

      <TextInput
        style={styles.input}
        placeholder="Street Address"
        value={street}
        onChangeText={setStreet}
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="State"
          value={state}
          onChangeText={setState}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Zip Code"
          value={zipCode}
          onChangeText={setZipCode}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  profilebutton:{
    marginTop:35,
    justifyContent:"flex-start"
  },
  backButton: {
    marginTop: 40,
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: "#333",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  saveButton: {
    backgroundColor: "#a175ff",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddAddressScreen;
