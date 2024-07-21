import { useTranslation } from 'react-i18next'
import { Image } from 'react-native'

export const Cards = {
    data: [
        {
            id: 1,
            image: require('../assets/images/card1.png'),
        },
        {
            id: 2,
            image: require('../assets/images/card2.png'),
            title: 'Is makeup one of your daily esse …',
        },
        {
            id: 3,
            image: require('../assets/images/card3.png'),
            title: 'Coffee is more than just a drink: It’s …',
        },
        {
            id: 4,
            image: require('../assets/images/card4.png'),
            title: 'Fashion is a popular style, especially in …',
        },
    ],
}

export const OnBoardingData = () => {
    const { t } = useTranslation()
    return [
        {
            // _id: '1',
            // backgroundColor: '#fff',
            // image: (
            //     <Image
            //         source={require('../assets/images/onBoarding/img_1.jpg')}
            //         style={{ width: 300, height: 300 }}
            //     />
            // ),
            title: t('screens.onBoarding.item1.title'),
            subtitle:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            imageUri: Image.resolveAssetSource(require('../assets/images/onBoarding/img_1.jpg')).uri,
        },
        // {
        //     _id: '2',
        //     title: t('screens.onBoarding.item2.title'),
        //     description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        //     image: require('../assets/images/onBoarding/img_2.jpg'),
        // },
        // {
        //     _id: '3',
        //     title: t('screens.onBoarding.item3.title'),
        //     image: require('../assets/images/onBoarding/img_3.jpg'),
        //     description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        // },
    ]
}

export const guestUser = {
    name: 'Guest',
}
