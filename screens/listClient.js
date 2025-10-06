import React, { useState, createRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { Calendar, Agenda } from 'react-native-calendars';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { COLORS, FONTS, SIZES } from '../constants';
const testIDs = require('./testIDs');



function ListClient() {

    const dt = [
        {
            date: "2021-11-05",
            activity: [
                {
                    id: 1,
                    from: 8,
                    to: 9,
                    Etat: "Disponible",

                },
                {
                    id: 2,
                    from: 9,
                    to: 11,
                      Etat: "Disponible",
                },
                {
                    id: 3,
                    from: 8,
                    to: 9,
                   Etat: "Disponible",
                },
            ],
        },
        {
            date: "2021-11-06",
            activity: [
                {
                    id: 1,
                    from: 8,
                    to: 9,
                     Etat: "Non Disponible",
                },
                {
                    id: 2,
                    from: 10,
                    to: 11,
                   Etat: "Non Disponible",
                },
                {
                    id: 3,
                    from: 11,
                    to: 2,
                Etat: "Non Disponible",
                },
                {
                    id: 4,
                    from: 8,
                    to: 9,
                     Etat: "Non Disponible",
                },
                {
                    id: 5,
                    from: 8,
                    to: 9,
                    Etat: "Non Disponible",
                },
                {
                    id: 6,
                    from: 8,
                    to: 9,
                 Etat: "Non Disponible",
                },
                {
                    id: 7,
                    from: 8,
                    to: 9,
                  Etat: "Non Disponible",
                },
                {
                    id: 8,
                    from: 8,
                    to: 9,
                  Etat: "Non Disponible",
                },
                {
                    id: 9,
                    from: 8,
                    to: 9,
               Etat: "Disponible",
                },

            ],
        },
        {
            date: "2021-11-07",
            activity: [
                {
                    id: 1,
                    from: 8,
                    to: 9,
                  Etat: "Disponible",
                },
                {
                    id: 2,
                    from: 8,
                    to: 9,
                   Etat: "Disponible",
                },
                {
                    id: 3,
                    from: 8,
                    to: 9,
                     Etat: "Disponible",
                },
            ],
        },
        {
            date: "2021-11-08",
            activity: [
                {
                    id: 1,
                    from: 8,
                    to: 9,
                 Etat: "Disponible",
                },
                {
                    id: 2,
                    from: 9,
                    to: 10,
                  Etat: "Non Disponible",
                },
                {
                    id: 3,
                    from: 10,
                    to: 11,
                  Etat: "Non Disponible",
                },
            ],
        },
    ];

    const INITIAL_DATE = '2021-11-06';
    const [selected, setSelected] = useState(INITIAL_DATE);
    const [items, setItems] = useState({});

    const bs = createRef();
    const fall = new Animated.Value(1);

    const onDayPress = day => {
        setItems({})
        setSelected(day.dateString);
        dt.map(item => {
            if (item.date === day.dateString)
                setItems(item)
        })
        bs.current.snapTo(0);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    const renderActivities = () => (
        <View
            style={{
                backgroundColor: "white",
               padding: 10,
               height:700
              // elevation: 10,
            }}
        >
            <Text style={{ ...FONTS.title }}>Tasks of {items.date}</Text>
            {items.activity.map(ac => (
                <View
                    key={ac.id}
                    style={{
                        backgroundColor: COLORS.lightGray,
                        marginBottom: 5,
                        padding: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: COLORS.skyBlue,
                                paddingVertical: 2,
                                width: 90,
                                alignItems: "center",
                                borderRadius: 5,
                                marginRight: 10
                            }}
                        >
                            <Text style={{ ...FONTS.title, color: "white" }}>
                                {ac.from}    {ac.to}
                            </Text>


                        </View>

                        <View>
                            <Text style={{ ...FONTS.title, color: COLORS.darkBlue, marginBottom: -5 }}>
                                {ac.Etat}
                            </Text>
                        </View>

                    </View>

                </View>
            ))}
        </View>
    )

    const renderEmptyActivity = () => (
        <View
            style={{
                backgroundColor: "white",
                height: 700,
                padding: 10,
                elevation: 6,

            }}
        >
            <Text style={{ ...FONTS.title }}>Tasks of {selected}</Text>

            <Text>
                Nothing to do this day.
            </Text>
        </View>
    )


    return (
    <View>




            <Calendar
                testID={testIDs.calendars.CONTAINER}
                current={INITIAL_DATE}
                minDate={INITIAL_DATE}
                maxDate="2021-12-01"
                markingType={'multi-dot'}
                style={styles.calendar}
                onDayPress={onDayPress}
                markedDates={{
                    [selected]: {
                        selected: true,
                        selectedColor: COLORS.skyBlue,
                        selectedTextColor: 'white',
                        dots: [{key: 'notEmptyActivity', color: 'blue', selectedDotColor: 'white'}]
                    },
                  }}
                disableMonthChange={true}
                hideArrows={true}
                hideExtraDays={true}
                theme={{
                    calendarBackground: COLORS.background
                }}
            />
            <BottomSheet
                ref={bs}
                snapPoints={[300, 0]}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
                renderContent={Object.keys(items).length > 0 ? renderActivities : renderEmptyActivity}
                renderHeader={renderHeader}
            />
       </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -12 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation: 0,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {

        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    calendar: {
        marginBottom: 10
    },

});

export default ListClient;