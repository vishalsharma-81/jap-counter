import React, { useState } from 'react';
import { registerRootComponent } from 'expo';
import { View, Text, TouchableOpacity, Vibration, StyleSheet } from 'react-native';

function App() {
    const [count, setCount] = useState(0);

    const handleTap = () => {
        setCount(count + 1);
        Vibration.vibrate(50);
    };

    const handleReset = () => setCount(0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🕉️ Jap Counter</Text>
            <Text style={styles.counter}>{count}</Text>

            <TouchableOpacity onPress={handleTap} style={styles.button}>
                <Text style={styles.buttonText}>Tap +1</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleReset} style={styles.reset}>
                <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
}
export default App;
registerRootComponent(App);

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff',
    },
    title: {
        fontSize: 28, marginBottom: 30, fontWeight: 'bold',
    },
    counter: {
        fontSize: 60, marginBottom: 40, color: '#5b21b6',
    },
    button: {
        backgroundColor: '#8b5cf6', padding: 20, borderRadius: 10,
    },
    buttonText: {
        fontSize: 22, color: 'white',
    },
    reset: {
        marginTop: 20,
    },
    resetText: {
        fontSize: 16, color: '#ef4444',
    },
});