
import { registerRootComponent } from 'expo';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Switch } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mantras = [
    'Shree Radha Radhe',
    'Om Namah Shivaya',
    'Shree Sita Ram',
    'Om Namo Bhagavate Vasudevaya',
    'Om Krishnaya Vasudevaya Haraye Paramatmane  Pranatah Kleshanashaya Govindaya Namo Namah',
    'Om Tryambakam Yajamahe Sugandhim Pushtivardhanam Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat',
    'Om Bhur Bhuvah Swaha Tat Savitur Varenyam Bhargo Devasya Dheemahi Dhiyo Yo Nah Prachodayat',
    'Radha Raseshwari Ramya Krishnamatradhidevata Sarvaadya Sarvavandya Vrindavanaviharini Vrindaradha Rama Asheshgopimandalpoojita Satya Satyapara Satyabhama Shreekrishnavallabha Vrishabhanusuta Gopi Moolprakriti Ishwari Gandharva Radhika Ramya Rukmini Parameshwari Paratparatara Poorna Poornachandravimanana Bhukti-Muktiprada Bhavavyadhi-Vinashini',
    'Om Hanumate Namaha',
    'Om Namo Hanumate Rudravataraya Sarva Shatru Samharanaya Sarva Roga Haraya Sarva Vashikaranaya Ramadutaya Swaha'
];

function App() {
    const [count, setCount] = useState(0);
    const [sound, setSound] = useState(null);
    const [selectedMantra, setSelectedMantra] = useState(mantras[0]);
    const [isNightMode, setIsNightMode] = useState(false);

    useEffect(() => {
        loadCount();
        return () => {
            if (sound) sound.unloadAsync();
        };
    }, []);

    useEffect(() => {
        saveCount();
    }, [count]);

    const loadCount = async () => {
        try {
            const savedCount = await AsyncStorage.getItem('japCount');
            if (savedCount !== null) {
                setCount(parseInt(savedCount));
            }
        } catch (error) {
            console.log('Error loading count:', error);
        }
    };

    const saveCount = async () => {
        try {
            await AsyncStorage.setItem('japCount', count.toString());
        } catch (error) {
            console.log('Error saving count:', error);
        }
    };

    const playBell = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('./assets/bell.mp3')
        );
        setSound(sound);
        await sound.playAsync();
    };

    const increaseCount = () => {
        const newCount = count + 1;
        setCount(newCount);
        Vibration.vibrate(50);
        if (newCount === 108) {
            playBell();
        }
    };

    const decreaseCount = () => {
        if (count > 0) {
            setCount(count - 1);
            Vibration.vibrate(30);
        }
    };

    const resetCounter = () => {
        setCount(0);
    };

    const toggleNightMode = () => {
        setIsNightMode(!isNightMode);
    };

    return (
        <View style={[styles.container, { backgroundColor: isNightMode ? '#000' : '#fff' }]}>
            <Text style={[styles.mantra, { color: isNightMode ? '#fff' : '#000' }]}>{selectedMantra}</Text>

            <Text style={[styles.counter, { color: isNightMode ? '#fff' : '#000' }]}>{count}</Text>

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={decreaseCount}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={increaseCount}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.reset} onPress={resetCounter}>
                <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dropdown} onPress={() => {
                const index = (mantras.indexOf(selectedMantra) + 1) % mantras.length;
                setSelectedMantra(mantras[index]);
                setCount(0);
            }}>
                <Text style={{ color: isNightMode ? '#fff' : '#000' }}>Change Mantra</Text>
            </TouchableOpacity>

            <View style={styles.switchContainer}>
                <Text style={{ color: isNightMode ? '#fff' : '#000' }}>Night Mode</Text>
                <Switch value={isNightMode} onValueChange={toggleNightMode} />
            </View>
        </View>
    );
}
export default App;
registerRootComponent(App);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    mantra: {
        fontSize: 20,
        marginBottom: 20,
    },
    counter: {
        fontSize: 60,
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 30,
    },
    button: {
        backgroundColor: '#d1c4e9',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 50,
    },
    buttonText: {
        fontSize: 30,
        color: '#4a148c',
    },
    reset: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#ffccbc',
        borderRadius: 20,
    },
    resetText: {
        fontSize: 16,
        color: '#bf360c',
    },
    dropdown: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#e0f7fa',
        borderRadius: 10,
    },
    switchContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});