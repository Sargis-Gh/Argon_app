import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import styles from './style';
import NavigationBar from '../navigationBar/NavigationBar';

class WebViewComponent extends React.Component {
    render() {
        const { navigation, title, uri } = this.props;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={title}
                    navigation={navigation}
                    style={styles.headerContainer}
                />
                <WebView source={{ uri }} />
            </View>
        );
    }
}

export default WebViewComponent;
