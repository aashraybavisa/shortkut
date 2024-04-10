import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/native'
import { styles } from './RegistrationScreenStyle'
import { AppButton, AppContainer, AppTextInput } from '../../components'
import { Auth } from '../../firebase'
import { Images, Screen } from '../../utils'

interface RegistrationScreenProps {
  navigation: NavigationProp<any, any>;
}
 
const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ navigation }) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleOnPress = () => {
    // navigation.navigate('HomeScreen')
    console.log({ email, password, displayName: fullName, navigation })
    Auth?.signUp({ email, password, displayName: fullName, navigation, isMerchant: false })
  }

  const onPressLogin = () => {
    navigation.navigate(Screen.LoginScreen)
  }

  return (
    <AppContainer style={styles.mainContainer}>
      <View style={styles.logoView}>
        <Image source={Images.logo} style={styles.logoImg} resizeMode={'contain'} />
      </View>
      <Text style={styles.title}>{'Registration'}</Text>
      <View style={styles.formContainer}>
        <AppTextInput value={fullName} onChangeText={setFullName} placeholder={'Full Name'} editable={true} />
        <AppTextInput value={email} onChangeText={setEmail} placeholder={'Email'} editable={true} />
        <AppTextInput value={password} onChangeText={setPassword} placeholder={'Password'} editable={true} />
        <AppButton text={'Register'} onPress={handleOnPress} />
        <Text style={styles.bottomText}>{'Already have an Account?'}</Text>
        <Text style={[styles.bottomText, styles.bottomTextLink]} onPress={onPressLogin}>
          {'Login'}
        </Text>
      </View>
    </AppContainer>
  )
}

export default RegistrationScreen
