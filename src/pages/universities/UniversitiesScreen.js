import React from "react"
import { FlatList, View, Text, SafeAreaView } from "react-native"

import styles from "./style"
import { t } from "../../localization/i18n"
import { getUniversitiesFromApi } from "../../utils/GetUniversities"
import { LanguageLocalizationKey, LanguageLocalizationNSKey, Styles } from "../../constants/constants"
import { Icons } from "../../constants/Icons"

class UniversitiesScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }
    async componentDidMount() {
        try {
            data = await getUniversitiesFromApi()
            this.setState({ data })
        } catch (error) {
            console.log(error)
        }
    }
    s
    renderUniversitieItem = (item) => {
        return (
            <View style={styles.item}>
                <View style={styles.itemInfo}>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={styles.location}>
                        <Icons.Location fill={Styles.grey} />
                        <Text style={styles.countryName}>{item.country}</Text>
                    </View>
                </View>
                <View style={styles.addToFavorites}>
                    <Icons.Favorite fill={Styles.textInputGrey} />
                </View>
            </View>
        )
    }

    render() {
        const { data } = this.state
        return (
            <SafeAreaView styles={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{t('university', LanguageLocalizationNSKey.bottomTab)}</Text>
                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => this.renderUniversitieItem(item)}
                >
                </FlatList>
            </SafeAreaView>
        )
    }
}

export default UniversitiesScreen