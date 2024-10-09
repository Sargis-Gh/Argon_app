import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import { Icons } from '../../../../constants/Icons';
import { PageName } from '../../../../constants/constants';
import { changeFavoriteStatus } from '../../../../utils/utils';
import CustomImage from '../../../../components/customImage/CustomImage';

import { navigationNavigate } from '../../../../navigation/navigation';

class ResultItem extends React.Component {
    shouldComponentUpdate(nextProps) {
        const { isFavorite } = this.props;
        return nextProps.isFavorite !== isFavorite;
    }

    render() {
        const { item, isFavorite } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={1}
                delayPressIn={100}
                style={styles.resultItem}
                onPress={() => this.openMovieDetails(item?.id)}>
                <CustomImage style={styles.resultItemImage} source={item?.poster_path} />
                <View style={styles.resultItemDetails}>
                    <Text style={styles.resultItemText}>{item?.title}</Text>
                    <Text style={styles.releaseDate}>{item?.release_date}</Text>
                </View>
                <TouchableOpacity
                    delayPressIn={100}
                    activeOpacity={0.4}
                    onPress={this.handleFavoriteButtonClick}>
                    {(isFavorite && <Icons.Favorite />) || <Icons.NotFavorite />}
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    handleFavoriteButtonClick = () => {
        const { email, setFavorites, item, type, isFavorite } = this.props;
        changeFavoriteStatus({
            item,
            type,
            email,
            isFavorite,
            setFavorites,
            pageName: PageName.movies,
        });
    };

    openMovieDetails = () => {
        const {
            type,
            navigation,
            item: { id },
        } = this.props;
        navigationNavigate(navigation, PageName.movieDetails, { id, type });
    };
}

export default ResultItem;
