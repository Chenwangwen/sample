import AsyncStorage from '@react-native-async-storage/async-storage';

const key = "games";

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log(e)
    }
};

export async function loadData() {
    try{
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }catch (error) {
        console.log(error);
        return [];
    }
}

export async function deleteData(index) {
    try {
        const data = await loadData(key);
        data.splice(index, 1);
        await saveData(data);
    } catch (e) {
        console.log(e)
    }
}
export async function saveData (data) {
    const jsonData = JSON.stringify(data);
    try{
        await AsyncStorage.setItem(key, jsonData);
    }catch (error) {
        console.log(error);
    }
}