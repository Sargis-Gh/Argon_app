import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./style";
import { Icons } from "../../../../constants/Icons";
import { changeLanguage, t } from "../../../../localization/i18n";
import { AsyncStorageKeys, LanguageLocalizationKey, LanguageLocalizationNSKey } from "../../../../constants/constants";

import { navigationRefreshWithoutReload } from "../../../../navigation/navigation";

class Languages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: props.selectedLanguage
        }
    }

    selectLanguage = (language) => {
        try {
            AsyncStorage.setItem(AsyncStorageKeys.language, language,);
            this.setState({ selectedLanguage: language });
            changeLanguage(language);
            navigationRefreshWithoutReload();
        } catch (error) {
            /**
             * Will be use the crashlytics logs
             */
            console.log('Error', error)
        }
    };

    renderLanguageButtons = () => {
        const { selectedLanguage } = this.state;
        const buttonsData = [
            {
                icon: <Icons.USAflag />,
                text: t('texts.english', LanguageLocalizationNSKey.settings),
                isSelected: LanguageLocalizationKey.en === selectedLanguage,
                selectLanguage: () => this.selectLanguage(LanguageLocalizationKey.en)
            },
            {
                icon: <Icons.Russia />,
                text: t('texts.russian', LanguageLocalizationNSKey.settings),
                isSelected: LanguageLocalizationKey.ru === selectedLanguage,
                selectLanguage: () => this.selectLanguage(LanguageLocalizationKey.ru)
            }
        ]
        return (
            <View style={{ rowGap: 16 }}>
                {buttonsData.map(({ text, icon, isSelected, selectLanguage }) =>
                    <View key={text} style={styles.languageButtoncontent}>
                        <TouchableOpacity style={styles.languageButton} activeOpacity={0.5} onPress={selectLanguage}>
                            {icon}
                            <Text style={styles.languageButtonText}>{text}</Text>
                        </TouchableOpacity>
                        {isSelected && <View style={styles.checked}></View>}
                    </View>
                )}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{t('texts.languages', LanguageLocalizationNSKey.settings)}</Text>
                    {this.renderLanguageButtons()}
                </View>
            </View>
        )
    }

}

export default Languages