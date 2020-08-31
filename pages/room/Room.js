import React from 'react';
import {StyleSheet, View, ImageBackground, Animated, Easing} from 'react-native';
import Card from '../../components/card/Card';
import cardsData from '../../core/cards.json';

class Room extends React.Component {

    
    constructor(props){
        super(props);
        this.state = {
            userFirst: [],
            userSecond: [],
            activeCard: {},
            moving: {},
            fadeAnim: undefined
        }
        this.defaultCards = [...cardsData];
    }

    cardPressHandler = (activeCard, moving, fadeAnim) => {
        this.setState({
            activeCard,
            moving,
            fadeAnim
        }, () => this.animate())  
    } 

    getRandomCard = () => {
        const {defaultCards} = this;
        let random = Math.floor(Math.random() * 4);
        
        function getRandom(type){
            const cardsLength = defaultCards && defaultCards.length && defaultCards[type] && defaultCards[type].length;

            if(cardsLength){
                return Math.floor(Math.random() * cardsLength)
            }else if(cardsLength === 1){
                return 0
            }
            random = Math.floor(Math.random() * 4);
            return getRandom(random);
        }

        return {
            type: random,
            number: getRandom(random)
        }
    };

    animate = () => {
        let {activeCard, userSecond} = this.state;

        userSecond = userSecond.filter((elem) => elem.key !== activeCard.key);

        this.setState({userSecond}, () => {
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }
            ).start();
        })
    }

    componentDidMount(){
        const {userFirst, userSecond} = this.state;
        const {defaultCards} = this;

        for(let i=0; i<12; i++){
            const {type, number} = this.getRandomCard();
            const result = {type, card: defaultCards[type][number], key: i};

            if(i<=5){
                userFirst.push(result)
            }else{
                userSecond.push(result)
            }
            defaultCards && defaultCards[type] && defaultCards[type].splice(number, 1);
        }

        userFirst.length && userFirst.sort((a, b) => b.type-a.type || b.card && b.card[Object.keys(b.card)[0]].index-a.card[Object.keys(a.card)[0]].index);
        userSecond.length && userSecond.sort((a, b) => b.type-a.type || b.card && b.card[Object.keys(b.card)[0]].index-a.card[Object.keys(a.card)[0]].index);

        this.setState({userFirst, userSecond})
    }

    render(){
        const {cardPressHandler} = this;
        const {userFirst, userSecond, activeCard, moving} = this.state;
        const show = activeCard && Object.keys(activeCard).length;

        console.log(userSecond)
 
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../images/room.jpg')} style={styles.image}>
                    <View style={[styles.top, styles.content]}>
                        {userFirst.map((elem, index) => <Card key={index} elem={elem}/>)}
                    </View>
                    {!!show && 
                        <Animated.View style={[{translateY: moving.movingVertical, translateX: moving.movingHorizontal}, styles.bottom, styles.bottomCard]}>
                            <Card elem={activeCard}/>
                        </Animated.View>
                    }
                    <View style={[styles.bottom, styles.content]}>
                        {userSecond.map((elem, index) => (
                            <Card 
                                key={index} 
                                elem={elem} 
                                cardPressHandler={cardPressHandler}
                                activeCard={activeCard}
                            />
                        )
                        )}
                    </View>
                </ImageBackground>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        position: 'relative',
    },
    content: {
        width: '100%',
        flex: 3,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center",
        width: "100%",
    },
    top: {
        top: 10,
    },
    bottom: {
        bottom: 10
    },
    bottomCard: {
        position: 'absolute'
    }
});

export default Room;