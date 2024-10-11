import React from 'react';
import FastImage from 'react-native-fast-image';

import { buildImageUrl } from '../../utils/utils';
import { DefaultSource } from '../../constants/constants';

class CustomImage extends React.Component {
    render() {
        const { source, style, children, defaultSource } = this.props;
        return (
            <FastImage
                style={style}
                source={{ uri: buildImageUrl(source) }}
                resizeMode={FastImage.resizeMode.cover}
                defaultSource={(defaultSource && defaultSource) || DefaultSource.film}>
                {children}
            </FastImage>
        );
    }
}

export default CustomImage;
