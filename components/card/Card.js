import React, { useRef, useEffect, useState } from 'react';
import {StyleSheet, View, Image, Text, TouchableHighlight, Animated, useWindowDimensions, Easing} from 'react-native';

const cardSymbols = [
    require('../../icons/heart.png'), 
    require('../../icons/club.png'), 
    require('../../icons/diamond.png'),
    require('../../icons/spade.png'),
];

const Card = (props) => {
    const {cardPressHandler, elem, activeCard} = props;
    const {card, type} = elem;

    const [cardPos, setCardPos] = useState({});

    const cardKey = card && Object.keys(card).length && Object.keys(card)[0];
    const active = activeCard && activeCard.type === type && Object.keys(activeCard.card)[0] === cardKey;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const { width: windowWidth, height: windowHeight} = useWindowDimensions();

    const movingVertical = fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [cardPos.y, -windowHeight/2 + 50]
    })

    const movingHorizontal = fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [cardPos.x, windowWidth/2-20]
    })

    const getPosition = event => {
        const {x, y} = event.nativeEvent.layout;
        props.cardPressHandler && setCardPos({x, y});
    }

    const onPressHandler = () => {
        const moving = {movingVertical, movingHorizontal};

        cardPressHandler && cardPressHandler(elem, moving, fadeAnim);
    }

    return(
        <TouchableHighlight onPress={onPressHandler} onLayout={getPosition}>
            <View style={styles.card}>
                <View style={styles.cardSymbol}>
                    <View style={styles.cardSymbolContent}>
                        <Text style={{fontSize: 11, fontWeight: 'bold'}}>{cardKey}</Text>
                        <Image source={cardSymbols[type]} style={styles.symbolImage}/>
                    </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Image source={cardSymbols[type]} style={styles.img}/>
                </View>
                <View style={[styles.cardSymbol, styles.symbolBottom]}>
                    <View style={styles.cardSymbolContent}>
                        <Text style={{fontSize: 11, fontWeight: 'bold'}}>{cardKey}</Text>
                        <Image source={cardSymbols[type]} style={styles.symbolImage}/>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    card: {
        width: 45,
        height: 75,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 7,
        paddingBottom: 7
    },
    cardSymbol: {
        flex: 5, 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 2
    },
    cardSymbolContent: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column',
    },
    symbolImage: {
        width: 10, 
        height: 10, 
        zIndex: 9999,
    },
    symbolBottom: {
        alignItems: 'flex-end', 
    },
    img: {
        marginTop: 5,
        width: 15,
        height: 15,
    }
});

export default Card;