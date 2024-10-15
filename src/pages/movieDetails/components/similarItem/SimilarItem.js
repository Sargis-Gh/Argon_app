import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './style';
import { CreditType, PageName } from '../../../../constants/constants';
import CustomImage from '../../../../components/customImage/CustomImage';

import { navigationPush } from '../../../../navigation/navigation';

class SimilarItem extends React.Component {
    shouldComponentUpdate(nextProps) {
        const { isFavorite } = this.props;
        return nextProps.isFavorite !== isFavorite;
    }

    render() {
        const { navigation, id, source, title, date, type } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={1}
                delayPressIn={100}
                style={styles.similarContainer}
                onPress={() => {
                    navigationPush(navigation, PageName.movieDetails, {
                        id,
                        type: type,
                    });
                }}>
                <CustomImage source={source} style={styles.image} />
                {title && (
                    <Text style={styles.text()}>
                        {title}
                        <Text style={styles.text(true)}>{` (${date?.slice(0, 4)})`}</Text>
                    </Text>
                )}
            </TouchableOpacity>
        );
    }
}

export default SimilarItem;
