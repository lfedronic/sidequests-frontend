import React, { useState, useEffect, BaseSyntheticEvent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Modal, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { StackNavigationProp } from '@react-navigation/stack';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import * as Location from 'expo-location';
import Axios from 'axios';
import SearchBar from "../components/SearchBar";
import SearchFilterComponent from '../components/SearchFilterComponent';
import QuestFeed from '../components/QuestFeed';
import NavBar from '../components/NavBar';
import QuestLocationSelector from '../components/QuestLocationSelector';
import { Quest, QuestRequest, SearchFilters, SearchFilter, RootStackParamList} from '../types';
import CreateQuestModal from '../modals/CreateQuestModal';
import LogoutModal from '../modals/LogoutModal';



const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;
const searchPlaceholder = 'Hike with great views';
const defaultLocation : [number, number] = [37.785834, -122.406417];
const creatorId: number = 1;

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
    const [regionForMarker, setRegionForMarker] = useState<{ latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number; } | null>(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const [initialQuestPinSelect, setInitialQuestPinSelect] = useState(false);
    const [markerPosition, setMarkerPosition] = useState<{latitude: number, longitude: number}>({latitude: defaultLocation[0], longitude: defaultLocation[1]});


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
            latitude: location ? location.coords.latitude : defaultLocation[0],
            longitude: location ? location.coords.longitude : defaultLocation[1],
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
            latitude: location ? location.coords.latitude : defaultLocation[0],
            longitude: location ? location.coords.longitude : defaultLocation[1], 
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

    const submitQuest: (quest: Quest) => Promise<void> = async (quest: Quest) => {
        try {
            const response = await Axios.post('http://localhost:8080/createquest', quest, {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*'
                }
            });
            console.log(response.data);
            setCreatingQuest(false);
            setInitialQuestPinSelect(false);
            return response.data;
        }
        catch (err) {
            console.log(err);
            return "bad";
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
        console.log("Your quest!");
        setShowSearchArea(false);
        setInitialQuestPinSelect(true);
        console.log(region?.latitude, region?.longitude);   
        //setCreatingQuest(true);
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

    const onMarkerDragEnd = (e: any) => {
        setMarkerPosition(e.nativeEvent.coordinate);
    };

    const handleLocationLock = () => {
        setCreatingQuest(true);


    };

    const handleCancel = () => {
        setInitialQuestPinSelect(false);
        setCreatingQuest(false);
        //setRegion({latitude: quests[0].latitude, longitude: quests[0].longitude, latitudeDelta: 0.0421, longitudeDelta: 0.0421});
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
        {initialQuestPinSelect && 
                <QuestLocationSelector 
                    region={regionForMarker} 
                    defaultLocation={defaultLocation} 
                    setMarkerPosition={setMarkerPosition} 
                    handleLocationLock={handleLocationLock} 
                    handleCancel={handleCancel}
                />
            }
        <View style={styles.mapContainer}>
            {!showSearchArea && <Button title="show search" onPress={() => setShowSearchArea(true)}/>}
            <MapView
                region={region ? region : { latitude: defaultLocation[0], longitude: defaultLocation[1], latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                style={[styles.map, {zIndex: initialQuestPinSelect ? 1 : -1}]}  onRegionChange={(region) => setRegionForMarker(region)}
            >
                {initialQuestPinSelect && 
                <Marker
                coordinate={markerPosition}
                title="Create Quest"
                draggable
                onDragEnd={(onMarkerDragEnd)}
                //onCalloutPress={()=>console.log("callout pressed")}               
                 />}

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
                {!initialQuestPinSelect && <QuestFeed quests={quests}/>}
            </View>
        </View>
        <CreateQuestModal coordinates={{latitude: markerPosition.latitude, longitude: markerPosition.longitude}} visible={creatingQuest} onClose={(closeModal) } onSubmit={(quest) => {submitQuest(quest)}} />
        <LogoutModal visible={profileOpen} onClose={() => setProfileOpen(false)} logOut={(logOut)} />
        {!initialQuestPinSelect &&
        <View style={styles.bottomNavBar}>
            <NavBar createQuest={createQuest} openProfile={openProfile}/>
        </View>   
        }         
        
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
    }

});

export default MainScreen;