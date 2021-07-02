import React, { Component } from 'react';
import {
    NativeBaseProvider,
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    Select,
    value,
    CheckIcon,
    View,
    Icon,
    IconButton,
    HStack,
    Divider
} from 'native-base';
import { ImageBackground, ScrollView, AsyncStorage, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class UserLogin extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            companyName: '',
            number: '',
        };
    }

    // storeData = () => {
    //     console.log("yoooooo", this.setState.email, this.setState.password)
    // }
    async storeData(email, password, number, companyName) {
        console.log("yoooooo", email, password, companyName, number)
        await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                let uid = auth().currentUser.uid
                firestore()
                    .collection('Users').
                    add({
                        id: uid,
                        email: email,
                        password: password,
                        number: number,
                        companyName: companyName,

                    })
                    .then(() => {
                        console.log('User added!');
                        this.props.navigation.navigate("Dashboard")
                        AsyncStorage.setItem("loggedin", 'true');
                    });
                console.log('User account created & signed in!');

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    console.log(email, password)
                }

                console.error(error);
            });
    }


    render() {
        const image = { uri: "https://image.freepik.com/free-vector/spot-light-background_1284-4685.jpg" };
        return (
            <NativeBaseProvider>
                <ImageBackground source={image} style={styles.image}>
                    <Box
                        flex={1}
                        p={2}
                        w="90%"
                        mx='auto'
                    >
                        <Heading size="lg" mt={14} color='danger.500'>
                            Welcome
                        </Heading>
                        <Heading color="muted.400" mb={17} size="xs">
                            Sign in to continue!
                        </Heading>

                        <ScrollView>
                            <View style={styles.text} mt={10}>
                                <VStack space={2} >
                                    <FormControl isRequired>
                                        <FormControl.Label _text={{ color: 'muted.800', fontSize: 'sm', fontWeight: 600 }}>
                                            Email ID
                                        </FormControl.Label>
                                        <Input
                                            onChangeText={(text) => this.setState({ email: text })}
                                            value={this.state.email}
                                        />
                                    </FormControl>
                                    <FormControl mt={4} isRequired>
                                        <FormControl.Label _text={{ color: 'muted.800', fontSize: 'sm', fontWeight: 600 }}>
                                            Password
                                        </FormControl.Label>
                                        <Input type="password"
                                            onChangeText={(text) => this.setState({ password: text })}
                                            value={this.state.password}
                                        />

                                    </FormControl>
                                    <FormControl mt={4} isRequired>
                                        <FormControl.Label _text={{ color: 'muted.800', fontSize: 'sm', fontWeight: 600 }}>
                                            Mobile Number
                                        </FormControl.Label>
                                        <Input
                                            onChangeText={(text) => this.setState({ number: text })}
                                            value={this.state.number}
                                        />
                                    </FormControl>
                                    <FormControl mt={4} isRequired isInvalid>
                                        <FormControl.Label _text={{ color: 'muted.800', fontSize: 'sm', fontWeight: 600 }}>Company Name</FormControl.Label>
                                        <Select
                                            minWidth={200}
                                            accessibilityLabel="Select your Company"
                                            placeholder="Select your Company"
                                            value={this.state.companyName}
                                            onValueChange={(text) => this.setState({ companyName: text })}
                                            _selectedItem={{
                                                bg: "teal.600",
                                                endIcon: <CheckIcon size={5} />,
                                            }}
                                            mt={1}
                                        >
                                            <Select.Item label="Astrea1" value="Astrea1" />
                                            <Select.Item label="Astrea2" value="Astrea2" />
                                            <Select.Item label="Astrea3" value="Astrea3" />
                                            <Select.Item label="Astrea4" value="Astrea4" />
                                            <Select.Item label="Astrea5" value="Astrea5" />
                                        </Select>

                                    </FormControl>
                                    <VStack space={2}>
                                        <Button colorScheme="danger" _text={{ color: 'white' }}
                                            onPress={() => this.storeData(this.state.email, this.state.password, this.state.number, this.state.companyName)}

                                            mt={4}
                                        >
                                            Login as a User
                                        </Button>
                                    </VStack>
                                    {/* <HStack justifyContent="center">
                                    <Text fontSize='sm' color='muted.700' fontWeight={400}>I'm a new user. </Text>
                                    <Link _text={{ color: 'danger.500', bold: true, fontSize: 'sm' }} href="#">
                                        Sign Up
                                    </Link>
                                </HStack> */}
                                </VStack>
                            </View>
                        </ScrollView>
                    </Box>
                </ImageBackground>

            </NativeBaseProvider>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },

})