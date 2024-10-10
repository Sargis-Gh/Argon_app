import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import { Icons } from '../../constants/Icons';
import CustomImage from '../customImage/CustomImage';
import { changeFavoriteStatus } from '../../utils/utils';
import { CreditType, PageName } from '../../constants/constants';

import { navigationNavigate } from '../../navigation/navigation';

class MovieItem extends React.Component {
    shouldComponentUpdate(nextProps) {
        const { isFavorite } = this.props;
        return nextProps.isFavorite !== isFavorite;
    }

    render() {
        const { item, type, isFavorite } = this.props;
        const isMovie = CreditType.movie === type;
        return (
            <TouchableOpacity
                activeOpacity={1}
                delayPressIn={100}
                style={styles.movieContainer(isMovie)}
                onPress={this.openMovieDetails}>
                <CustomImage style={styles.image} source={item.poster_path}>
                    <TouchableOpacity
                        delayPressIn={100}
                        activeOpacity={0.4}
                        onPress={this.handleFavoriteButtonClick}>
                        {(isFavorite && <Icons.Favorite />) || <Icons.NotFavorite />}
                    </TouchableOpacity>
                    {!!item?.vote_average && (
                        <View style={styles.ratingContainer}>
                            <Icons.StarHalf />
                            <Text style={styles.ratingText}>{item?.vote_average?.toFixed(1)}</Text>
                        </View>
                    )}
                </CustomImage>
                <View style={styles.movieDetails}>
                    <Text style={styles.movieTitle}>
                        {(CreditType.movie === type && item?.title) || item?.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    handleFavoriteButtonClick = () => {
        const { email, setFavorites, item, type, isFavorite, pageName } = this.props;
        changeFavoriteStatus({
            item,
            type,
            email,
            pageName,
            isFavorite,
            setFavorites,
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

export default MovieItem;
