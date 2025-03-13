// camera.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function Camera() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<{ uri: string } | null>(null);
    const [takenPhotos, setTakenPhotos] = useState<{ uri: string }[]>([]);
    const cameraRef = useRef<any>(null);
    const [showCameraView, setShowCameraView] = useState(false);

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, []);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const capturedPhoto = await cameraRef.current.takePictureAsync();
                setPhoto(capturedPhoto);
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };

    const handleRetry = () => {
        setPhoto(null);
    };

    const handleCheck = () => {
        if (photo) {
            setTakenPhotos((prevPhotos) => [...prevPhotos, photo]);
            setPhoto(null);
            setShowCameraView(false);
        }
    };

    const handleOpenCamera = () => {
        setShowCameraView(true);
    };

    return (
        <View style={styles.container}>
        {showCameraView ? (
            <View style={styles.cameraContainer}>
            <TextInput
                style={styles.hiddenInput}
                autoFocus
                onSubmitEditing={takePicture}
                blurOnSubmit={false}
            />
            {photo ? (
                <View style={styles.previewContainer}>
                <Image source={{ uri: photo.uri }} style={styles.previewImage} />
                <View style={styles.actionContainer}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleCheck}>
                    <Text style={styles.buttonText}>Add to List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={handleRetry}>
                    <Text style={styles.buttonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
                </View>
            ) : (
                // Corrected part: Render CameraView when photo is null
                <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                    <Text style={styles.buttonText}>Capture (or press Enter)</Text>
                    </TouchableOpacity>
                </View>
                </CameraView>
            )}
            </View>
        ) : (
            <View style={styles.photoListContainer}>
            {takenPhotos.length > 0 ? (
                <ScrollView style={styles.photoScrollView}>
                {takenPhotos.map((photo, index) => (
                    <Image key={index} source={{ uri: photo.uri }} style={styles.takenImage} />
                ))}
                </ScrollView>
            ) : (
                <Text style={styles.noPhotosText}>No photos taken yet.</Text>
            )}
            <TouchableOpacity style={styles.openCameraButton} onPress={handleOpenCamera}>
                <Text style={styles.openCameraButtonText}>Open Camera</Text>
            </TouchableOpacity>
            </View>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
      darkBackground: {
          backgroundColor: 'black',
      },
      lightText: {
          color: 'white',
      },
    cameraContainer: {
      flex: 1,
    },
    photoListContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    photoScrollView: {
      width: '100%',
    },
    takenImage: {
      width: 150,
      height: 150,
      marginVertical: 10,
      alignSelf: 'center',
    },
    noPhotosText: {
      fontSize: 16,
      marginBottom: 20,
    },
    openCameraButton: {
      padding: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    openCameraButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    hiddenInput: {
      height: 0,
      width: 0,
      opacity: 0,
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
      permissionButton:{
          backgroundColor: 'lightblue',
          padding: 10,
          borderRadius: 5,
          marginTop:10,
      },
      permissionButtonText:{
          fontSize:16
      },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 40,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    button: {
      padding: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 8,
    },
    captureButton: {
      padding: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 8,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    previewContainer: {
      flex: 1,
      backgroundColor: 'black',
    },
    previewImage: {
      flex: 1,
      resizeMode: 'contain',
    },
    actionContainer: {
      position: 'absolute',
      bottom: 40,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingHorizontal: 20,
    },
    actionButton: {
      padding: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 8,
    },
  });