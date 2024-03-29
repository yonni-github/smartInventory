import React from 'react';
import {View} from 'react-native';

const InventoryCardSection = (props) => {

    return(
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        padding: 8,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
    }
};

export default InventoryCardSection;