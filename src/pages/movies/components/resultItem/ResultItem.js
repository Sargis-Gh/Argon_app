import React from 'react';
import FastImage from 'react-native-fast-image';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import { Icons } from '../../../../constants/Icons';
import { DefaultSource, PageName } from '../../../../constants/constants';
import { buildImageUrl, changeFavoriteStatus } from '../../../../utils/utils';

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
                <FastImage
                    style={styles.resultItemImage}
                    defaultSource={DefaultSource.film}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{ uri: buildImageUrl(item?.poster_path) }}
                />
                <View style={styles.resultItemDetails}>
                    <Text style={styles.resultItemText}>{item?.title}</Text>
                    <Text style={styles.releaseDate}>{item?.release_date}</Text>
                </View>
                <TouchableOpacity
                    delayPressIn={100}
                    activeOpacity={0.8}
                    onPress={this.handleFavoriteButtonClick}>
                    {(isFavorite && <Icons.Favorite />) || <Icons.NotFavorite />}
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    handleFavoriteButtonClick = () => {
        const { userId, favorites, setFavorites, item, type, isFavorite } = this.props;
        changeFavoriteStatus(isFavorite, userId, favorites, setFavorites, item, type);
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
