import React, { Component } from "react";
import { 
    View,
    StyleSheet
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Container, Text } from 'native-base';

class componentName extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>componentName</Text>
            </View>
        );
    }
}
export default componentName;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});