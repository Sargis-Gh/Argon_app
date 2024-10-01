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
        const { navigation, id, source, title, date } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={1}
                delayPressIn={100}
                style={styles.similarContainer}
                onPress={() => {
                    navigationPush(navigation, PageName.movieDetails, {
                        id,
                        type: CreditType.movie,
                    });
                }}>
                <CustomImage source={source} style={styles.image} />
                <Text style={styles.text}>{`${title} (${date?.slice(0, 4)})`}</Text>
            </TouchableOpacity>
        );
    }
}

export default SimilarItem;
