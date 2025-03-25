import { StyleSheet } from 'react-native';

const mainStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#121212', // Dark background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white', // White text
    },
    text: {
        fontSize: 20,
        fontWeight: 'regular',
        marginBottom: 8,
        textAlign: 'left',
        color: 'white'
    },
    input: {
        height: 40,
        borderColor: '#555', // Darker border
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white', // White text
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white', // White text
        fontWeight: 'bold',
    },
});

export default mainStyle;