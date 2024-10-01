import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import styles from './style';
import CustomImage from '../../../../components/customImage/CustomImage';

import { navigationPush } from '../../../../navigation/navigation';

class PersonItem extends React.Component {
    shouldComponentUpdate(nextProps) {
        const { isFavorite } = this.props;
        return nextProps.isFavorite !== isFavorite;
    }

    render() {
        const { id, name, profilePath, title, navigation } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={1}
                delayPressIn={100}
                style={styles.personContainer}
                onPress={() => navigationPush(navigation, PageName.personDetails, { id, title })}>
                <View style={styles.personImageBackground}>
                    <CustomImage style={styles.personImage} source={profilePath} />
                </View>
                {!!name && (
                    <View style={styles.nameContainer}>
                        <Text numberOfLines={3} style={styles.name}>
                            {name}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    }
}

export default PersonItem;
