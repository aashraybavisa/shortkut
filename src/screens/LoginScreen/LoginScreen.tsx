import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from './LoginScreenStyle'
import { AppButton, AppTextInput, AppContainer } from '../../components'
import { NavigationProp } from '@react-navigation/native'
import { Images, Screen } from '../../utils'
import { Auth } from '../../firebase'

interface LoginScreenProps {
  navigation: NavigationProp<any, any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('test@gmail.com')
  const [password, setPassword] = useState('123123')

  const handleLoginPress = () => {
    Auth?.signIn({email, password, navigation})
  }

  const onPressSignUpForClient = () => {
    navigation.navigate(Screen.RegistrationScreen)
  }

  return (
    <AppContainer style={styles.mainContainer}>
      <View style={styles.logoView}>
        <Image source={Images.logo} style={styles.logoImg} resizeMode={'contain'} />
      </View>
      <Text style={styles.title}>{'Login'}</Text>
      <View style={styles.formContainer}>
        <AppTextInput value={email} onChangeText={setEmail} placeholder={'Email'} editable={true} />
        <AppTextInput value={password} onChangeText={setPassword} placeholder={'Password'} editable={true} />
        <AppButton text={'Login'} onPress={handleLoginPress} />
        <Text style={styles.bottomText}>{'New User?'}</Text>
        <Text style={[styles.bottomText, styles.bottomTextLink]} onPress={onPressSignUpForClient}>
          {'SignUp'}
        </Text>
        {/* <Text style={[styles.bottomText, styles.bottomTextLink]}>{'Set Up My Business'}</Text> */}
      </View>
    </AppContainer>
  )
}

export default LoginScreen
