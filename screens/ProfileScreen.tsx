import  React from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, icons, SIZES,images } from '../constants';

export type TileProps = {
    iconName: string;
    text: string;
    infoText?: string;
}

const ProfileTile = ({iconName, text, infoText}:TileProps) => {
    return (
        <TouchableOpacity style={styles.profileTile}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={iconName} size={35} color={COLORS.primary} />
                <Text style={styles.profileTileText}>{text}</Text>
            </View>
            <View style={styles.profileTileRight}>
                { infoText ? <Text style={styles.profileTileText}>{infoText}</Text>: null}
                <Icon name="chevron-forward-outline" size={30} color={COLORS.gray} />

            </View>
        </TouchableOpacity>
    )
}

const ProfileScreen = () => {
    function renderHeader(){
        return (
            <View style={styles.headerView}>
                <Image 
                    source={images.profilePhoto}
                    resizeMode="contain"
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 20
                    }}
                />
                <View style={styles.profileName}>
                    <Text style={{ color: COLORS.white, ...FONTS.body2}}>Krish Sabharwal</Text>
                    <Text style={{ color: COLORS.white, ...FONTS.body3}}>+91 98900 54905</Text>
                </View>
            </View>
        )
    }

    function renderTiles() {
        return (
            <View>
                <ProfileTile iconName="cash" text="Balance" infoText="Le 115.78" />
                <ProfileTile iconName="qr-code-outline" text="QR Code" />
                <ProfileTile iconName="barcode" text="Bar Code" />
                <ProfileTile iconName="lock-closed" text="Pin" infoText="****" />
                <ProfileTile iconName="mail" text="Email" infoText="krishsabharwal@gmail.com" />

            </View>
        )
    }

    function renderSignOut() {
        return(
            <TouchableOpacity 
                style={{
                    flexDirection: 'row',
                    padding: SIZES.padding,
                    marginHorizontal: SIZES.padding *3,
                    marginTop: SIZES.padding *2,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: COLORS.lightGreen,
                    borderRadius: 10
                }}
                onPress={()=> console.log("Sign out pressed")}
            >
                <View style={{
                    padding: SIZES.padding,
                    backgroundColor: COLORS.primary,
                    borderRadius: 10
                }}>
                    <FeatherIcon name="log-out" size={20} color={COLORS.white} />
                </View>
                <Text style={{
                    color: COLORS.primary,
                    ...FONTS.body3
                }}>Sign out</Text>
            </TouchableOpacity>
        )
    }
    return (
        <ScrollView style={{ flex: 1}}>
            { renderHeader() }
            { renderTiles() }
            { renderSignOut() }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headerView: {
        margin:SIZES.padding * 3,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.radius,
        padding: SIZES.padding * 3,
        flexDirection: 'row'
    },
    profileName: {
        justifyContent: 'center',
        marginLeft: SIZES.padding
    },
    profileTile: {
        marginHorizontal: SIZES.padding * 3,
        marginVertical: SIZES.padding,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profileTileRight: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    profileTileText: {
        color: COLORS.black, 
        ...FONTS.body3, 
        marginHorizontal: SIZES.padding * 2
    }
})

export default ProfileScreen;