import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class Transactions extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Transactions</Text>
            </View>
        );
    }
}
export default Transactions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});