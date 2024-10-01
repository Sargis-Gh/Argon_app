import React from 'react';
import { Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import styles from './style';
import { t } from '../../localization/i18n';
import { Styles, LanguageLocalizationNSKey } from '../../constants/constants';

class CustomCarousel extends React.Component {
    render() {
        const {
            data,
            title,
            renderItem,
            navigation,
            isStandard = true,
        } = this.props;
        const baseOptions =
            (isStandard && styles.standardBaseOptions) || styles.nonStandardBaseOptions;
        if (!data?.length) return null;
        return (
            <>
                <Text style={styles.itemHeader}>{t(title, LanguageLocalizationNSKey.common)}</Text>
                <Carousel
                    data={data}
                    loop={false}
                    {...baseOptions}
                    pagingEnabled={true}
                    mode={Styles.parallax}
                    panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
                    renderItem={(item) => renderItem(item, navigation)}
                />
            </>
        );
    }
}

export default CustomCarousel;
