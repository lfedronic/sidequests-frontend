import React, { useState, useEffect, BaseSyntheticEvent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Modal } from 'react-native';
import * as Location from 'expo-location';
import SearchBar from "../components/SearchBar";
import SearchFilterComponent from '../components/SearchFilterComponent';
import {SearchFilter, SearchFilters} from '../types/SearchFilter';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { Dimensions } from 'react-native';
import Quest from '../types/Quest';
import QuestRequest from '../types/QuestRequest';
import { Dropdown } from 'react-native-element-dropdown';
import QuestFeed from '../components/QuestFeed';
import NavBar from '../components/NavBar';
import Axios from 'axios';
import ModalExample from '../Modals/ModalExample';
import LogoutModal from '../Modals/LogoutModal';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';


const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;
const searchPlaceholder = 'Hike with great views';
const defaultLocation : [number, number] = [37.785834, -122.406417];


const filters : SearchFilters = {
    "time_needed" : {ascending: false, weight: 1.0},
    "difficulty" : {ascending: false, weight: 1.0},
    "popularity" : {ascending: true, weight: 1.0},
    "similarity" : {ascending: true, weight: 100.0}
}

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type MainScreenProps = {
    navigation: MainScreenNavigationProp;
};

//name: string, {ascending: boolean, weight: number}>
const MainScreen: React.FC<MainScreenProps> = ({navigation}) => {

    const [creatingQuest, setCreatingQuest] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showSearchArea, setShowSearchArea] = useState(true);
    const [loadedQuests, setLoadedQuests] = useState(false);
    const [quests, setQuests] = useState<Array<Quest>>([]);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [location, setLocation] = useState<Location.LocationObject | null>(null); 
    const [radius, setRadius] = useState<number>(20000);
    const [searchFilters, setSearchFilters] = useState<SearchFilters>(filters);
    const [region, setRegion] = useState<{ latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number; } | null>(null);
    const [profileOpen, setProfileOpen] = useState(false);


    const updateFilter = (filterName : string, newValues : SearchFilter ) => {
        setSearchFilters(prevFilters => ({
          ...prevFilters,
          [filterName]: {
            ...prevFilters[filterName],
            ...newValues 
          }
        }));
      };

      
    const getSearchText = (text: string) => {
        setSearchText(text);
        handleSearch(text);
    }

    // Initial quest fetch

    useEffect(() => {
        const requestBody: QuestRequest = {
            coordinates: location ? [Number(location.coords.latitude), Number(location.coords.longitude)] : defaultLocation,      
            radius: 20000,
            search_query: searchPlaceholder,       
            search_filters : Object.entries(searchFilters).map(([filterName, filterData]) => ({filter: filterName, ascending: filterData.ascending, weight: filterData.weight}))
            
        };
        const fetchData = async () => {
            try {
                const response = await Axios.post('http://localhost:8080/getquests', requestBody, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': '*/*'
                    }
                });
                
                setQuests(response.data);
            } catch (err) {
                console.log(err);
            } 
        };

        fetchData();
    }, []); 

    //Requesting location permission

    useEffect(() => {(async () => {
        console.log('getting location');
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
        }
        setHasPermission(true);
        setLocation(await Location.getCurrentPositionAsync());
    })();
      }, []);

    const handleSearch: (text: string) => Promise<void> = async (text: string) => {
        const requestBody: QuestRequest = {
            coordinates: location ? [Number(location.coords.latitude), Number(location.coords.longitude)] : defaultLocation,      
            radius: radius,
            search_query: text,       
            search_filters : Object.entries(searchFilters).map(([filterName, filterData]) => ({filter: filterName, ascending: filterData.ascending, weight: filterData.weight}))
        };
        console.log(requestBody);
        try {
    
            const response = await Axios.post('http://localhost:8080/getquests', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                }
            });
            //console.log(response.data);
            setQuests(response.data);
            setLoadedQuests(true);
            setRegion({
                latitude: response.data[0].latitude,
                longitude: response.data[0].longitude,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421
            });
            
        } catch (err) {
            console.log(err);
        }
    };

    const addFilter = (filterName: string, filterData: SearchFilter) => {
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: filterData
        }));
    }

    const handleCreateQuest = () => {
        
    }

    const createQuest = () => {
        console.log("create quest");
        setCreatingQuest(true);
    }

    const closeModal = () => {
        setCreatingQuest(false);
    };

    const openProfile = () => {
        console.log("open profile");
        setProfileOpen(true);
    }

    const logOut = () => {
        console.log("logging out");
        setProfileOpen(false);
        navigation.replace("Login");
    }

return (
    <View style={styles.mainContainer}>
        {showSearchArea &&
        <View style={styles.searchContainer}>
            <SearchBar getText={getSearchText} placeholderText={searchPlaceholder}/>
            
            <View style={styles.filter}>
                    
                {Object.entries(searchFilters).map(([filterName, filterData]) => (
                filterData.weight !== 0 &&
                <SearchFilterComponent
                    key={filterName}          
                    filterName={filterName}     
                    filterData={filterData} 
                    getFilter={updateFilter}
                />
                ))}

                <View style={styles.dropdown}>
                    <Dropdown 
                        data={Object.entries(searchFilters).map(([filterName, filterData]) => ({filter: filterName, ascending: filterData.ascending}))} 
                        labelField="filter" 
                        valueField="ascending" 
                        onChange={(text) => {addFilter(text.filter, {ascending: text.ascending, weight: 1.0})}}
                        style={{width: 120, paddingHorizontal: 10}}
                        placeholder='Sort by'
                        placeholderStyle={{color: 'red', fontSize: 14, textAlign: 'center'}}
                        itemTextStyle={{color: 'green', fontSize: 14}}
                        selectedTextStyle={{color: 'red', fontSize: 14}}
                    />
                </View>
            </View>
            <Button title="hide search" onPress={() => setShowSearchArea(false)}/>
        </View>}
    
        <View style={styles.mapContainer}>
            {!showSearchArea && <Button title="show search" onPress={() => setShowSearchArea(true)}/>}
            <MapView
                region={region ? region : { latitude: defaultLocation[0], longitude: defaultLocation[1], latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                style={styles.map}
            >
                {quests.map((quest) => (       
                <Marker 
                    key={quest.id}
                    coordinate = {{
                        latitude: quest.latitude,
                        longitude: quest.longitude
                    }}
                    title={quest.title}
                
                />))}
            </MapView>
            <View style={styles.upperMap}>

            </View>
            <View style={styles.feedContainer}>
                <QuestFeed quests={quests}/>
            </View>
        </View>
        <ModalExample visible={creatingQuest} onClose={(closeModal)} />
        <LogoutModal visible={profileOpen} onClose={() => setProfileOpen(false)} logOut={(logOut)} />
        <View style={styles.bottomNavBar}>
            <NavBar createQuest={createQuest} openProfile={openProfile}/>
        </View>            
        
    </View>
);
};

//create stylesheet
const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    searchContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        padding: 10,
    },
    filter : {
        margin: 10,
        height: "80%",
        flex: 1,
        //backgroundColor: 'red',
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dropdown : {
        //color: 'red',
        backgroundColor: 'beige',
        justifyContent: 'center',

    },
    mapContainer: { 
        flex: 4,
        backgroundColor: 'blue',
        width: '100%',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
        display : 'flex',
    },
    upperMap: {
        zIndex: -2,
        flex: 1,
        width: '100%',
    },
    feedContainer: {
        flex: 0.5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomNavBar: {
        flex: 0.5,
        width: '100%',
        //backgroundColor: 'green',
        //anchor on bottom of screen
    }

});

export default MainScreen;