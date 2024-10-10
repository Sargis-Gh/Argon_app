import React from 'react';
import FastImage from 'react-native-fast-image';

import { buildImageUrl } from '../../utils/utils';
import { DefaultSource } from '../../constants/constants';

class CustomImage extends React.Component {
    render() {
        const { source, style, children } = this.props;
        return (
            <FastImage
                style={style}
                defaultSource={DefaultSource.film}
                source={{ uri: buildImageUrl(source) }}
                resizeMode={FastImage.resizeMode.cover}>
                {children}
            </FastImage>
        );
    }
}

export default CustomImage;
