import { StyleSheet } from 'react-native';

const transactionStyle = StyleSheet.create({
    container: {
        justifyContent: 'center',
        verticalAlign: 'bottom',
        flex: 1,
        padding: 20,
        backgroundColor: '#121212', // Dark background
    },
    closeButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white', // White text
    },
    transactionItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333', // Darker border
        color: 'white', // White text
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#121212', // Dark background
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white', // White text
    },
    input: {
        height: 40,
        borderColor: '#555', // Darker border
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white', // White text
    },
    typeButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    typeButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#555', // Darker border
        color: 'white', // White text
    },
    selectedType: {
        backgroundColor: 'lightblue',
        color: 'black', // Ensure text is readable on light background
    },
    noTransactions: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white', // White text
    },
})

export default transactionStyle;