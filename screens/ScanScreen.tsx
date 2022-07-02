import React, { useEffect, useRef, useState, useMemo, useCallback} from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity,
    StyleSheet,
    TouchableOpacityComponent
} from 'react-native'
import { Camera } from 'react-native-vision-camera';
import {
    CameraDeviceFormat,
    CameraRuntimeError,
    FrameProcessorPerformanceSuggestion,
    PhotoFile,
    sortFormats,
    useCameraDevices,
    useFrameProcessor,
    VideoFile,
  } from 'react-native-vision-camera';
import { COLORS, FONTS, icons, images, SIZES } from '../constants';

const ScanScreen  = ({ navigation}) => {

    const camera = useRef<Camera>(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
    const [enableHdr, setEnableHdr] = useState(false);
    const [flash, setFlash] = useState<'off' | 'on'>('off');
    const [enableNightMode, setEnableNightMode] = useState(false);

    // camera format settings
    const devices = useCameraDevices();
    const device = devices[cameraPosition];

    if(!device) return null;


    useEffect(() => {
        (async () => {
        const permission = await Camera.requestCameraPermission();
        setHasPermission(permission !== 'denied');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

     function renderHeader() {
        return (
            <View style={{
                flexDirection: 'row',
                marginTop: SIZES.padding * 4
            }}>
                <TouchableOpacity
                    style={{
                        width: 45,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}  
                    onPress={()=> navigation.goBack()}  
                >
                    <Image 
                        source={icons.close}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.white
                        }}
                    />

                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{ color: COLORS.white, ...FONTS.body3}}>Scan for payment</Text>
                </View>
                <TouchableOpacity
                    style={{
                        height: 45,
                        width: 45,
                        backgroundColor: COLORS.green,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={()=> console.log("Info")}
                >
                    <Image 
                        source={icons.info}
                        style={{
                            height: 25,
                            width: 25,
                            tintColor: COLORS.white
                        }}
                    />

                </TouchableOpacity>
            </View>
        )
    }

    function renderScanFocus(){
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image 
                    source={images.focus}
                    resizeMode="stretch"
                    style={{
                        marginTop: "-55%",
                        width: 300,
                        height: 300
                    }}
                />
            </View>
        )
    }

    function renderPaymentMethods(){
        return(
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 220,
                padding: SIZES.padding * 3,
                borderTopLeftRadius: SIZES.radius,
                borderTopRightRadius: SIZES.radius,
                backgroundColor: COLORS.white
            }}>

                <Text style={{ ...FONTS.h4}}>Another payment Methods</Text>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginTop: SIZES.padding*2
                }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        onPress={()=> console.log("Phone Number")}
                    >
                        <View 
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: COLORS.lightpurple,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10
                            }}
                        >
                            <Image 
                                source={icons.phone}
                                resizeMode="cover"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: COLORS.purple
                                }}
                            />

                        </View>
                        <Text style={{ marginLeft: SIZES.padding, ...FONTS.body4}}>Phone Number</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: SIZES.padding*3
                        }}
                        onPress={()=> console.log("Bar Code")}
                    >
                        <View 
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: COLORS.lightGreen,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10
                            }}
                        >
                            <Image 
                                source={icons.barcode}
                                resizeMode="cover"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: COLORS.primary
                                }}
                            />

                        </View>
                        <Text style={{ marginLeft: SIZES.padding, ...FONTS.body4}}>Bar Code</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    function onBarCodeScanned(result){
        console.log(result.data)
    }
    return (
        <View style={{ flex: 1, backgroundColor: "transparent"}}>
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                enableZoomGesture={false}
                photo={true}
                video={false}
                audio={false}
                orientation="portrait"
                frameProcessorFps={1}>
                { renderHeader()}
                { renderScanFocus()}
                { renderPaymentMethods()}
            </Camera>
        </View>
    )
}

export default ScanScreen