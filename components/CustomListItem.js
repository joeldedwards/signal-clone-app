import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = () => {
    return (
        <ListItem>
            <Avatar
            rounded
            source={{
                uri: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
            }}
             />
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
