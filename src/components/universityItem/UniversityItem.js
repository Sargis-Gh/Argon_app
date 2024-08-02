import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { LanguageLocalizationNSKey, Styles } from '../../constants/constants';

class UniversitieItem extends React.Component {
    shouldComponentUpdate(nextProps) {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps);
    }

    render() {
        const { item, onPress, isFavorite } = this.props;
        return (
            <View style={styles.item}>
                <View style={styles.aboutUnivercity}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.countryName}>{item.country}</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => onPress(item)} activeOpacity={1}>
                        {isFavorite ? <Icons.Favorite /> : <Icons.NotFavorite />}
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.viewDetails}>
                            {t('viewDetails', LanguageLocalizationNSKey.common)}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default UniversitieItem;
